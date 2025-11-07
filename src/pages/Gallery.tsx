import { useState, useEffect } from 'react';
import CleanNavbar from "@/components/navigation/CleanNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "next-themes";
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  alt_text: string;
  description: string | null;
  category: string;
  project_details: any;
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

  if (loading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
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
            
            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={image.image_url} 
                        alt={image.alt_text}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
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
