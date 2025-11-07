import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Image, Star, TrendingUp, Users, Download, Calendar, Eye, Activity } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchWebsiteAnalytics, type WebsiteAnalytics } from '@/utils/websiteAnalytics';

interface AnalyticsData {
  totalSubscribers: number;
  totalSubmissions: number;
  totalImages: number;
  totalReviews: number;
  avgRating: string;
  pendingReviews: number;
  newSubmissions: number;
  subscriberGrowth: Array<{ date: string; count: number }>;
  submissionsTrend: Array<{ date: string; count: number }>;
  reviewsTrend: Array<{ date: string; count: number }>;
  serviceDistribution: Array<{ service: string; count: number }>;
  ratingDistribution: Array<{ rating: string; count: number }>;
  categoryDistribution: Array<{ category: string; count: number }>;
}

const COLORS = ['#D2691E', '#B85A13', '#E8A87C', '#F5C99B', '#FDE8D7', '#C0504D'];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [websiteAnalytics, setWebsiteAnalytics] = useState<WebsiteAnalytics | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const getDateFilter = () => {
    const now = new Date();
    switch (dateRange) {
      case '7d':
        return subDays(now, 7);
      case '30d':
        return subDays(now, 30);
      case '90d':
        return subDays(now, 90);
      default:
        return new Date(0); // Beginning of time
    }
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const startDate = getDateFilter();
      const endDate = new Date();

      // Fetch website analytics
      const webAnalytics = await fetchWebsiteAnalytics(startDate, endDate);
      setWebsiteAnalytics(webAnalytics);

      // Fetch total counts
      const [subscribersRes, submissionsRes, imagesRes, reviewsRes] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true })
      ]);

      // Fetch detailed data for trends
      const [subscribersData, submissionsData, reviewsData] = await Promise.all([
        supabase.from('newsletter_subscribers').select('subscribed_at').gte('subscribed_at', startDate.toISOString()),
        supabase.from('contacts').select('created_at, service_interested_in, status').gte('created_at', startDate.toISOString()),
        supabase.from('reviews').select('created_at, rating, status').gte('created_at', startDate.toISOString())
      ]);

      // Fetch gallery categories
      const galleryData = await supabase.from('gallery_images').select('category');

      // Calculate KPIs
      const totalSubscribers = subscribersRes.count || 0;
      const totalSubmissions = submissionsRes.count || 0;
      const totalImages = imagesRes.count || 0;
      const totalReviews = reviewsRes.count || 0;

      // Calculate average rating
      const allReviews = await supabase.from('reviews').select('rating');
      const avgRating = allReviews.data && allReviews.data.length > 0
        ? (allReviews.data.reduce((acc, r) => acc + r.rating, 0) / allReviews.data.length).toFixed(1)
        : '0.0';

      // Pending counts
      const pendingReviewsRes = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const newSubmissionsRes = await supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new');

      // Process time-based data
      const subscriberGrowth = processTimeSeries(subscribersData.data || [], 'subscribed_at');
      const submissionsTrend = processTimeSeries(submissionsData.data || [], 'created_at');
      const reviewsTrend = processTimeSeries(reviewsData.data || [], 'created_at');

      // Process service distribution
      const serviceMap = new Map<string, number>();
      submissionsData.data?.forEach(sub => {
        const service = sub.service_interested_in || 'Not specified';
        serviceMap.set(service, (serviceMap.get(service) || 0) + 1);
      });
      const serviceDistribution = Array.from(serviceMap.entries())
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      // Process rating distribution
      const ratingMap = new Map<number, number>();
      reviewsData.data?.forEach(review => {
        ratingMap.set(review.rating, (ratingMap.get(review.rating) || 0) + 1);
      });
      const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating: `${rating} ★`,
        count: ratingMap.get(rating) || 0
      }));

      // Process category distribution
      const categoryMap = new Map<string, number>();
      galleryData.data?.forEach(img => {
        categoryMap.set(img.category, (categoryMap.get(img.category) || 0) + 1);
      });
      const categoryDistribution = Array.from(categoryMap.entries())
        .map(([category, count]) => ({ category: category.charAt(0).toUpperCase() + category.slice(1), count }))
        .sort((a, b) => b.count - a.count);

      setAnalytics({
        totalSubscribers,
        totalSubmissions,
        totalImages,
        totalReviews,
        avgRating,
        pendingReviews: pendingReviewsRes.count || 0,
        newSubmissions: newSubmissionsRes.count || 0,
        subscriberGrowth,
        submissionsTrend,
        reviewsTrend,
        serviceDistribution,
        ratingDistribution,
        categoryDistribution
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch analytics data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const processTimeSeries = (data: any[], dateField: string) => {
    const dayMap = new Map<string, number>();
    
    data.forEach(item => {
      const date = format(new Date(item[dateField]), 'MMM dd');
      dayMap.set(date, (dayMap.get(date) || 0) + 1);
    });

    return Array.from(dayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const handleExport = () => {
    if (!analytics) return;

    const report = [
      'Saunas Plus Analytics Report',
      `Generated: ${format(new Date(), 'PPP')}`,
      `Period: ${dateRange === 'all' ? 'All time' : `Last ${dateRange}`}`,
      '',
      'KEY METRICS',
      `Total Subscribers: ${analytics.totalSubscribers}`,
      `Total Submissions: ${analytics.totalSubmissions}`,
      `Total Gallery Images: ${analytics.totalImages}`,
      `Total Reviews: ${analytics.totalReviews}`,
      `Average Rating: ${analytics.avgRating}`,
      `Pending Reviews: ${analytics.pendingReviews}`,
      `New Submissions: ${analytics.newSubmissions}`,
      '',
      'TOP SERVICES REQUESTED',
      ...analytics.serviceDistribution.map(s => `${s.service}: ${s.count}`),
      '',
      'RATING DISTRIBUTION',
      ...analytics.ratingDistribution.map(r => `${r.rating}: ${r.count}`),
      '',
      'GALLERY CATEGORIES',
      ...analytics.categoryDistribution.map(c => `${c.category}: ${c.count}`)
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!analytics) {
    return <div className="container mx-auto p-6">No data available</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance and trends across all admin data</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <Button
              variant={dateRange === '7d' ? 'default' : 'outline'}
              onClick={() => setDateRange('7d')}
              size="sm"
            >
              7 Days
            </Button>
            <Button
              variant={dateRange === '30d' ? 'default' : 'outline'}
              onClick={() => setDateRange('30d')}
              size="sm"
            >
              30 Days
            </Button>
            <Button
              variant={dateRange === '90d' ? 'default' : 'outline'}
              onClick={() => setDateRange('90d')}
              size="sm"
            >
              90 Days
            </Button>
            <Button
              variant={dateRange === 'all' ? 'default' : 'outline'}
              onClick={() => setDateRange('all')}
              size="sm"
            >
              All Time
            </Button>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Website Analytics */}
      {websiteAnalytics && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Website Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{websiteAnalytics.totalVisitors.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Visitors</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{websiteAnalytics.totalPageviews.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Page Views</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">{websiteAnalytics.avgPageviewsPerVisit}</p>
              <p className="text-sm text-muted-foreground">Pages per Visit</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-2xl font-bold">{websiteAnalytics.avgSessionDuration}s</p>
              <p className="text-sm text-muted-foreground">Avg Session</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-2xl font-bold">{websiteAnalytics.bounceRate}%</p>
              <p className="text-sm text-muted-foreground">Bounce Rate</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Visitors Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={websiteAnalytics.visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="Visitors" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Page Views Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={websiteAnalytics.pageviewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} name="Page Views" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {websiteAnalytics.topPages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={websiteAnalytics.topPages} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="page" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={websiteAnalytics.topSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ source, visits }) => `${source}: ${visits}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visits"
                    >
                      {websiteAnalytics.topSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Admin Data Analytics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Admin Data</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Mail className="h-8 w-8 text-blue-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.totalSubscribers}</p>
          <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="h-8 w-8 text-orange-500" />
            {analytics.newSubmissions > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {analytics.newSubmissions} new
              </span>
            )}
          </div>
          <p className="text-2xl font-bold">{analytics.totalSubmissions}</p>
          <p className="text-sm text-muted-foreground">Contact Submissions</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Image className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{analytics.totalImages}</p>
          <p className="text-sm text-muted-foreground">Gallery Images</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            {analytics.pendingReviews > 0 && (
              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                {analytics.pendingReviews} pending
              </span>
            )}
          </div>
          <p className="text-2xl font-bold">{analytics.totalReviews}</p>
          <p className="text-sm text-muted-foreground">Customer Reviews • {analytics.avgRating} ★</p>
        </Card>
      </div>

      {/* Growth Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Newsletter Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.subscriberGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="Subscribers" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Submissions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.submissionsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#F59E0B" strokeWidth={2} name="Submissions" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Services Requested</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.serviceDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="service" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#D2691E" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Review Ratings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.ratingDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ rating, count }) => count > 0 ? `${rating}: ${count}` : ''}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analytics.ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Gallery Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, count }) => `${category}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analytics.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Review Trend */}
      {analytics.reviewsTrend.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Review Submissions Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.reviewsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#EAB308" strokeWidth={2} name="Reviews" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}
      </div>
    </div>
  );
};

export default Analytics;
