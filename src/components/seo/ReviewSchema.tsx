import { useEffect } from 'react';

export const ReviewSchema = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://saunasplus.com/#business",
      "name": "Saunas Plus",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Nick S."
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "We had our sauna installed by Grayson in May 2024. The room was originally a closet turned into a wine cellar. Meeting with Grayson the first visit inspired confidence and a vision. He told us to plan and the timelines and stuck to it. In addition he was always available after the installation to fine tune some extras. I think it's rare to get this kind of professionalism and I recommend him without reservation.",
          "datePublished": "2024-05-15",
          "publisher": {
            "@type": "Organization",
            "name": "Saunas Plus"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Anonymous"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Grayson is the consummate professional. His work is exemplary. Punctual, straightforward, honest and cleans up afterwards which more than I can say for many contractors.",
          "datePublished": "2024-06-20",
          "publisher": {
            "@type": "Organization",
            "name": "Saunas Plus"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Katherine and John"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "We wanted a custom-cut sauna as part of an extensive home remodel, and had a clear idea of how the sauna should complement our home's overall design. Of the three companies we spoke with, Grayson was the only one who didn't try to force a sale by phone, and after a site visit, he presented a design that fit our aesthetic and space perfectly. It was clear that he had actually listened and could honor our vision. Through the build, Grayson and his helpers were honest, professional, and accessible. We love our beautiful new sauna and can't recommend Grayson highly enough.",
          "datePublished": "2024-07-10",
          "publisher": {
            "@type": "Organization",
            "name": "Saunas Plus"
          }
        }
      ]
    });
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};
