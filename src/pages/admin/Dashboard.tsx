import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Mail, FileText, Image, PenSquare, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAdminAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Gallery Management */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
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

          {/* Analytics */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Analytics</CardTitle>
              <CardDescription>
                View site metrics and performance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
