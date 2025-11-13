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

// Helper function to format dates consistently in YYYY-MM-DD format
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper function to get recent dates based on update frequency
const getRecentDate = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};

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
    
    const today = formatDate(new Date());

    // Static pages with realistic recent dates
    const staticUrls: SitemapUrl[] = [
      // Homepage - updated frequently
      { loc: '/', lastmod: today, changefreq: 'daily', priority: 1.0 },
      
      // Main pages - updated weekly
      { loc: '/services', lastmod: getRecentDate(2), changefreq: 'weekly', priority: 0.9 },
      { loc: '/health-benefits', lastmod: getRecentDate(3), changefreq: 'weekly', priority: 0.9 },
      { loc: '/gallery', lastmod: getRecentDate(1), changefreq: 'daily', priority: 0.8 },
      { loc: '/about', lastmod: getRecentDate(5), changefreq: 'weekly', priority: 0.8 },
      { loc: '/faq', lastmod: getRecentDate(7), changefreq: 'monthly', priority: 0.7 },
      { loc: '/contact', lastmod: getRecentDate(4), changefreq: 'weekly', priority: 0.8 },
      
      // Service detail pages - updated monthly
      { loc: '/services/custom-sauna-design', lastmod: getRecentDate(10), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/custom-sauna-installation', lastmod: getRecentDate(12), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/steam-shower-installation', lastmod: getRecentDate(15), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/residential-sauna-builds', lastmod: getRecentDate(11), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/outdoor-sauna-kits', lastmod: getRecentDate(14), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/indoor-infrared-sauna', lastmod: getRecentDate(13), changefreq: 'monthly', priority: 0.7 },
      
      // Health benefit pages - updated monthly
      { loc: '/health-benefits/detoxification', lastmod: getRecentDate(18), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/mental-health', lastmod: getRecentDate(20), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/cardiovascular', lastmod: getRecentDate(19), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/muscle-recovery', lastmod: getRecentDate(21), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/immune-system', lastmod: getRecentDate(22), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/anti-aging', lastmod: getRecentDate(17), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/chronic-pain-relief', lastmod: getRecentDate(16), changefreq: 'monthly', priority: 0.6 },
      
      // Utility and landing pages
      { loc: '/cost-calculator', lastmod: getRecentDate(25), changefreq: 'monthly', priority: 0.5 },
      { loc: '/commercial-projects', lastmod: getRecentDate(30), changefreq: 'monthly', priority: 0.5 },
      { loc: '/outdoor-sauna-landing', lastmod: getRecentDate(28), changefreq: 'monthly', priority: 0.5 },
      { loc: '/fast-track', lastmod: getRecentDate(26), changefreq: 'monthly', priority: 0.5 },
      
      // Legal pages - rarely updated
      { loc: '/privacy-policy', lastmod: getRecentDate(90), changefreq: 'yearly', priority: 0.4 },
      { loc: '/terms-of-service', lastmod: getRecentDate(90), changefreq: 'yearly', priority: 0.4 },
    ];

    // Fetch dynamic content from database
    const dynamicUrls: SitemapUrl[] = [];

    // Fetch published blog posts with actual dates
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });
    
    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }
    
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        // Use updated_at if available, otherwise published_at
        const lastModDate = post.updated_at || post.published_at;
        dynamicUrls.push({
          loc: `/blog/${post.slug}`,
          lastmod: lastModDate ? formatDate(new Date(lastModDate)) : today,
          changefreq: 'weekly',
          priority: 0.6
        });
      });
      
      // Add blog main page with most recent blog post date
      dynamicUrls.push({
        loc: '/blog',
        lastmod: today,
        changefreq: 'daily',
        priority: 0.9
      });
    } else {
      // Add blog page even if no posts yet
      dynamicUrls.push({
        loc: '/blog',
        lastmod: today,
        changefreq: 'daily',
        priority: 0.9
      });
    }

    // Note: Gallery images are already included in /gallery page
    // Individual image pages would only be needed if we create detail pages for each image
    // For now, we just ensure the gallery page has an accurate lastmod date

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
