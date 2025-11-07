import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  // Optional overrides for specific pages
  pageUrl?: string;
  pageName?: string;
}

export const LocalBusinessSchema = ({ pageUrl, pageName }: LocalBusinessSchemaProps = {}) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.saunasplus.com/#business",
      "name": "Saunas Plus",
      "alternateName": "Saunas Plus Atlanta",
      "description": "Premium custom sauna design, installation, and construction services for residential and commercial properties in Atlanta and surrounding areas. Specializing in custom saunas, steam showers, outdoor sauna kits, and infrared saunas.",
      "url": "https://www.saunasplus.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.saunasplus.com/logo.png",
        "width": 250,
        "height": 60
      },
      "image": [
        "https://www.saunasplus.com/og-image.jpg"
      ],
      "telephone": "+16782459966",
      "email": "contact@saunasplus.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Atlanta",
        "addressRegion": "GA",
        "postalCode": "",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.7490,
        "longitude": -84.3880
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Atlanta",
          "containedInPlace": {
            "@type": "State",
            "name": "Georgia"
          }
        },
        {
          "@type": "State",
          "name": "Georgia"
        }
      ],
      "priceRange": "$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "15:00"
        }
      ],
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Check, Financing Available",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Sauna Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Sauna Design",
              "description": "Personalized sauna designs that blend seamlessly with your space and lifestyle.",
              "url": "https://www.saunasplus.com/services/custom-sauna-design"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Sauna Installation",
              "description": "Professional sauna installation services for residential and commercial properties.",
              "url": "https://www.saunasplus.com/services/custom-sauna-installation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Steam Shower Installation",
              "description": "Transform your bathroom into a spa-like retreat with steam shower installation.",
              "url": "https://www.saunasplus.com/services/steam-shower-installation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Sauna Builds",
              "description": "Complete home sauna design and installation for ultimate wellness.",
              "url": "https://www.saunasplus.com/services/residential-sauna-builds"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Outdoor Sauna Kits",
              "description": "Pre-built sauna kits designed for easy outdoor installation.",
              "url": "https://www.saunasplus.com/services/outdoor-sauna-kits"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Indoor Infrared Sauna",
              "description": "Modern infrared sauna installation for health and wellness.",
              "url": "https://www.saunasplus.com/services/indoor-infrared-sauna"
            }
          }
        ]
      },
      "sameAs": [
        // Add social media profiles when available
        // "https://www.facebook.com/saunasplus",
        // "https://www.instagram.com/saunasplus",
        // "https://www.linkedin.com/company/saunas-plus"
      ],
      "foundingDate": "2004",
      "slogan": "Elevate Your Wellness Journey with Custom Saunas",
      "knowsAbout": [
        "Sauna Design",
        "Sauna Installation",
        "Steam Shower Installation",
        "Infrared Saunas",
        "Outdoor Saunas",
        "Sauna Construction",
        "Wellness Solutions",
        "Home Spa Design"
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 33.7490,
          "longitude": -84.3880
        },
        "geoRadius": "100 miles"
      },
      "additionalType": [
        "https://en.wikipedia.org/wiki/Sauna",
        "https://en.wikipedia.org/wiki/Home_improvement"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'local-business-schema';
    
    // Remove existing schema if present
    const existing = document.getElementById('local-business-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('local-business-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [pageUrl, pageName]);

  return null;
};

export const OrganizationSchema = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.saunasplus.com/#organization",
      "name": "Saunas Plus",
      "url": "https://www.saunasplus.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.saunasplus.com/logo.png"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+16782459966",
          "contactType": "customer service",
          "email": "contact@saunasplus.com",
          "areaServed": "US",
          "availableLanguage": ["English"],
          "contactOption": "TollFree"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+16782459966",
          "contactType": "sales",
          "email": "contact@saunasplus.com",
          "areaServed": "US",
          "availableLanguage": ["English"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Atlanta",
        "addressRegion": "GA",
        "addressCountry": "US"
      },
      "sameAs": [
        // Add when social profiles are available
      ],
      "founder": {
        "@type": "Person",
        "name": "Saunas Plus Founders"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'organization-schema';
    
    const existing = document.getElementById('organization-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('organization-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export const WebsiteSchema = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.saunasplus.com/#website",
      "url": "https://www.saunasplus.com",
      "name": "Saunas Plus",
      "description": "Premium custom sauna design and installation services in Atlanta, GA",
      "publisher": {
        "@id": "https://www.saunasplus.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.saunasplus.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'website-schema';
    
    const existing = document.getElementById('website-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('website-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};
