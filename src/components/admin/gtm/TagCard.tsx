import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Tag } from '@/constants/gtmConfig';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface TagCardProps {
  tag: Tag;
}

export function TagCard({ tag }: TagCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {tag.name}
              <Badge variant={tag.isConfig ? "default" : "secondary"} className="text-xs">
                {tag.isConfig ? "Configuration" : "Event"}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-2">{tag.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tag.measurementId && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div>
              <p className="text-sm font-medium">Measurement ID</p>
              <p className="text-sm text-muted-foreground font-mono">{tag.measurementId}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(tag.measurementId!)}
            >
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">Trigger:</p>
          <Badge variant="outline">{tag.trigger}</Badge>
        </div>

        {tag.parameters && tag.parameters.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Event Parameters:</p>
            <div className="space-y-1">
              {tag.parameters.map((param) => (
                <div key={param.name} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                  <span className="font-mono text-xs">{param.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{param.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Accordion type="single" collapsible>
          <AccordionItem value="setup">
            <AccordionTrigger className="text-sm">Setup Instructions</AccordionTrigger>
            <AccordionContent>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>In GTM, click "Tags" in the left sidebar</li>
                <li>Click "New" to create a new tag</li>
                <li>Click tag configuration area</li>
                <li>Choose "{tag.type}"</li>
                {tag.isConfig ? (
                  <>
                    <li>Enter Measurement ID: <code className="text-xs bg-muted px-1 rounded">{tag.measurementId}</code></li>
                    <li>Click "Triggering" and select "Initialization - All Pages"</li>
                  </>
                ) : (
                  <>
                    <li>Select Configuration Tag: <code className="text-xs bg-muted px-1 rounded">GA4 Config - Primary</code></li>
                    <li>Enter Event Name (leave it as it suggests or enter the trigger event name)</li>
                    <li>Under Event Parameters, add each parameter:
                      <ul className="ml-6 mt-1 space-y-1">
                        {tag.parameters?.map((param) => (
                          <li key={param.name}>
                            <code className="text-xs bg-muted px-1 rounded">{param.name}</code>
                            {' → '}
                            <code className="text-xs bg-muted px-1 rounded">{param.value}</code>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>Click "Triggering" and select: <code className="text-xs bg-muted px-1 rounded">{tag.trigger}</code></li>
                  </>
                )}
                <li>Name the tag: <code className="text-xs bg-muted px-1 rounded">{tag.name}</code></li>
                <li>Click "Save"</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
