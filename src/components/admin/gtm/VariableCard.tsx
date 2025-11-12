import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Variable } from '@/constants/gtmConfig';

interface VariableCardProps {
  variable: Variable;
}

export function VariableCard({ variable }: VariableCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {variable.name}
              <Badge variant="secondary" className="text-xs">Data Layer Variable</Badge>
            </CardTitle>
            <CardDescription className="mt-2">{variable.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div>
              <p className="text-sm font-medium">Data Layer Variable Name</p>
              <p className="text-sm text-muted-foreground font-mono">{variable.dataLayerName}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(variable.dataLayerName)}
            >
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Used In:</p>
          <div className="flex flex-wrap gap-2">
            {variable.usedIn.map((usage) => (
              <Badge key={usage} variant="outline">
                {usage}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-2">Setup Instructions:</p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>In GTM, click "Variables" in the left sidebar</li>
            <li>Under "User-Defined Variables", click "New"</li>
            <li>Click "Choose variable type" → "Data Layer Variable"</li>
            <li>Enter Data Layer Variable Name: <code className="text-xs bg-muted px-1 rounded">{variable.dataLayerName}</code></li>
            <li>Name the variable: <code className="text-xs bg-muted px-1 rounded">{variable.name}</code></li>
            <li>Click "Save"</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
