import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Clock, CheckCircle, AlertCircle, ExternalLink, Settings } from 'lucide-react';
import { format } from 'date-fns';

interface GenerationLog {
  id: string;
  created_at: string;
  status: string;
  current_step: string | null;
  error_message: string | null;
  blog_post_id: string | null;
  total_time_seconds: number | null;
}

export default function BlogGenerator() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isTriggering, setIsTriggering] = useState(false);
  const [recentLogs, setRecentLogs] = useState<GenerationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved webhook URL from localStorage
    const savedUrl = localStorage.getItem('n8n_blog_webhook_url');
    if (savedUrl) setWebhookUrl(savedUrl);
    fetchRecentLogs();
  }, []);

  const fetchRecentLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_generation_logs')
        .select('id, created_at, status, current_step, error_message, blog_post_id, total_time_seconds')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWebhook = () => {
    localStorage.setItem('n8n_blog_webhook_url', webhookUrl);
    toast({
      title: 'Saved',
      description: 'Webhook URL saved to browser storage',
    });
  };

  const handleTriggerGeneration = async () => {
    if (!webhookUrl) {
      toast({
        title: 'Error',
        description: 'Please enter your n8n webhook URL first',
        variant: 'destructive',
      });
      return;
    }

    setIsTriggering(true);
    console.log('Triggering n8n blog generation webhook:', webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          trigger: 'manual',
          timestamp: new Date().toISOString(),
          source: 'saunas-plus-admin',
        }),
      });

      toast({
        title: 'Generation Started',
        description: 'Blog generation triggered in n8n. Check your workflow history for status.',
      });

      // Refresh logs after a short delay
      setTimeout(fetchRecentLogs, 3000);
    } catch (error) {
      console.error('Error triggering webhook:', error);
      toast({
        title: 'Error',
        description: 'Failed to trigger n8n webhook. Check the URL and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsTriggering(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary"><LoadingSpinner size="sm" className="mr-1" /> In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wand2 className="h-8 w-8" />
          Blog Generator
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate blog posts using n8n workflow automation
        </p>
      </div>

      <div className="grid gap-6">
        {/* Webhook Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              n8n Webhook Configuration
            </CardTitle>
            <CardDescription>
              Enter your n8n webhook URL to trigger blog generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder="https://your-n8n-instance.app/webhook/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleSaveWebhook}>
                  Save
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Create a webhook trigger in n8n and paste the URL here
              </p>
            </div>

            <Button 
              onClick={handleTriggerGeneration} 
              disabled={isTriggering || !webhookUrl}
              size="lg"
              className="w-full"
            >
              {isTriggering ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Triggering...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate New Blog Post
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Generation History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Generations
            </CardTitle>
            <CardDescription>
              History of blog generation attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : recentLogs.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No generation history yet. Trigger your first blog generation above!
              </p>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(log.status)}
                        {log.current_step && (
                          <span className="text-sm text-muted-foreground">
                            Step: {log.current_step}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(log.created_at), 'PPp')}
                        {log.total_time_seconds && ` • ${log.total_time_seconds}s`}
                      </p>
                      {log.error_message && (
                        <p className="text-sm text-destructive">{log.error_message}</p>
                      )}
                    </div>
                    {log.blog_post_id && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/blog-posts/${log.blog_post_id}`}>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>n8n Setup Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Open your n8n instance and create a new workflow</li>
              <li>Add a <strong>Webhook</strong> trigger node as the start</li>
              <li>Build your blog generation logic (AI nodes, Supabase nodes, etc.)</li>
              <li>Configure the workflow to insert posts into the <code>blog_posts</code> table</li>
              <li>Copy the webhook URL and paste it above</li>
              <li>Enable the workflow in n8n</li>
            </ol>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-medium mb-2">Supabase Connection in n8n:</p>
              <p className="text-muted-foreground">
                Use the Supabase node in n8n to insert generated blog posts. 
                You'll need your Supabase URL and service role key.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
