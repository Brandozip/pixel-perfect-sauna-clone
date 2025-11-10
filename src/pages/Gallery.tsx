import { useState, useEffect } from 'react';
import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "next-themes";
import { SocialMetaTags, galleryPageMeta } from "@/components/seo/SocialMetaTags";
import { ImageObjectSchema } from "@/components/seo/ImageObjectSchema";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { LazyImage } from '@/components/ui/lazy-image';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  alt_text: string;
  description: string | null;
  category: string;
  project_details: any;
  photographer_credit: string | null;
  license_info: string | null;
  created_at: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SocialMetaTags {...galleryPageMeta} />
      <ImageObjectSchema 
        images={filteredImages.map(img => ({
          url: img.image_url,
          title: img.title,
          description: img.description,
          alt_text: img.alt_text,
          photographer_credit: img.photographer_credit,
          license_info: img.license_info,
          category: img.category,
          uploadDate: img.created_at
        }))}
      />
      <div className="min-h-screen">
        <CleanNavbar />
        
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Atlanta Sauna Installation Gallery</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our portfolio of custom sauna installations, steam rooms, and wellness spaces across Atlanta. Each project showcases our commitment to quality craftsmanship and attention to detail.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <Skeleton className="aspect-[4/3] w-full rounded-none" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
                    <LazyImage
                      src={image.image_url}
                      alt={image.alt_text}
                      wrapperClassName="aspect-[4/3]"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="4/3"
                    />
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3 capitalize">
                        {image.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      {image.project_details?.location && (
                        <p className="text-sm text-muted-foreground mb-3">{image.project_details.location}</p>
                      )}
                      {image.description && (
                        <p className="text-muted-foreground">{image.description}</p>
                      )}
                      {image.photographer_credit && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Photo by: {image.photographer_credit}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No images found in this category.</p>
              </div>
            )}
            
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Wellness Sanctuary?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let us bring your vision to life with a custom sauna designed specifically for your space and needs.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Gallery;
