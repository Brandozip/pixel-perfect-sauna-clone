import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GeoResponse {
  isAllowed: boolean;
  country: string | null;
  message?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Checking geo-location for request');

    // Try to get IP from various headers
    let clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || req.headers.get('cf-connecting-ip')
      || 'unknown';

    console.log('Client IP:', clientIP);

    // Check if behind Cloudflare and has country header
    const cfCountry = req.headers.get('cf-ipcountry');
    
    if (cfCountry) {
      console.log('Found CF-IPCountry header:', cfCountry);
      const isAllowed = cfCountry === 'US';
      
      return new Response(
        JSON.stringify({
          isAllowed,
          country: cfCountry,
          message: isAllowed ? undefined : 'This service is only available to visitors from the United States.'
        } as GeoResponse),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Fallback: Use ip-api.com for geolocation (free, no API key needed)
    // Note: This has a rate limit of 45 requests per minute from the same IP
    if (clientIP && clientIP !== 'unknown' && !clientIP.startsWith('127.') && !clientIP.startsWith('192.168.')) {
      console.log('Calling ip-api.com for IP:', clientIP);
      
      const geoResponse = await fetch(`http://ip-api.com/json/${clientIP}?fields=status,country,countryCode`);
      const geoData = await geoResponse.json();
      
      console.log('Geo API response:', geoData);

      if (geoData.status === 'success') {
        const isAllowed = geoData.countryCode === 'US';
        
        return new Response(
          JSON.stringify({
            isAllowed,
            country: geoData.countryCode,
            message: isAllowed ? undefined : 'This service is only available to visitors from the United States.'
          } as GeoResponse),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // Default: Allow if we can't determine location (development, localhost, etc.)
    console.log('Could not determine location, allowing by default');
    return new Response(
      JSON.stringify({
        isAllowed: true,
        country: null,
        message: undefined
      } as GeoResponse),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error in geo-location check:', error);
    
    // On error, allow access (fail open for better UX)
    return new Response(
      JSON.stringify({
        isAllowed: true,
        country: null,
        message: undefined
      } as GeoResponse),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200, // Return 200 even on error to not break the form
      }
    );
  }
});
