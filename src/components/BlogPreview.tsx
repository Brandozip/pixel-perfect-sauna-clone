import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
  category: string | null;
  reading_time_minutes: number | null;
}

export const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image_url, published_at, category, reading_time_minutes')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice on sauna health benefits, installation tips, and wellness
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              {post.featured_image_url && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-6">
                {post.category && (
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                )}
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                )}
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.published_at), 'MMM dd, yyyy')}
                  </div>
                  {post.reading_time_minutes && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.reading_time_minutes} min
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={() => navigate('/blog')} size="lg">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
