import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SocialMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  url?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export const SocialMetaTags = ({
  title,
  description,
  image = 'https://www.saunasplus.com/og-default.jpg',
  imageAlt = 'Saunas Plus - Premium Custom Sauna Design and Installation',
  type = 'website',
  url,
  author,
  publishedTime,
  modifiedTime,
  keywords = []
}: SocialMetaTagsProps) => {
  const location = useLocation();
  const baseUrl = 'https://www.saunasplus.com';
  const fullUrl = url || `${baseUrl}${location.pathname}`;
  const fullTitle = title.includes('Saunas Plus') ? title : `${title} | Saunas Plus`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to set or update meta tag
    const setMetaTag = (attribute: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    if (author) {
      setMetaTag('name', 'author', author);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:image:alt', imageAlt);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Saunas Plus');
    setMetaTag('property', 'og:locale', 'en_US');

    // Image dimensions (recommended for better display)
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('property', 'article:published_time', publishedTime);
      }
      if (modifiedTime) {
        setMetaTag('property', 'article:modified_time', modifiedTime);
      }
      if (author) {
        setMetaTag('property', 'article:author', author);
      }
    }

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:image:alt', imageAlt);
    setMetaTag('name', 'twitter:site', '@saunasplus'); // Update with actual Twitter handle
    setMetaTag('name', 'twitter:creator', '@saunasplus'); // Update with actual Twitter handle

    // Additional SEO tags
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'googlebot', 'index, follow');

    // Mobile optimization
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }

    // Theme color for mobile browsers
    setMetaTag('name', 'theme-color', '#D2691E'); // Primary brand color

  }, [fullTitle, description, image, imageAlt, fullUrl, type, author, publishedTime, modifiedTime, keywords]);

  return null;
};

// Predefined meta tags for common pages
export const homePageMeta = {
  title: "Premium Custom Sauna Design & Installation | Saunas Plus Atlanta",
  description: "Transform your space with custom sauna solutions from Saunas Plus. Expert design, installation & construction services for residential & commercial properties in Atlanta, GA. 20+ years experience, 5-star rated.",
  keywords: ["custom sauna", "sauna installation", "sauna design", "Atlanta sauna", "Georgia sauna", "steam shower", "infrared sauna", "outdoor sauna", "residential sauna", "sauna builder"],
  image: "https://www.saunasplus.com/og-home.jpg"
};

export const servicesPageMeta = {
  title: "Our Premium Sauna Services",
  description: "Comprehensive sauna solutions including custom design, installation, steam showers, and outdoor sauna kits. Professional craftsmanship with 20+ years experience in Atlanta, GA.",
  keywords: ["sauna services", "sauna installation", "steam shower installation", "custom sauna design", "outdoor sauna kits", "infrared sauna"],
  image: "https://www.saunasplus.com/og-services.jpg"
};

export const healthBenefitsPageMeta = {
  title: "Health Benefits of Regular Sauna Use",
  description: "Discover the science-backed health benefits of saunas: detoxification, stress relief, improved circulation, muscle recovery, better sleep, and enhanced immune function. Learn how sauna therapy can improve your wellbeing.",
  keywords: ["sauna health benefits", "sauna therapy", "detoxification", "stress relief", "cardiovascular health", "muscle recovery", "immune system", "sauna wellness"],
  image: "https://www.saunasplus.com/og-health-benefits.jpg"
};

export const aboutPageMeta = {
  title: "About Saunas Plus - Atlanta's Premier Sauna Experts",
  description: "Meet the team behind Atlanta's leading sauna installation company. 20+ years of experience, licensed & insured, 5-star rated. Learn about our commitment to quality and wellness.",
  keywords: ["about saunas plus", "Atlanta sauna company", "sauna experts", "licensed sauna installer", "Georgia sauna builder"],
  image: "https://www.saunasplus.com/og-about.jpg"
};

export const contactPageMeta = {
  title: "Contact Us - Free Sauna Consultation",
  description: "Get your free consultation today! Contact Saunas Plus for expert advice on custom sauna design and installation. Serving Atlanta, GA and surrounding areas. Call 678-245-9966.",
  keywords: ["contact saunas plus", "free sauna consultation", "Atlanta sauna quote", "sauna installation inquiry"],
  image: "https://www.saunasplus.com/og-contact.jpg"
};

export const faqPageMeta = {
  title: "FAQ - Sauna Installation Questions Answered",
  description: "Find answers to common questions about sauna installation, costs, maintenance, and health benefits. Expert advice from Atlanta's leading sauna professionals.",
  keywords: ["sauna faq", "sauna installation questions", "sauna cost", "sauna maintenance", "sauna safety"],
  image: "https://www.saunasplus.com/og-faq.jpg"
};

export const galleryPageMeta = {
  title: "Sauna Installation Gallery - Our Completed Projects",
  description: "Explore our portfolio of custom sauna installations in Atlanta and Georgia. View residential and commercial projects featuring traditional, infrared, and outdoor saunas.",
  keywords: ["sauna gallery", "sauna photos", "completed saunas", "Atlanta sauna projects", "custom sauna examples"],
  image: "https://www.saunasplus.com/og-gallery.jpg"
};
