import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageUrl?: string;
}

export const FAQSchema = ({ faqs, pageUrl = "https://www.saunasplus.com/faq" }: FAQSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faqpage`,
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })),
      "about": {
        "@type": "Service",
        "name": "Sauna Installation and Design Services",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://www.saunasplus.com/#business",
          "name": "Saunas Plus"
        }
      },
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.saunasplus.com/#website"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'faq-schema';
    
    // Remove existing schema if present
    const existing = document.getElementById('faq-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('faq-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs, pageUrl]);

  return null;
};

// Component for adding HowTo schema (useful for process/instruction pages)
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  pageUrl: string;
}

export const HowToSchema = ({ name, description, steps, totalTime, pageUrl }: HowToSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      "name": name,
      "description": description,
      ...(totalTime && { "totalTime": totalTime }),
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        ...(step.image && { "image": step.image })
      })),
      "isPartOf": {
        "@type": "WebPage",
        "url": pageUrl
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'howto-schema';
    
    const existing = document.getElementById('howto-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('howto-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, steps, totalTime, pageUrl]);

  return null;
};
