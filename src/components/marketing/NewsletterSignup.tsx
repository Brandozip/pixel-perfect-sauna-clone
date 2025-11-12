import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletterSignup } from '@/hooks/useNewsletterSignup';

const NewsletterSignup: React.FC = () => {
  const { email, setEmail, isLoading, subscribe, isGeoAllowed, geoMessage, isGeoLoading } = useNewsletterSignup();

  return (
    <div>
      <h3 className="text-lg font-heading font-semibold mb-4 text-background">Newsletter</h3>
      <p className="mb-4 text-background/90 leading-relaxed">
        Subscribe to our newsletter for wellness tips, exclusive offers, and the latest in sauna innovation.
      </p>
      
      {!isGeoLoading && !isGeoAllowed && (
        <div className="bg-yellow-100/90 border border-yellow-300 rounded-md p-3 mb-4">
          <p className="text-xs text-yellow-900">
            {geoMessage || 'Newsletter signup is currently only available to visitors from the United States.'}
          </p>
        </div>
      )}
      
      <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-background text-foreground border-border"
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading || !isGeoAllowed || isGeoLoading} className="bg-primary hover:bg-primary-emphasis text-primary-foreground">
          {isGeoLoading ? 'Checking...' : isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
