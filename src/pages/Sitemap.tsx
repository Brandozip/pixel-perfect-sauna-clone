import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Redirect to the dynamic sitemap edge function
    window.location.replace(
      'https://damitvvtyphjaeyvzyen.supabase.co/functions/v1/generate-sitemap'
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to sitemap...</p>
    </div>
  );
};

export default Sitemap;
