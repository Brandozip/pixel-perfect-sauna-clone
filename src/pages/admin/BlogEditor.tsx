import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { ArrowLeft, Save, Eye } from 'lucide-react';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    author_name: 'Saunas Plus',
    status: 'draft',
    is_featured: false,
    category: '',
    tags: [] as string[],
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    article_type: 'BlogPosting',
    reading_time_minutes: 5,
    published_at: null as string | null
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        ...data,
        tags: data.tags || []
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch blog post',
        variant: 'destructive'
      });
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish = false) => {
    if (!formData.title || !formData.content) {
      toast({
        title: 'Validation Error',
        description: 'Title and content are required',
        variant: 'destructive'
      });
      return;
    }

    try {
      setSaving(true);
      
      const postData = {
        ...formData,
        status: publish ? 'published' : formData.status,
        published_at: publish ? new Date().toISOString() : formData.status === 'published' ? formData.published_at : null,
        seo_title: formData.seo_title || formData.title,
        seo_description: formData.seo_description || formData.excerpt,
        reading_time_minutes: Math.ceil(formData.content.split(' ').length / 200)
      };

      let error;
      if (id && id !== 'new') {
        const result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        error = result.error;
      } else {
        const result = await supabase
          .from('blog_posts')
          .insert(postData)
          .select()
          .single();
        error = result.error;
        if (!error && result.data) {
          navigate(`/admin/blog/${result.data.id}`, { replace: true });
        }
      }

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Blog post ${publish ? 'published' : 'saved'} successfully`
      });
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog post',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
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
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/blog')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">
            {id === 'new' ? 'New Blog Post' : 'Edit Blog Post'}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving}>
            <Eye className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-friendly-slug (auto-generated if empty)"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the post"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content * (Markdown supported)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here. You can use markdown formatting."
                  rows={20}
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  placeholder="Optimized title for search engines (defaults to post title)"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.seo_title.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  placeholder="Meta description for search engines (defaults to excerpt)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.seo_description.length}/160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="seo_keywords">Keywords</Label>
                <Input
                  id="seo_keywords"
                  value={formData.seo_keywords}
                  onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                  placeholder="sauna, health, wellness (comma separated)"
                />
              </div>

              <div>
                <Label htmlFor="article_type">Article Schema Type</Label>
                <Select
                  value={formData.article_type}
                  onValueChange={(value) => setFormData({ ...formData, article_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BlogPosting">Blog Posting</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="NewsArticle">News Article</SelectItem>
                    <SelectItem value="TechArticle">Tech Article</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Health, Installation, Maintenance, etc."
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  placeholder="infrared, traditional, outdoor"
                />
              </div>

              <div>
                <Label htmlFor="featured_image_url">Featured Image URL</Label>
                <Input
                  id="featured_image_url"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="author_name">Author Name</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured">Featured Post</Label>
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
