import { useEffect } from 'react';

interface ImageObjectProps {
  images: Array<{
    url: string;
    title: string;
    description?: string | null;
    alt_text: string;
    photographer_credit?: string | null;
    license_info?: string | null;
    category?: string;
    uploadDate?: string;
  }>;
}

export const ImageObjectSchema = ({ images }: ImageObjectProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const imageObjects = images.map((image) => ({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "contentUrl": image.url,
      "name": image.title,
      "description": image.description || image.alt_text,
      "caption": image.description || image.title,
      "creator": {
        "@type": image.photographer_credit?.includes('Saunas Plus') ? "Organization" : "Person",
        "name": image.photographer_credit || "Saunas Plus"
      },
      "copyrightNotice": image.license_info || "All Rights Reserved",
      "creditText": image.photographer_credit || "Saunas Plus",
      "acquireLicensePage": "https://www.saunasplus.com/contact",
      "license": image.license_info === "All Rights Reserved" 
        ? "https://www.saunasplus.com/terms-of-service"
        : image.license_info,
      "uploadDate": image.uploadDate,
      "inLanguage": "en-US",
      "keywords": image.category ? `${image.category} sauna, sauna installation, Atlanta sauna` : "sauna installation Atlanta",
      "representativeOfPage": false,
      "isPartOf": {
        "@type": "ImageGallery",
        "@id": "https://www.saunasplus.com/gallery#gallery",
        "name": "Saunas Plus Gallery - Custom Sauna Installations in Atlanta",
        "description": "Professional sauna installation projects showcasing custom designs, steam rooms, and wellness spaces across Atlanta and Georgia"
      }
    }));

    // If there are multiple images, use an ImageGallery wrapper
    const schemaData = images.length > 1 ? {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "@id": "https://www.saunasplus.com/gallery#gallery",
      "name": "Saunas Plus Gallery - Custom Sauna Installations in Atlanta",
      "description": "Professional sauna installation projects showcasing custom designs, steam rooms, and wellness spaces across Atlanta and Georgia",
      "image": imageObjects,
      "numberOfItems": images.length,
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://www.saunasplus.com/#business",
        "name": "Saunas Plus"
      }
    } : imageObjects[0];

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [images]);

  return null;
};

// Individual image schema for single-image pages
interface SingleImageProps {
  url: string;
  title: string;
  description?: string | null;
  alt_text: string;
  photographer_credit?: string | null;
  license_info?: string | null;
  category?: string;
  uploadDate?: string;
  width?: number;
  height?: number;
}

export const SingleImageObjectSchema = (props: SingleImageProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "contentUrl": props.url,
      "name": props.title,
      "description": props.description || props.alt_text,
      "caption": props.description || props.title,
      "creator": {
        "@type": props.photographer_credit?.includes('Saunas Plus') ? "Organization" : "Person",
        "name": props.photographer_credit || "Saunas Plus"
      },
      "copyrightNotice": props.license_info || "All Rights Reserved",
      "creditText": props.photographer_credit || "Saunas Plus",
      "acquireLicensePage": "https://www.saunasplus.com/contact",
      "license": props.license_info === "All Rights Reserved" 
        ? "https://www.saunasplus.com/terms-of-service"
        : props.license_info,
      "uploadDate": props.uploadDate,
      "inLanguage": "en-US",
      "keywords": props.category ? `${props.category} sauna, sauna installation, Atlanta sauna` : "sauna installation Atlanta",
      ...(props.width && props.height && {
        "width": props.width,
        "height": props.height
      }),
      "representativeOfPage": true,
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.saunasplus.com/#organization",
        "name": "Saunas Plus",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.saunasplus.com/logo.png"
        }
      }
    };

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [props]);

  return null;
};
