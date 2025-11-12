import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Trigger } from '@/constants/gtmConfig';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface TriggerCardProps {
  trigger: Trigger;
}

export function TriggerCard({ trigger }: TriggerCardProps) {
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
              {trigger.name}
              <Badge variant="secondary" className="text-xs">{trigger.type}</Badge>
            </CardTitle>
            <CardDescription className="mt-2">{trigger.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
          <div>
            <p className="text-sm font-medium">Event Name</p>
            <p className="text-sm text-muted-foreground font-mono">{trigger.eventName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(trigger.eventName)}
          >
            {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Used By Tags:</p>
          <div className="flex flex-wrap gap-2">
            {trigger.usedBy.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="setup">
            <AccordionTrigger className="text-sm">Setup Instructions</AccordionTrigger>
            <AccordionContent>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>In GTM, click "Triggers" in the left sidebar</li>
                <li>Click "New" to create a new trigger</li>
                <li>Click trigger configuration area</li>
                <li>Choose "Custom Event" as the trigger type</li>
                <li>Enter Event name: <code className="text-xs bg-muted px-1 rounded">{trigger.eventName}</code></li>
                <li>Name the trigger: <code className="text-xs bg-muted px-1 rounded">{trigger.name}</code></li>
                <li>Click "Save"</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
