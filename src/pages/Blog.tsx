import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
  author_name: string;
  category: string | null;
  reading_time_minutes: number | null;
  is_featured: boolean;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;

      const featured = data?.find(p => p.is_featured) || null;
      const regular = data?.filter(p => !p.is_featured) || [];
      
      setFeaturedPost(featured);
      setPosts(regular);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - Saunas Plus | Sauna Tips, Health Benefits & Installation Guides</title>
        <meta name="description" content="Expert insights on saunas, health benefits, installation tips, maintenance guides, and wellness advice from Atlanta's premier sauna specialists." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sauna Insights & Wellness</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Expert advice on sauna health benefits, installation guides, and wellness tips from Atlanta's leading sauna specialists.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Featured Post */}
          {featuredPost && (
            <Card className="mb-12 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/blog/${featuredPost.slug}`)}>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPost.featured_image_url && (
                  <div className="h-80 md:h-auto">
                    <img 
                      src={featuredPost.featured_image_url} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className={`p-8 flex flex-col justify-center ${!featuredPost.featured_image_url ? 'md:col-span-2' : ''}`}>
                  <Badge className="w-fit mb-4">Featured</Badge>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  {featuredPost.excerpt && (
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(featuredPost.published_at), 'MMM dd, yyyy')}
                    </div>
                    {featuredPost.reading_time_minutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.reading_time_minutes} min read
                      </div>
                    )}
                  </div>
                  <Button>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No articles found</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
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
                        {format(new Date(post.published_at), 'MMM dd')}
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
          )}
        </div>
      </div>
    </>
  );
}
