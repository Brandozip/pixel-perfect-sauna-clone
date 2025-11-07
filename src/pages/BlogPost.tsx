import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import { ArticleSchema } from '@/components/seo/ArticleSchema';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
  author_name: string;
  author_avatar_url: string | null;
  category: string | null;
  tags: string[] | null;
  reading_time_minutes: number | null;
  seo_title: string | null;
  seo_description: string | null;
  article_type: string | null;
  view_count: number;
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      
      // Fetch the post
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPost(data);

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);

      // Fetch related posts
      if (data.category) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);
        
        setRelatedPosts(related || []);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  // Convert markdown-like formatting to HTML
  const renderContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headings
        if (paragraph.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
        }
        if (paragraph.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
        }
        if (paragraph.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(4)}</h3>;
        }
        
        // Handle lists
        if (paragraph.includes('\n- ')) {
          const items = paragraph.split('\n- ').filter(Boolean);
          return (
            <ul key={index} className="list-disc list-inside space-y-2 my-4">
              {items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          );
        }
        
        // Regular paragraphs
        return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{post.seo_title || post.title} - Saunas Plus Blog</title>
        <meta name="description" content={post.seo_description || post.excerpt || ''} />
        {post.tags && <meta name="keywords" content={post.tags.join(', ')} />}
      </Helmet>

      <ArticleSchema
        title={post.title}
        description={post.excerpt || ''}
        url={window.location.href}
        authorName={post.author_name}
        datePublished={post.published_at}
        featuredImage={post.featured_image_url || ''}
        category={post.category || undefined}
        tags={post.tags || undefined}
        readingTime={post.reading_time_minutes || undefined}
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {post.category && (
                <Badge className="mb-4">{post.category}</Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  {post.author_avatar_url && (
                    <img 
                      src={post.author_avatar_url} 
                      alt={post.author_name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author_name}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                </div>
                {post.reading_time_minutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.reading_time_minutes} min read
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {post.featured_image_url && (
                <div className="rounded-lg overflow-hidden mb-8">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Card 
                      key={related.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate(`/blog/${related.slug}`)}
                    >
                      {related.featured_image_url && (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={related.featured_image_url} 
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2">{related.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
