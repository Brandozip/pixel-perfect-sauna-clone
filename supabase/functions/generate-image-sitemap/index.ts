// Image Sitemap Generator for Saunas Plus
// Generates a Google Images-compatible sitemap with all gallery images
// Accessed at: https://www.saunasplus.com/sitemap-images.xml

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

interface GalleryImage {
  image_url: string;
  title: string;
  alt_text: string;
  description: string | null;
  category: string;
}

// Format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Generate a title from filename if needed
const generateTitleFromUrl = (url: string): string => {
  const filename = url.split('/').pop()?.split('.')[0] || 'sauna-image';
  return filename
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const baseUrl = 'https://www.saunasplus.com';
    const today = formatDate(new Date());

    // Fetch all published gallery images
    const { data: galleryImages, error: galleryError } = await supabase
      .from('gallery_images')
      .select('image_url, title, alt_text, description, category')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (galleryError) {
      console.error('Error fetching gallery images:', galleryError);
      throw new Error(`Database error: ${galleryError.message}`);
    }

    const images: GalleryImage[] = galleryImages || [];

    // Group images by category for better organization
    const imagesByCategory: Record<string, GalleryImage[]> = {};
    images.forEach(img => {
      if (!imagesByCategory[img.category]) {
        imagesByCategory[img.category] = [];
      }
      imagesByCategory[img.category].push(img);
    });

    // Generate XML with proper image sitemap namespaces
    let imageEntries = '';

    // Create one URL entry per category page with all its images
    Object.entries(imagesByCategory).forEach(([category, categoryImages]) => {
      const categoryUrl = `${baseUrl}/gallery?category=${category}`;
      
      const imageElements = categoryImages.map(img => {
        const imageTitle = img.alt_text || img.title || generateTitleFromUrl(img.image_url);
        const imageCaption = img.description || '';
        
        return `    <image:image>
      <image:loc>${img.image_url}</image:loc>
      <image:title>${escapeXml(imageTitle)}</image:title>${imageCaption ? `
      <image:caption>${escapeXml(imageCaption)}</image:caption>` : ''}
    </image:image>`;
      }).join('\n');

      imageEntries += `  <url>
    <loc>${categoryUrl}</loc>
    <lastmod>${today}</lastmod>
${imageElements}
  </url>
`;
    });

    // Also add main gallery page with all images
    const allImageElements = images.map(img => {
      const imageTitle = img.alt_text || img.title || generateTitleFromUrl(img.image_url);
      const imageCaption = img.description || '';
      
      return `    <image:image>
      <image:loc>${img.image_url}</image:loc>
      <image:title>${escapeXml(imageTitle)}</image:title>${imageCaption ? `
      <image:caption>${escapeXml(imageCaption)}</image:caption>` : ''}
    </image:image>`;
    }).join('\n');

    const mainGalleryEntry = `  <url>
    <loc>${baseUrl}/gallery</loc>
    <lastmod>${today}</lastmod>
${allImageElements}
  </url>
`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Generated: ${new Date().toISOString()} -->
  <!-- Total Images: ${images.length} -->
${mainGalleryEntry}${imageEntries}</urlset>`;

    console.log(`Image sitemap generated successfully with ${images.length} images`);

    return new Response(xml, {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error('Error generating image sitemap:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<error>Failed to generate image sitemap: ${errorMessage}</error>`,
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
});

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
