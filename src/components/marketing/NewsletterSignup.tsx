import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletterSignup } from '@/hooks/useNewsletterSignup';

const NewsletterSignup: React.FC = () => {
  const { email, setEmail, isLoading, subscribe } = useNewsletterSignup();

  return (
    <div>
      <h3 className="text-lg font-heading font-semibold mb-4 text-foreground">Newsletter</h3>
      <p className="mb-4 text-muted-foreground">
        Subscribe to our newsletter for wellness tips, exclusive offers, and the latest in sauna innovation.
      </p>
      <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
