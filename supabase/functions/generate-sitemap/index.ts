// Dynamic XML Sitemap Generator
// This edge function generates an XML sitemap that includes both static and dynamic pages
// Useful when blog posts or other dynamic content is added in the future

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
};

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Base URL - update this to your actual domain
    const baseUrl = 'https://www.saunasplus.com';

    // Static pages
    const staticUrls: SitemapUrl[] = [
      // Homepage
      { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
      
      // Main pages
      { loc: '/services', changefreq: 'weekly', priority: 0.9 },
      { loc: '/health-benefits', changefreq: 'weekly', priority: 0.9 },
      { loc: '/gallery', changefreq: 'daily', priority: 0.8 },
      { loc: '/about', changefreq: 'weekly', priority: 0.8 },
      { loc: '/faq', changefreq: 'monthly', priority: 0.7 },
      { loc: '/contact', changefreq: 'weekly', priority: 0.8 },
      
      // Service detail pages
      { loc: '/services/custom-sauna-design', changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/custom-sauna-installation', changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/steam-shower-installation', changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/residential-sauna-builds', changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/outdoor-sauna-kits', changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/indoor-infrared-sauna', changefreq: 'monthly', priority: 0.7 },
      
      // Health benefit pages
      { loc: '/health-benefits/detoxification', changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/mental-health', changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/cardiovascular', changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/muscle-recovery', changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/immune-system', changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/anti-aging', changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/chronic-pain-relief', changefreq: 'monthly', priority: 0.6 },
      
      // Utility and landing pages
      { loc: '/cost-calculator', changefreq: 'monthly', priority: 0.5 },
      { loc: '/commercial-projects', changefreq: 'monthly', priority: 0.5 },
      { loc: '/outdoor-sauna-landing', changefreq: 'monthly', priority: 0.5 },
      { loc: '/fast-track', changefreq: 'monthly', priority: 0.5 },
      
      // Legal pages
      { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
      { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.4 },
    ];

    // Fetch dynamic content from database
    const dynamicUrls: SitemapUrl[] = [];

    // Fetch published blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });
    
    if (blogPosts) {
      blogPosts.forEach(post => {
        dynamicUrls.push({
          loc: `/blog/${post.slug}`,
          lastmod: post.updated_at.split('T')[0],
          changefreq: 'weekly',
          priority: 0.6
        });
      });
    }

    // Add blog main page
    dynamicUrls.push({
      loc: '/blog',
      changefreq: 'daily',
      priority: 0.9
    });

    // Fetch published gallery images for image sitemap (optional)
    const { data: galleryImages } = await supabase
      .from('gallery_images')
      .select('id, updated_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })
      .limit(100); // Limit to most recent 100 images

    // Note: Gallery images are already included in /gallery page
    // Individual image pages would only be needed if we create detail pages for each image

    // Combine all URLs
    const allUrls = [...staticUrls, ...dynamicUrls];

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Generated: ${new Date().toISOString()} -->
  <!-- Total URLs: ${allUrls.length} -->
  ${allUrls.map(url => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap', details: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
