// Dynamic XML Sitemap Generator for Saunas Plus
// Generates a complete sitemap with all static pages and blog posts
// Accessed at: https://www.saunasplus.com/sitemap.xml

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Get a date X days ago
const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: { ...corsHeaders, 'Allow': 'GET, OPTIONS' }
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const baseUrl = 'https://www.saunasplus.com';
    const today = formatDate(new Date());

    // All static pages with realistic recent dates
    const staticUrls: SitemapUrl[] = [
      // Homepage - Priority 1.0
      { loc: '/', lastmod: today, changefreq: 'weekly', priority: 1.0 },
      
      // Main category pages - Priority 0.9
      { loc: '/services', lastmod: getDaysAgo(2), changefreq: 'weekly', priority: 0.9 },
      { loc: '/health-benefits', lastmod: getDaysAgo(3), changefreq: 'weekly', priority: 0.9 },
      { loc: '/blog', lastmod: today, changefreq: 'weekly', priority: 0.9 },
      
      // Key pages - Priority 0.8
      { loc: '/about', lastmod: getDaysAgo(5), changefreq: 'weekly', priority: 0.8 },
      { loc: '/contact', lastmod: getDaysAgo(4), changefreq: 'weekly', priority: 0.8 },
      { loc: '/gallery', lastmod: getDaysAgo(1), changefreq: 'weekly', priority: 0.8 },
      { loc: '/faq', lastmod: getDaysAgo(7), changefreq: 'weekly', priority: 0.8 },
      
      // Service detail pages - Priority 0.7
      { loc: '/services/custom-sauna-design', lastmod: getDaysAgo(10), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/custom-sauna-installation', lastmod: getDaysAgo(12), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/steam-shower-installation', lastmod: getDaysAgo(15), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/residential-sauna-builds', lastmod: getDaysAgo(11), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/outdoor-sauna-kits', lastmod: getDaysAgo(14), changefreq: 'monthly', priority: 0.7 },
      { loc: '/services/indoor-infrared-sauna', lastmod: getDaysAgo(13), changefreq: 'monthly', priority: 0.7 },
      
      // Health benefit detail pages - Priority 0.6
      { loc: '/health-benefits/detoxification', lastmod: getDaysAgo(18), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/mental-health', lastmod: getDaysAgo(20), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/cardiovascular', lastmod: getDaysAgo(19), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/muscle-recovery', lastmod: getDaysAgo(21), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/immune-system', lastmod: getDaysAgo(22), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/anti-aging', lastmod: getDaysAgo(17), changefreq: 'monthly', priority: 0.6 },
      { loc: '/health-benefits/chronic-pain-relief', lastmod: getDaysAgo(16), changefreq: 'monthly', priority: 0.6 },
      
      // Utility & landing pages - Priority 0.5
      { loc: '/cost-calculator', lastmod: getDaysAgo(25), changefreq: 'monthly', priority: 0.5 },
      { loc: '/commercial-projects', lastmod: getDaysAgo(30), changefreq: 'monthly', priority: 0.5 },
      { loc: '/outdoor-sauna-landing', lastmod: getDaysAgo(28), changefreq: 'monthly', priority: 0.5 },
      { loc: '/fast-track', lastmod: getDaysAgo(26), changefreq: 'monthly', priority: 0.5 },
      
      // Legal pages - Priority 0.4
      { loc: '/privacy-policy', lastmod: getDaysAgo(90), changefreq: 'yearly', priority: 0.4 },
      { loc: '/terms-of-service', lastmod: getDaysAgo(90), changefreq: 'yearly', priority: 0.4 },
    ];

    // Fetch all published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }

    // Add blog posts to sitemap
    const blogUrls: SitemapUrl[] = [];
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        const lastModDate = post.updated_at || post.published_at;
        blogUrls.push({
          loc: `/blog/${post.slug}`,
          lastmod: lastModDate ? formatDate(new Date(lastModDate)) : today,
          changefreq: 'weekly',
          priority: 0.6
        });
      });
    }

    // Combine all URLs
    const allUrls = [...staticUrls, ...blogUrls];

    // Generate XML with proper namespaces
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Generated: ${new Date().toISOString()} -->
  <!-- Total URLs: ${allUrls.length} (${staticUrls.length} static + ${blogUrls.length} blog posts) -->
${allUrls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    console.log(`Sitemap generated successfully with ${allUrls.length} URLs`);

    return new Response(xml, {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<error>Failed to generate sitemap: ${errorMessage}</error>`,
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
});
