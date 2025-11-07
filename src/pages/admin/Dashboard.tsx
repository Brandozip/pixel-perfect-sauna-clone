import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, FileText, Image, PenSquare, BarChart3, Star, Users, Eye, TrendingUp, Activity } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface DashboardStats {
  subscribers: number;
  submissions: number;
  newSubmissions: number;
  images: number;
  reviews: number;
  avgRating: string;
  pendingReviews: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [subscribersRes, submissionsRes, imagesRes, reviewsRes] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true })
      ]);

      const allReviews = await supabase.from('reviews').select('rating');
      const avgRating = allReviews.data && allReviews.data.length > 0
        ? (allReviews.data.reduce((acc, r) => acc + r.rating, 0) / allReviews.data.length).toFixed(1)
        : '0.0';

      const pendingReviewsRes = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const newSubmissionsRes = await supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new');

      setStats({
        subscribers: subscribersRes.count || 0,
        submissions: submissionsRes.count || 0,
        newSubmissions: newSubmissionsRes.count || 0,
        images: imagesRes.count || 0,
        reviews: reviewsRes.count || 0,
        avgRating,
        pendingReviews: pendingReviewsRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your business metrics and admin tools</p>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subscribers</p>
                <p className="text-2xl font-bold">{stats.subscribers}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Submissions</p>
                <p className="text-2xl font-bold">{stats.submissions}</p>
                {stats.newSubmissions > 0 && (
                  <p className="text-xs text-orange-500">{stats.newSubmissions} new</p>
                )}
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gallery</p>
                <p className="text-2xl font-bold">{stats.images}</p>
              </div>
              <Image className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reviews</p>
                <p className="text-2xl font-bold">{stats.reviews}</p>
                <p className="text-xs text-yellow-500">{stats.avgRating} ★ avg</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Newsletter Management */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = '/admin/newsletters'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Newsletter Subscribers</CardTitle>
              <CardDescription>
                View and manage newsletter subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Subscribers
              </Button>
            </CardContent>
          </Card>

          {/* Form Submissions */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = '/admin/submissions'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Form Submissions</CardTitle>
              <CardDescription>
                Review and respond to contact forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Submissions
              </Button>
            </CardContent>
          </Card>

          {/* Gallery Management */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = '/admin/gallery'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Gallery Management</CardTitle>
              <CardDescription>
                Upload and manage gallery images with SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Gallery
              </Button>
            </CardContent>
          </Card>

          {/* Reviews Management */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = '/admin/reviews'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Reviews & Testimonials</CardTitle>
              <CardDescription>
                Manage customer reviews and ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Reviews
              </Button>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = '/admin/analytics'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Analytics</CardTitle>
              <CardDescription>
                View insights and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Blog Management */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = '/admin/blog'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <PenSquare className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Blog Posts</CardTitle>
              <CardDescription>
                Create and manage blog content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Blog
              </Button>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
