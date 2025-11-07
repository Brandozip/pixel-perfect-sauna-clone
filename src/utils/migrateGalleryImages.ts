import { supabase } from '@/integrations/supabase/client';
import customSaunaDesign from '@/assets/custom-sauna-design.png';
import steamShower from '@/assets/steam-shower.png';
import residentialSauna from '@/assets/residential-sauna.png';
import outdoorSauna from '@/assets/outdoor-sauna.png';
import heroSauna from '@/assets/hero-sauna.jpg';
import luxurySauna from '@/assets/luxury-sauna.jpg';

interface ImageMigrationData {
  fileName: string;
  imagePath: string;
  title: string;
  alt_text: string;
  description: string;
  category: string;
  seo_keywords: string;
  seo_title: string;
  seo_description: string;
  project_details: {
    location: string;
    year?: string;
    client?: string;
  };
  featured: boolean;
  order_index: number;
}

const imagesToMigrate: ImageMigrationData[] = [
  {
    fileName: 'modern-basement-sauna.png',
    imagePath: customSaunaDesign,
    title: 'Modern Basement Sauna',
    alt_text: 'Custom-built traditional Finnish sauna with LED lighting in Buckhead Atlanta',
    description: 'Custom-built traditional Finnish sauna with LED lighting and premium cedar construction.',
    category: 'residential',
    seo_keywords: 'basement sauna, Finnish sauna, LED sauna lighting, custom sauna Atlanta, cedar sauna',
    seo_title: 'Modern Basement Sauna Installation in Buckhead | Saunas Plus',
    seo_description: 'Custom Finnish sauna with LED lighting and premium cedar construction in Buckhead, Atlanta. Professional sauna installation by Saunas Plus.',
    project_details: {
      location: 'Buckhead, Atlanta',
      year: '2024'
    },
    featured: true,
    order_index: 1
  },
  {
    fileName: 'luxury-steam-shower.png',
    imagePath: steamShower,
    title: 'Luxury Steam Shower',
    alt_text: 'Spa-grade steam shower installation with aromatherapy in Midtown Atlanta',
    description: 'Spa-grade steam shower installation with aromatherapy and chromotherapy features.',
    category: 'steam',
    seo_keywords: 'steam shower, luxury steam room, aromatherapy shower, chromotherapy, spa shower Atlanta',
    seo_title: 'Luxury Steam Shower Installation in Midtown Atlanta | Saunas Plus',
    seo_description: 'Professional steam shower installation with aromatherapy and chromotherapy in Midtown Atlanta. Spa-grade quality by Saunas Plus.',
    project_details: {
      location: 'Midtown, Atlanta',
      year: '2024'
    },
    featured: true,
    order_index: 2
  },
  {
    fileName: 'home-wellness-suite.png',
    imagePath: residentialSauna,
    title: 'Home Wellness Suite',
    alt_text: 'Complete home sauna transformation with custom wood paneling in Brookhaven',
    description: 'Complete home sauna transformation with custom wood paneling and state-of-the-art heating.',
    category: 'residential',
    seo_keywords: 'home sauna, residential sauna, custom wood paneling, sauna heating, wellness suite Atlanta',
    seo_title: 'Home Wellness Suite Sauna Installation in Brookhaven | Saunas Plus',
    seo_description: 'Transform your home with a custom sauna featuring premium wood paneling and advanced heating systems in Brookhaven, Atlanta.',
    project_details: {
      location: 'Brookhaven, Atlanta',
      year: '2024'
    },
    featured: false,
    order_index: 3
  },
  {
    fileName: 'backyard-retreat.png',
    imagePath: outdoorSauna,
    title: 'Backyard Retreat',
    alt_text: 'Outdoor sauna installation in Roswell with panoramic windows and natural wood finish',
    description: 'Outdoor sauna installation featuring panoramic windows and natural wood finishes.',
    category: 'outdoor',
    seo_keywords: 'outdoor sauna, backyard sauna, panoramic windows sauna, natural wood sauna, Roswell sauna',
    seo_title: 'Outdoor Backyard Sauna Installation in Roswell | Saunas Plus',
    seo_description: 'Custom outdoor sauna with panoramic windows and natural wood finishes in Roswell, Georgia. Professional outdoor sauna installation.',
    project_details: {
      location: 'Roswell, Georgia',
      year: '2024'
    },
    featured: true,
    order_index: 4
  },
  {
    fileName: 'contemporary-sauna-design.jpg',
    imagePath: heroSauna,
    title: 'Contemporary Sauna Design',
    alt_text: 'Minimalist sauna design with integrated bench lighting in Sandy Springs',
    description: 'Minimalist sauna design with integrated bench lighting and premium materials.',
    category: 'residential',
    seo_keywords: 'contemporary sauna, minimalist sauna, modern sauna design, bench lighting, Sandy Springs sauna',
    seo_title: 'Contemporary Minimalist Sauna in Sandy Springs | Saunas Plus',
    seo_description: 'Modern minimalist sauna featuring integrated bench lighting and premium materials in Sandy Springs, Atlanta.',
    project_details: {
      location: 'Sandy Springs, Atlanta',
      year: '2023'
    },
    featured: false,
    order_index: 5
  },
  {
    fileName: 'luxury-home-spa.jpg',
    imagePath: luxurySauna,
    title: 'Luxury Home Spa',
    alt_text: 'High-end residential sauna with glass doors and modern aesthetic in Dunwoody',
    description: 'High-end residential sauna with glass doors and modern aesthetic.',
    category: 'residential',
    seo_keywords: 'luxury sauna, home spa, glass door sauna, modern sauna, high-end sauna Dunwoody',
    seo_title: 'Luxury Home Spa Sauna Installation in Dunwoody | Saunas Plus',
    seo_description: 'Premium residential sauna with elegant glass doors and contemporary design in Dunwoody, Atlanta. Luxury home spa installation.',
    project_details: {
      location: 'Dunwoody, Atlanta',
      year: '2023'
    },
    featured: false,
    order_index: 6
  }
];

