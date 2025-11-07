import { useEffect } from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
  readingTime?: number; // in minutes
}

export const ArticleSchema = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  featuredImage,
  category,
  tags,
  wordCount,
  readingTime
}: ArticleSchemaProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "url": url,
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "author": {
        "@type": "Person",
        "name": authorName,
        ...(authorUrl && { "url": authorUrl })
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.saunasplus.com/#organization",
        "name": "Saunas Plus",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.saunasplus.com/logo.png",
          "width": 600,
          "height": 60
        }
      },
      ...(featuredImage && {
        "image": {
          "@type": "ImageObject",
          "url": featuredImage,
          "width": 1200,
          "height": 630
        }
      }),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "inLanguage": "en-US",
      ...(category && {
        "articleSection": category
      }),
      ...(tags && tags.length > 0 && {
        "keywords": tags.join(", ")
      }),
      ...(wordCount && {
        "wordCount": wordCount
      }),
      ...(readingTime && {
        "timeRequired": `PT${readingTime}M`
      }),
      "isPartOf": {
        "@type": "Blog",
        "@id": "https://www.saunasplus.com/blog#blog",
        "name": "Saunas Plus Blog",
        "description": "Expert insights on sauna design, installation, health benefits, and wellness"
      }
    };

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [title, description, url, datePublished, dateModified, authorName, authorUrl, featuredImage, category, tags, wordCount, readingTime]);

  return null;
};

// Blog homepage schema (for listing page)
interface BlogSchemaProps {
  articles: Array<{
    title: string;
    description: string;
    url: string;
    datePublished: string;
    authorName: string;
    featuredImage?: string;
  }>;
}

export const BlogSchema = ({ articles }: BlogSchemaProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://www.saunasplus.com/blog#blog",
      "name": "Saunas Plus Blog",
      "description": "Expert insights on sauna design, installation, health benefits, and wellness",
      "url": "https://www.saunasplus.com/blog",
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.saunasplus.com/#organization",
        "name": "Saunas Plus"
      },
      "blogPost": articles.map(article => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.description,
        "url": article.url,
        "datePublished": article.datePublished,
        "author": {
          "@type": "Person",
          "name": article.authorName
        },
        ...(article.featuredImage && {
          "image": {
            "@type": "ImageObject",
            "url": article.featuredImage
          }
        })
      })),
      "inLanguage": "en-US"
    };

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [articles]);

  return null;
};

// Author schema (for author profile pages)
interface AuthorSchemaProps {
  name: string;
  url?: string;
  bio?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[]; // Social media profiles
}

export const AuthorSchema = ({
  name,
  url,
  bio,
  image,
  jobTitle,
  sameAs
}: AuthorSchemaProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": name,
      ...(url && { "url": url }),
      ...(bio && { "description": bio }),
      ...(image && {
        "image": {
          "@type": "ImageObject",
          "url": image
        }
      }),
      ...(jobTitle && { "jobTitle": jobTitle }),
      "worksFor": {
        "@type": "Organization",
        "@id": "https://www.saunasplus.com/#organization",
        "name": "Saunas Plus"
      },
      ...(sameAs && sameAs.length > 0 && { "sameAs": sameAs })
    };

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [name, url, bio, image, jobTitle, sameAs]);

  return null;
};
