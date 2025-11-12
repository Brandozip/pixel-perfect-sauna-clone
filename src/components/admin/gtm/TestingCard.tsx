import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface TestingMethod {
  title: string;
  description: string;
  steps: string[];
  whatToCheck: string[];
}

interface TestingCardProps {
  method: TestingMethod;
}

export function TestingCard({ method }: TestingCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{method.title}</CardTitle>
        <CardDescription>{method.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Steps:</p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            {method.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-2">What to Check:</p>
          <ul className="space-y-1">
            {method.whatToCheck.map((check, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
