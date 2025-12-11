import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CleanNavbar from '@/components/navigation/CleanNavbar';
import { Footer } from '@/components/Footer';
import { navigationLinks } from '@/components/navigation/navigation-data';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, FileText, ExternalLink } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  published_at: string | null;
}

const SiteMap = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, title, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data) {
        setBlogPosts(data);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  // Utility pages not in main navigation
  const utilityPages = [
    { name: 'Cost Calculator', path: '/cost-calculator' },
    { name: 'Commercial Projects', path: '/commercial-projects' },
    { name: 'Outdoor Sauna Landing', path: '/outdoor-sauna-landing' },
    { name: 'Fast Track', path: '/fast-track' },
  ];

  const legalPages = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Site Map | Saunas Plus - All Pages & Resources</title>
        <meta name="description" content="Complete site map of Saunas Plus. Browse all our pages including services, health benefits, blog articles, and resources for custom sauna solutions." />
        <link rel="canonical" href="https://www.saunasplus.com/site-map" />
      </Helmet>
      
      <CleanNavbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-heading font-bold text-foreground">Site Map</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Explore all pages and resources available on Saunas Plus
            </p>
          </div>

          <div className="grid gap-10">
            {/* Main Pages Section */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Main Pages
              </h2>
              <ul className="grid gap-2">
                {navigationLinks.filter(link => !link.children).map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 py-1"
                    >
                      <FileText className="h-4 w-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Services Section */}
            {navigationLinks.filter(link => link.name === 'Services').map(section => (
              <section key={section.name}>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  Services
                </h2>
                <ul className="grid gap-2">
                  <li>
                    <Link 
                      to={section.path} 
                      className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 py-1 font-medium"
                    >
                      <FileText className="h-4 w-4" />
                      All Services
                    </Link>
                  </li>
                  {section.children?.map((child) => (
                    <li key={child.path} className="ml-6">
                      <Link 
                        to={child.path} 
                        className="text-muted-foreground hover:text-primary hover:underline flex items-center gap-2 py-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Health Benefits Section */}
            {navigationLinks.filter(link => link.name === 'Health Benefits').map(section => (
              <section key={section.name}>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  Health Benefits
                </h2>
                <ul className="grid gap-2">
                  <li>
                    <Link 
                      to={section.path} 
                      className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 py-1 font-medium"
                    >
                      <FileText className="h-4 w-4" />
                      All Health Benefits
                    </Link>
                  </li>
                  {section.children?.map((child) => (
                    <li key={child.path} className="ml-6">
                      <Link 
                        to={child.path} 
                        className="text-muted-foreground hover:text-primary hover:underline flex items-center gap-2 py-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Blog Section */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Blog
              </h2>
              <ul className="grid gap-2">
                <li>
                  <Link 
                    to="/blog" 
                    className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 py-1 font-medium"
                  >
                    <FileText className="h-4 w-4" />
                    All Blog Posts
                  </Link>
                </li>
                {loading ? (
                  <li className="ml-6 text-muted-foreground py-1">Loading blog posts...</li>
                ) : blogPosts.length > 0 ? (
                  blogPosts.map((post) => (
                    <li key={post.slug} className="ml-6">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-muted-foreground hover:text-primary hover:underline flex items-center gap-2 py-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {post.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="ml-6 text-muted-foreground py-1">No blog posts available</li>
                )}
              </ul>
            </section>

            {/* Utility Pages Section */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Tools & Resources
              </h2>
              <ul className="grid gap-2">
                {utilityPages.map((page) => (
                  <li key={page.path}>
                    <Link 
                      to={page.path} 
                      className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 py-1"
                    >
                      <FileText className="h-4 w-4" />
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Legal Section */}
            <section>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Legal
              </h2>
              <ul className="grid gap-2">
                {legalPages.map((page) => (
                  <li key={page.path}>
                    <Link 
                      to={page.path} 
                      className="text-primary hover:text-primary/80 hover:underline flex items-center gap-2 py-1"
                    >
                      <FileText className="h-4 w-4" />
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SiteMap;
