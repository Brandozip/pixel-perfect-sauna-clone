import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { RefreshCw, Search, Database, FileText, Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SiteContent {
  id: string;
  url: string;
  page_type: string;
  title: string;
  excerpt?: string;
  main_keywords?: string[];
  related_pages?: any;
  last_indexed_at: string;
}

interface BlogContext {
  id: string;
  brand_voice?: string;
  target_audience?: string;
  service_area?: string;
  priority_pages?: any;
  common_phrases?: any;
  linking_rules?: any;
  prohibited_links?: string[];
}

export default function ContentKnowledge() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [indexing, setIndexing] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [blogContext, setBlogContext] = useState<BlogContext | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [contentRes, contextRes] = await Promise.all([
        supabase.from('site_content').select('*').order('page_type'),
        supabase.from('blog_writing_context').select('*').single()
      ]);

      if (contentRes.data) setSiteContent(contentRes.data);
      if (contextRes.data) setBlogContext(contextRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content knowledge',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReindex = async () => {
    try {
      setIndexing(true);
      toast({
        title: 'Indexing Started',
        description: 'Re-indexing site content. This may take a few minutes...'
      });

      const { error } = await supabase.functions.invoke('index-site-content');
      
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Site content re-indexed successfully'
      });
      
      await fetchData();
    } catch (error) {
      console.error('Error re-indexing:', error);
      toast({
        title: 'Error',
        description: 'Failed to re-index site content',
        variant: 'destructive'
      });
    } finally {
      setIndexing(false);
    }
  };

  const handleSaveContext = async () => {
    if (!blogContext) return;

    try {
      const { error } = await supabase
        .from('blog_writing_context')
        .update({
          brand_voice: blogContext.brand_voice,
          target_audience: blogContext.target_audience,
          service_area: blogContext.service_area,
          priority_pages: blogContext.priority_pages,
          common_phrases: blogContext.common_phrases,
          linking_rules: blogContext.linking_rules,
          prohibited_links: blogContext.prohibited_links
        })
        .eq('id', blogContext.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Blog writing context updated successfully'
      });
    } catch (error) {
      console.error('Error saving context:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog writing context',
        variant: 'destructive'
      });
    }
  };

  const filteredContent = siteContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.page_type === filterType;
    return matchesSearch && matchesType;
  });

  const contentByType = siteContent.reduce((acc, item) => {
    acc[item.page_type] = (acc[item.page_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const orphanedPages = siteContent.filter(item => {
    const relatedPages = item.related_pages as any[];
    return !relatedPages || relatedPages.length === 0;
  }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Knowledge Base</h1>
          <p className="text-muted-foreground mt-2">Manage site content indexing and blog writing context</p>
        </div>
        <Button onClick={handleReindex} disabled={indexing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${indexing ? 'animate-spin' : ''}`} />
          {indexing ? 'Indexing...' : 'Re-index Content'}
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pages</p>
                <p className="text-2xl font-bold">{siteContent.length}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Page Types</p>
                <p className="text-2xl font-bold">{Object.keys(contentByType).length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Link Health</p>
                <p className="text-2xl font-bold">{Math.round((1 - orphanedPages / siteContent.length) * 100)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orphaned Pages</p>
                <p className="text-2xl font-bold">{orphanedPages}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Indexed Content</TabsTrigger>
          <TabsTrigger value="context">Writing Context</TabsTrigger>
          <TabsTrigger value="health">Health Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indexed Pages</CardTitle>
              <CardDescription>All pages currently indexed in the knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by title or URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.keys(contentByType).map(type => (
                      <SelectItem key={type} value={type}>{type} ({contentByType[type]})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Related</TableHead>
                      <TableHead>Last Indexed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.page_type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.url}</TableCell>
                        <TableCell className="text-sm">
                          {item.main_keywords?.slice(0, 3).join(', ') || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {Array.isArray(item.related_pages) ? item.related_pages.length : 0}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(item.last_indexed_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context" className="space-y-6">
          {blogContext && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Brand Voice & Audience</CardTitle>
                  <CardDescription>Define your brand's tone and target audience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Brand Voice</Label>
                    <Textarea
                      value={blogContext.brand_voice || ''}
                      onChange={(e) => setBlogContext({ ...blogContext, brand_voice: e.target.value })}
                      placeholder="Professional, friendly, and informative..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Target Audience</Label>
                    <Textarea
                      value={blogContext.target_audience || ''}
                      onChange={(e) => setBlogContext({ ...blogContext, target_audience: e.target.value })}
                      placeholder="Homeowners interested in wellness..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Service Area</Label>
                    <Input
                      value={blogContext.service_area || ''}
                      onChange={(e) => setBlogContext({ ...blogContext, service_area: e.target.value })}
                      placeholder="Atlanta, GA"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Linking Rules</CardTitle>
                  <CardDescription>Configure internal linking behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Prohibited Links (one per line)</Label>
                    <Textarea
                      value={blogContext.prohibited_links?.join('\n') || ''}
                      onChange={(e) => setBlogContext({ 
                        ...blogContext, 
                        prohibited_links: e.target.value.split('\n').filter(Boolean)
                      })}
                      placeholder="/admin/...\n/login"
                      rows={5}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleSaveContext}>
                <Settings className="mr-2 h-4 w-4" />
                Save Context
              </Button>
            </>
          )}
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Pages by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(contentByType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(count / siteContent.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Content health indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Pages with Keywords</span>
                  </div>
                  <span className="font-bold">
                    {siteContent.filter(i => i.main_keywords && i.main_keywords.length > 0).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Pages with Excerpts</span>
                  </div>
                  <span className="font-bold">
                    {siteContent.filter(i => i.excerpt && i.excerpt.length > 0).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Pages with Related Links</span>
                  </div>
                  <span className="font-bold">
                    {siteContent.filter(i => i.related_pages && Array.isArray(i.related_pages) && i.related_pages.length > 0).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Orphaned Pages</span>
                  </div>
                  <span className="font-bold text-orange-500">{orphanedPages}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
