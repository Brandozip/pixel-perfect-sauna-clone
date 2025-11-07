import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, FileText, Image, PenSquare, BarChart3, Star } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your admin dashboard</p>
      </div>
      
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
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
