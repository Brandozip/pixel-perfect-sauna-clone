import { useEffect } from 'react';

const SitemapIndex = () => {
  useEffect(() => {
    // Redirect to the sitemap index edge function
    window.location.replace(
      'https://damitvvtyphjaeyvzyen.supabase.co/functions/v1/generate-sitemap-index'
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to sitemap index...</p>
    </div>
  );
};

export default SitemapIndex;
