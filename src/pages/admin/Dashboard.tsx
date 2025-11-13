import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, FileText, MessageSquare, Star, TrendingUp, Send, Eye, AlertCircle, Calendar } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { cn } from '@/lib/utils';

interface DashboardStats {
  subscribers: number;
  submissions: number;
  newSubmissions: number;
  images: number;
  reviews: number;
  avgRating: string;
  pendingReviews: number;
  blogPosts: number;
  pendingBlogs: number;
}

interface RecentSubmission {
  id: string;
  name: string;
  email: string;
  created_at: string;
  status: string;
}

interface PendingReview {
  id: string;
  author_name: string;
  rating: number;
  created_at: string;
}

type DateRangePreset = 'today' | 'week' | 'month' | 'custom';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [dateRangePreset, setDateRangePreset] = useState<DateRangePreset>('month');
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, [dateRangePreset, customDateRange]);

  const getDateRange = () => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = endOfDay(now);

    switch (dateRangePreset) {
      case 'today':
        startDate = startOfDay(now);
        break;
      case 'week':
        startDate = startOfWeek(now);
        endDate = endOfWeek(now);
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'custom':
        if (customDateRange.from && customDateRange.to) {
          startDate = startOfDay(customDateRange.from);
          endDate = endOfDay(customDateRange.to);
        } else {
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
        }
        break;
      default:
        startDate = startOfMonth(now);
    }

    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const { startDate, endDate } = getDateRange();
      
      const [subscribersRes, submissionsRes, imagesRes, reviewsRes, blogPostsRes] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
          .gte('subscribed_at', startDate)
          .lte('subscribed_at', endDate),
        supabase.from('contacts').select('*', { count: 'exact', head: true })
          .gte('created_at', startDate)
          .lte('created_at', endDate),
        supabase.from('gallery_images').select('*', { count: 'exact', head: true })
          .gte('created_at', startDate)
          .lte('created_at', endDate),
        supabase.from('reviews').select('*', { count: 'exact', head: true })
          .gte('created_at', startDate)
          .lte('created_at', endDate),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true })
          .gte('created_at', startDate)
          .lte('created_at', endDate)
      ]);

      const allReviews = await supabase.from('reviews').select('rating')
        .gte('created_at', startDate)
        .lte('created_at', endDate);
      const avgRating = allReviews.data && allReviews.data.length > 0
        ? (allReviews.data.reduce((acc, r) => acc + r.rating, 0) / allReviews.data.length).toFixed(1)
        : '0.0';

      const pendingReviewsRes = await supabase.from('reviews').select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
        .gte('created_at', startDate)
        .lte('created_at', endDate);
      const newSubmissionsRes = await supabase.from('contacts').select('*', { count: 'exact', head: true })
        .eq('status', 'new')
        .gte('created_at', startDate)
        .lte('created_at', endDate);
      const pendingBlogsRes = await supabase.from('blog_posts').select('*', { count: 'exact', head: true })
        .eq('status', 'draft')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      // Fetch recent submissions
      const recentSubmissionsRes = await supabase
        .from('contacts')
        .select('id, name, email, created_at, status')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch pending reviews
      const pendingReviewsData = await supabase
        .from('reviews')
        .select('id, author_name, rating, created_at')
        .eq('status', 'pending')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        subscribers: subscribersRes.count || 0,
        submissions: submissionsRes.count || 0,
        newSubmissions: newSubmissionsRes.count || 0,
        images: imagesRes.count || 0,
        reviews: reviewsRes.count || 0,
        avgRating,
        pendingReviews: pendingReviewsRes.count || 0,
        blogPosts: blogPostsRes.count || 0,
        pendingBlogs: pendingBlogsRes.count || 0
      });

      setRecentSubmissions(recentSubmissionsRes.data || []);
      setPendingReviews(pendingReviewsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToGoogle = async () => {
    setSubmitting(true);
    try {
      const urls = [
        'https://www.saunasplus.com/',
        'https://www.saunasplus.com/sitemap-index.xml',
      ];

      const { data, error } = await supabase.functions.invoke('submit-to-google', {
        body: { urls, type: 'URL_UPDATED' }
      });

      if (error) throw error;

      const successCount = data?.results?.filter((r: any) => r.success).length || 0;
      toast.success(`Successfully submitted ${successCount} URLs to Google`);
    } catch (error) {
      console.error('Error submitting to Google:', error);
      toast.error('Failed to submit URLs to Google');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Quick overview and actions</p>
        </div>
        
        {/* Date Range Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            <Button
              variant={dateRangePreset === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRangePreset('today')}
            >
              Today
            </Button>
            <Button
              variant={dateRangePreset === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRangePreset('week')}
            >
              This Week
            </Button>
            <Button
              variant={dateRangePreset === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRangePreset('month')}
            >
              This Month
            </Button>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={dateRangePreset === 'custom' ? 'default' : 'outline'}
                size="sm"
                className={cn('justify-start text-left font-normal')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRangePreset === 'custom' && customDateRange.from && customDateRange.to
                  ? `${format(customDateRange.from, 'MMM dd')} - ${format(customDateRange.to, 'MMM dd')}`
                  : 'Custom Range'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Start Date</p>
                  <CalendarComponent
                    mode="single"
                    selected={customDateRange.from}
                    onSelect={(date) => {
                      setCustomDateRange({ ...customDateRange, from: date });
                      if (date && customDateRange.to) setDateRangePreset('custom');
                    }}
                    className="pointer-events-auto"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">End Date</p>
                  <CalendarComponent
                    mode="single"
                    selected={customDateRange.to}
                    onSelect={(date) => {
                      setCustomDateRange({ ...customDateRange, to: date });
                      if (customDateRange.from && date) setDateRangePreset('custom');
                    }}
                    disabled={(date) => customDateRange.from ? date < customDateRange.from : false}
                    className="pointer-events-auto"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Submissions</p>
                <p className="text-2xl font-bold">{stats.newSubmissions}</p>
                <p className="text-xs text-muted-foreground">{stats.submissions} total</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">{stats.pendingReviews}</p>
                <p className="text-xs text-muted-foreground">{stats.reviews} total</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Blogs</p>
                <p className="text-2xl font-bold">{stats.pendingBlogs}</p>
                <p className="text-xs text-muted-foreground">{stats.blogPosts} total</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{stats.avgRating}</p>
                <p className="text-xs text-muted-foreground">{stats.subscribers} subscribers</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Google Indexing Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Google Indexing
            </CardTitle>
            <CardDescription>Submit your site to Google Search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Ready to submit</p>
                <p className="text-xs text-muted-foreground">Homepage + Sitemap</p>
              </div>
              <Button 
                onClick={handleSubmitToGoogle}
                disabled={submitting}
                size="sm"
              >
                {submitting ? 'Submitting...' : 'Submit All'}
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/admin/google-indexing')}
            >
              View Full Details
            </Button>
          </CardContent>
        </Card>

        {/* Pending Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Pending Reviews
            </CardTitle>
            <CardDescription>Reviews waiting for approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingReviews.length > 0 ? (
              <>
                <div className="space-y-2">
                  {pendingReviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="flex items-center justify-between text-sm">
                      <span className="truncate">{review.author_name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/admin/reviews')}
                >
                  Review All ({stats?.pendingReviews})
                </Button>
              </>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending reviews</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Blogs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Blog Posts
            </CardTitle>
            <CardDescription>Drafts waiting for review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats && stats.pendingBlogs > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stats.pendingBlogs}</p>
                    <p className="text-xs text-muted-foreground">Draft posts</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/admin/blog')}
                >
                  Review Drafts
                </Button>
              </>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending blog posts</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Quick Analytics
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Gallery</p>
                <p className="text-xl font-bold">{stats?.images}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blog Posts</p>
                <p className="text-xl font-bold">{stats?.blogPosts}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/admin/analytics')}
            >
              View Full Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Form Submissions</CardTitle>
          <CardDescription>Latest customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSubmissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>
                      <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate('/admin/submissions')}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent submissions</p>
            </div>
          )}
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/admin/submissions')}
            >
              View All Submissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
