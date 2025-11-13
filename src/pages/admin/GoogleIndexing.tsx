import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SubmissionResult {
  url: string;
  success: boolean;
  result?: any;
  error?: string;
}

export default function GoogleIndexing() {
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<{ submitted: number; failed: number; total: number; results: SubmissionResult[]; errors: SubmissionResult[] } | null>(null);
  const { toast } = useToast();

  const baseUrl = "https://www.saunasplus.com";

  const urls = [
    `${baseUrl}/sitemap-index.xml`,
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap-images.xml`,
    `${baseUrl}/`,
    `${baseUrl}/about`,
    `${baseUrl}/services`,
    `${baseUrl}/gallery`,
    `${baseUrl}/blog`,
    `${baseUrl}/contact`,
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('submit-to-google', {
        body: { urls },
      });

      if (error) throw error;

      setResults(data);
      
      if (data.failed === 0) {
        toast({
          title: "Success!",
          description: `All ${data.submitted} URLs submitted to Google successfully.`,
        });
      } else {
        toast({
          title: "Partially Complete",
          description: `${data.submitted} succeeded, ${data.failed} failed.`,
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit URLs to Google",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Google Indexing</h1>
          <p className="text-muted-foreground mt-2">
            Submit sitemaps and pages to Google Search Console for faster indexing
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit URLs to Google</CardTitle>
            <CardDescription>
              This will submit your sitemaps and key pages to Google's Indexing API for faster crawling and indexing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>URLs to be submitted:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {urls.map((url) => (
                    <li key={url} className="text-sm">{url}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>

            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit to Google
                </>
              )}
            </Button>

            {results && (
              <div className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{results.total}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-green-600">Succeeded</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{results.submitted}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-red-600">Failed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">{results.failed}</div>
                    </CardContent>
                  </Card>
                </div>

                {results.results.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Successfully Submitted
                    </h3>
                    <ul className="space-y-1">
                      {results.results.map((result) => (
                        <li key={result.url} className="text-sm text-muted-foreground">
                          ✓ {result.url}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.errors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                      <XCircle className="h-5 w-5" />
                      Failed Submissions
                    </h3>
                    <ul className="space-y-2">
                      {results.errors.map((error) => (
                        <li key={error.url} className="text-sm">
                          <div className="font-medium">{error.url}</div>
                          <div className="text-red-600">{error.error}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automatic Submission Setup</CardTitle>
            <CardDescription>
              Set up a cron job to automatically submit URLs daily
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">To enable automatic daily submissions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to Backend → Database → SQL Editor</li>
                    <li>Enable the <code>pg_cron</code> and <code>pg_net</code> extensions</li>
                    <li>Run the SQL below to schedule daily submissions at 2 AM</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-xs overflow-x-auto">
{`select cron.schedule(
  'submit-to-google-daily',
  '0 2 * * *', -- 2 AM daily
  $$
  select net.http_post(
    url:='https://damitvvtyphjaeyvzyen.supabase.co/functions/v1/submit-to-google',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY"}'::jsonb,
    body:='{"urls": ["https://www.saunasplus.com/sitemap-index.xml", "https://www.saunasplus.com/sitemap.xml", "https://www.saunasplus.com/sitemap-images.xml", "https://www.saunasplus.com/"]}'::jsonb
  ) as request_id;
  $$
);`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
