import { useEffect } from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
  additionalInfo?: {
    features?: string[];
    priceRange?: string;
    duration?: string;
  };
}

export const ServiceSchema = ({
  name,
  description,
  url,
  serviceType = "Service",
  areaServed = ["Atlanta, GA", "Georgia"],
  additionalInfo = {}
}: ServiceSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      "name": name,
      "description": description,
      "url": url,
      "serviceType": serviceType,
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://www.saunasplus.com/#business",
        "name": "Saunas Plus",
        "telephone": "+16782459966",
        "email": "contact@saunasplus.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Atlanta",
          "addressRegion": "GA",
          "addressCountry": "US"
        }
      },
      "areaServed": areaServed.map(area => ({
        "@type": "Place",
        "name": area
      })),
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          ...(additionalInfo.priceRange && { "price": additionalInfo.priceRange })
        }
      },
      "brand": {
        "@type": "Brand",
        "name": "Saunas Plus"
      },
      "category": "Home Improvement",
      "serviceOutput": "Custom Sauna Installation",
      ...(additionalInfo.features && {
        "additionalProperty": additionalInfo.features.map(feature => ({
          "@type": "PropertyValue",
          "name": "Feature",
          "value": feature
        }))
      })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = `service-schema-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(script.id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, url, serviceType, areaServed, additionalInfo]);

  return null;
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'breadcrumb-schema';
    
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return null;
};
