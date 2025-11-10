import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useMemo } from 'react';

interface LinkQualityIndicatorProps {
  content: string;
}

export function LinkQualityIndicator({ content }: LinkQualityIndicatorProps) {
  const linkAnalysis = useMemo(() => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(linkRegex)];
    
    const internalLinks = matches.filter(m => {
      const url = m[2];
      return url.startsWith('/') || url.startsWith('http://localhost') || url.includes(window.location.hostname);
    });

    const hasContactLink = internalLinks.some(m => m[2].includes('/contact'));
    const hasServiceLink = internalLinks.some(m => m[2].includes('/services/'));
    const hasHealthLink = internalLinks.some(m => m[2].includes('/health-benefits/'));
    const hasBlogLink = internalLinks.some(m => m[2].includes('/blog/'));

    const linkCount = internalLinks.length;
    let quality: 'poor' | 'fair' | 'good' | 'excessive' = 'poor';
    let color = 'text-red-500';

    if (linkCount >= 6 && linkCount <= 8) {
      quality = 'good';
      color = 'text-green-500';
    } else if (linkCount >= 3 && linkCount < 6) {
      quality = 'fair';
      color = 'text-yellow-500';
    } else if (linkCount > 8) {
      quality = 'excessive';
      color = 'text-orange-500';
    }

    return {
      count: linkCount,
      quality,
      color,
      hasContactLink,
      hasServiceLink,
      hasHealthLink,
      hasBlogLink
    };
  }, [content]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Link Quality</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Internal Links</span>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${linkAnalysis.color}`}>
              {linkAnalysis.count}
            </span>
            <Badge 
              variant={
                linkAnalysis.quality === 'good' ? 'default' :
                linkAnalysis.quality === 'fair' ? 'secondary' :
                'destructive'
              }
            >
              {linkAnalysis.quality}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Required Links</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Contact Page</span>
            {linkAnalysis.hasContactLink ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Service Page</span>
            {linkAnalysis.hasServiceLink ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Health Benefit</span>
            {linkAnalysis.hasHealthLink ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Blog Post</span>
            {linkAnalysis.hasBlogLink ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            {linkAnalysis.count < 3 && '⚠️ Add more internal links (target: 6-8)'}
            {linkAnalysis.count >= 3 && linkAnalysis.count < 6 && '✓ Good progress. Add a few more links for optimal SEO.'}
            {linkAnalysis.count >= 6 && linkAnalysis.count <= 8 && '✓ Excellent! Link count is in the optimal range.'}
            {linkAnalysis.count > 8 && '⚠️ Consider reducing links to avoid over-optimization.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