async function fetchImageAsFile(imagePath: string, fileName: string): Promise<File> {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

export async function migrateGalleryImages(onProgress?: (current: number, total: number, message: string) => void) {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[]
  };

  for (let i = 0; i < imagesToMigrate.length; i++) {
    const image = imagesToMigrate[i];
    
    try {
      if (onProgress) {
        onProgress(i + 1, imagesToMigrate.length, `Migrating: ${image.title}`);
      }

      // Check if image already exists in database by title
      const { data: existing } = await supabase
        .from('gallery_images')
        .select('id')
        .eq('title', image.title)
        .maybeSingle();

      if (existing) {
        console.log(`Image "${image.title}" already exists, skipping...`);
        results.success++;
        continue;
      }

      // Convert image to File object
      const file = await fetchImageAsFile(image.imagePath, image.fileName);

      // Generate unique filename
      const fileExt = image.fileName.split('.').pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(uniqueFileName);

      // Insert into database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{
          image_url: publicUrl,
          title: image.title,
          alt_text: image.alt_text,
          description: image.description,
          category: image.category,
          seo_keywords: image.seo_keywords,
          seo_title: image.seo_title,
          seo_description: image.seo_description,
          project_details: image.project_details,
          is_published: true,
          featured: image.featured,
          order_index: image.order_index
        }]);

      if (dbError) throw dbError;

      results.success++;
      console.log(`Successfully migrated: ${image.title}`);
    } catch (error) {
      results.failed++;
      const errorMessage = `Failed to migrate "${image.title}": ${error instanceof Error ? error.message : 'Unknown error'}`;
      results.errors.push(errorMessage);
      console.error(errorMessage);
    }
  }

  return results;
}
