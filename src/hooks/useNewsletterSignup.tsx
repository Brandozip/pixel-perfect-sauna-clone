import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

export function useNewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const emailSchema = z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters');

  const validateEmail = (email: string): boolean => {
    const result = emailSchema.safeParse(email);
    return result.success;
  };

  const subscribe = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    const validationResult = emailSchema.safeParse(email);
    if (!validationResult.success) {
      toast({
        title: 'Invalid Email',
        description: validationResult.error.issues[0].message,
        variant: 'destructive',
      });
      return false;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])
        .select();

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Subscribed',
            description: 'This email is already subscribed!',
            variant: 'destructive',
          });
          return false;
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Success!',
          description: 'Successfully subscribed to newsletter!',
        });
        setEmail('');
        return true;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    subscribe,
  };
}
