import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting to insert email:', email);
      
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])
        .select();

      console.log('Insert result:', { data, error });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Subscribed',
            description: 'This email is already subscribed!',
            variant: 'destructive',
          });
        } else {
          console.error('Supabase error:', error);
          throw error;
        }
      } else {
        toast({
          title: 'Success!',
          description: 'Successfully subscribed to newsletter!',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-heading font-semibold mb-4 text-foreground">Newsletter</h3>
      <p className="mb-4 text-muted-foreground">
        Subscribe to our newsletter for wellness tips, exclusive offers, and the latest in sauna innovation.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
