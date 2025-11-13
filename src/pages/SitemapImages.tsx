import { useEffect } from 'react';

const SitemapImages = () => {
  useEffect(() => {
    // Redirect to the image sitemap edge function
    window.location.replace(
      'https://damitvvtyphjaeyvzyen.supabase.co/functions/v1/generate-image-sitemap'
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to image sitemap...</p>
    </div>
  );
};

export default SitemapImages;
