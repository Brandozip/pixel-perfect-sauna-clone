import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GeoCheckResult {
  isAllowed: boolean;
  country: string | null;
  message?: string;
  isLoading: boolean;
  error: Error | null;
}

export function useGeoCheck(): GeoCheckResult {
  const [isAllowed, setIsAllowed] = useState<boolean>(true);
  const [country, setCountry] = useState<string | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        setIsLoading(true);
        
        const { data, error: functionError } = await supabase.functions.invoke('check-geo-location', {
          method: 'GET',
        });

        if (functionError) {
          console.error('Geo check error:', functionError);
          // On error, allow access (fail open)
          setIsAllowed(true);
          setError(functionError);
        } else if (data) {
          setIsAllowed(data.isAllowed);
          setCountry(data.country);
          setMessage(data.message);
        }
      } catch (err) {
        console.error('Failed to check geo-location:', err);
        // On error, allow access (fail open)
        setIsAllowed(true);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    checkLocation();
  }, []);

  return { isAllowed, country, message, isLoading, error };
}
