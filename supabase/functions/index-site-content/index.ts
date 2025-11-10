import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define all static pages
const STATIC_PAGES = [
  // Main pages
  { url: '/', type: 'landing', title: 'Home - Atlanta Sauna Installation & Design', category: null },
  { url: '/services', type: 'service', title: 'Sauna Services', category: 'services' },
  { url: '/health-benefits', type: 'health-benefit', title: 'Health Benefits of Saunas', category: 'health' },
  { url: '/gallery', type: 'utility', title: 'Our Sauna Projects Gallery', category: null },
  { url: '/about', type: 'utility', title: 'About Saunas Plus', category: null },
  { url: '/faq', type: 'utility', title: 'Sauna FAQ', category: null },
  { url: '/contact', type: 'utility', title: 'Contact Us', category: null },
  
  // Service pages
  { url: '/services/custom-sauna-design', type: 'service', title: 'Custom Sauna Design', category: 'services' },
  { url: '/services/custom-sauna-installation', type: 'service', title: 'Custom Sauna Installation', category: 'services' },
  { url: '/services/steam-shower-installation', type: 'service', title: 'Steam Shower Installation', category: 'services' },
  { url: '/services/residential-sauna-builds', type: 'service', title: 'Residential Sauna Builds', category: 'services' },
  { url: '/services/outdoor-sauna-kits', type: 'service', title: 'Outdoor Sauna Kits', category: 'services' },
  { url: '/services/indoor-infrared-sauna', type: 'service', title: 'Indoor Infrared Sauna', category: 'services' },
  
  // Health benefit pages
  { url: '/health-benefits/detoxification', type: 'health-benefit', title: 'Detoxification Benefits', category: 'health' },
  { url: '/health-benefits/mental-health', type: 'health-benefit', title: 'Mental Health Benefits', category: 'health' },
  { url: '/health-benefits/cardiovascular', type: 'health-benefit', title: 'Cardiovascular Health', category: 'health' },
  { url: '/health-benefits/muscle-recovery', type: 'health-benefit', title: 'Muscle Recovery', category: 'health' },
  { url: '/health-benefits/immune-system', type: 'health-benefit', title: 'Immune System Boost', category: 'health' },
  { url: '/health-benefits/anti-aging', type: 'health-benefit', title: 'Anti-Aging Benefits', category: 'health' },
  { url: '/health-benefits/chronic-pain-relief', type: 'health-benefit', title: 'Chronic Pain Relief', category: 'health' },
  
  // Landing pages
  { url: '/cost-calculator', type: 'utility', title: 'Sauna Cost Calculator', category: null },
  { url: '/commercial-projects', type: 'utility', title: 'Commercial Sauna Projects', category: null },
  { url: '/outdoor-sauna-landing', type: 'landing', title: 'Outdoor Sauna Solutions', category: 'services' },
  { url: '/fast-track', type: 'landing', title: 'Fast Track Installation', category: 'services' },
  
  // Legal
  { url: '/privacy-policy', type: 'legal', title: 'Privacy Policy', category: null },
  { url: '/terms-of-service', type: 'legal', title: 'Terms of Service', category: null },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user is admin
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!;

    console.log('🔍 Starting site content indexing...');

    // Step 1: Index all static pages
    for (const page of STATIC_PAGES) {
      console.log(`Indexing: ${page.url}`);
      
      // Use AI to generate content summary and extract keywords
      const analysisPrompt = `Analyze this page: "${page.title}" at URL ${page.url} (type: ${page.type})
      
Based on the URL and title, provide:
1. A 2-3 sentence content summary describing what users will find on this page
2. 5-10 main keywords related to this page
3. The primary topic/focus
4. 2-3 related page types that would naturally link here (e.g., "service", "health-benefit", "blog")

Return ONLY valid JSON (no markdown formatting):
{
  "summary": "...",
  "keywords": ["keyword1", "keyword2"],
  "primary_topic": "...",
  "related_types": ["service", "health-benefit"]
}`;

      try {
        const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: analysisPrompt }] }],
          }),
        });

        if (!aiResponse.ok) {
          throw new Error(`Gemini API error: ${aiResponse.status}`);
        }

        const aiData = await aiResponse.json();
        const content = aiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        
        if (!content) {
          console.warn(`No content returned from AI for ${page.url}, using defaults`);
          throw new Error('Empty AI response');
        }

        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Validate JSON before parsing
        if (!cleanContent.startsWith('{') || !cleanContent.endsWith('}')) {
          console.warn(`Invalid JSON format for ${page.url}: ${cleanContent.substring(0, 100)}`);
          throw new Error('Invalid JSON format');
        }

        const analysis = JSON.parse(cleanContent);

        // Validate required fields
        if (!analysis.summary || !analysis.keywords || !Array.isArray(analysis.keywords)) {
          console.warn(`Missing required fields in analysis for ${page.url}`);
          throw new Error('Invalid analysis structure');
        }

        // Upsert into site_content
        const { error } = await supabase.from('site_content').upsert({
          url: page.url,
          page_type: page.type,
          title: page.title,
          content_summary: analysis.summary,
          main_keywords: analysis.keywords,
          key_topics: { primary: analysis.primary_topic || page.title, related_types: analysis.related_types || [] },
          category: page.category,
          last_indexed_at: new Date().toISOString(),
        }, { onConflict: 'url' });

        if (error) {
          console.error(`Error upserting ${page.url}:`, error);
        } else {
          console.log(`✓ Indexed: ${page.title}`);
        }
      } catch (error) {
        console.error(`Failed to index ${page.url}:`, error instanceof Error ? error.message : error);
        
        // Fallback: Insert basic info without AI analysis
        await supabase.from('site_content').upsert({
          url: page.url,
          page_type: page.type,
          title: page.title,
          content_summary: `Information about ${page.title}`,
          main_keywords: [page.type, 'sauna'],
          category: page.category,
          last_indexed_at: new Date().toISOString(),
        }, { onConflict: 'url' });
        
        console.log(`✓ Indexed with fallback: ${page.title}`);
      }
    }

    console.log('✅ Static pages indexed');

    // Step 2: Index all blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, content, category, tags, seo_keywords')
      .eq('status', 'published');

    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }

    for (const post of blogPosts || []) {
      console.log(`Indexing blog: ${post.slug}`);
      
      // Extract H2 headings from content (simple regex)
      const h2Regex = /##\s+(.+)/g;
      const h2Headings = [...(post.content?.matchAll(h2Regex) || [])].map(m => m[1].trim());
      
      const { error } = await supabase.from('site_content').upsert({
        url: `/blog/${post.slug}`,
        slug: post.slug,
        page_type: 'blog',
        title: post.title,
        excerpt: post.excerpt,
        content_summary: post.excerpt,
        category: post.category,
        tags: post.tags || [],
        main_keywords: post.seo_keywords?.split(',').map((k: string) => k.trim()) || [],
        h2_headings: h2Headings,
        word_count: post.content?.split(/\s+/).length || 0,
        last_indexed_at: new Date().toISOString(),
      }, { onConflict: 'url' });

      if (error) {
        console.error(`Error indexing blog ${post.slug}:`, error);
      }
    }

    console.log('✅ Blog posts indexed');

    // Step 3: Calculate relationships using AI
    console.log('🔗 Calculating content relationships...');
    
    const { data: allContent } = await supabase
      .from('site_content')
      .select('url, title, page_type, content_summary, main_keywords, category')
      .limit(100); // Process in batches to avoid timeout

    // Process in smaller batches for relationship calculation
    const batchSize = 5;
    for (let i = 0; i < Math.min(allContent?.length || 0, batchSize); i++) {
      const content = allContent![i];
      const othersContext = allContent
        ?.filter(c => c.url !== content.url)
        .slice(0, 20) // Limit context size
        .map(c => `- ${c.title} (${c.page_type}, ${c.url})`)
        .join('\n');

      const relationshipPrompt = `Given this page:
Title: ${content.title}
Type: ${content.page_type}
URL: ${content.url}
Keywords: ${content.main_keywords?.join(', ')}

From this list of other pages, identify the 3-5 most relevant pages that would naturally link to or from this page:
${othersContext}

Return ONLY valid JSON (no markdown formatting):
[
  {"url": "/services/custom-sauna-design", "relevance": 0.9, "reason": "Direct service offering"},
  {"url": "/health-benefits/detoxification", "relevance": 0.7, "reason": "Related wellness topic"}
]`;

      try {
        const relationResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: relationshipPrompt }] }],
          }),
        });

        if (!relationResponse.ok) {
          throw new Error(`Gemini API error: ${relationResponse.status}`);
        }

        const relData = await relationResponse.json();
        const relContent = relData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        
        if (!relContent) {
          console.warn(`No relationship content for ${content.url}`);
          continue;
        }

        const cleanRelContent = relContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Validate JSON array format
        if (!cleanRelContent.startsWith('[') || !cleanRelContent.endsWith(']')) {
          console.warn(`Invalid relationship JSON for ${content.url}: ${cleanRelContent.substring(0, 100)}`);
          continue;
        }

        const relationships = JSON.parse(cleanRelContent);

        // Validate it's an array
        if (!Array.isArray(relationships)) {
          console.warn(`Relationships not an array for ${content.url}`);
          continue;
        }

        // Store relationships
        const { error } = await supabase.from('site_content').update({
          related_pages: relationships
        }).eq('url', content.url);

        if (error) {
          console.error(`Error updating relationships for ${content.url}:`, error);
        } else {
          console.log(`✓ Relationships updated for ${content.title}: ${relationships.length} links`);
        }
      } catch (error) {
        console.error(`Failed to calculate relationships for ${content.url}:`, error instanceof Error ? error.message : error);
      }
    }

    console.log('✅ Site content indexing complete!');
    
    return new Response(JSON.stringify({ 
      success: true, 
      indexed: {
        staticPages: STATIC_PAGES.length,
        blogPosts: blogPosts?.length || 0,
        total: (STATIC_PAGES.length + (blogPosts?.length || 0))
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Indexing error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});