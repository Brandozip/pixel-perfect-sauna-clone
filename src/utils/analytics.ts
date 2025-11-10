// Google Analytics Utility Functions
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-RZN58PQLNK', {
      page_path: path,
    });
  }
};

export const trackFormSubmission = (formName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      form_name: formName,
    });
  }
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      button_name: buttonName,
      location: location || 'unknown',
    });
  }
};

export const trackPhoneClick = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_click', {
      event_category: 'engagement',
      event_label: 'phone_number_click',
    });
  }
};

export const trackEmailClick = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_click', {
      event_category: 'engagement',
      event_label: 'email_link_click',
    });
  }
};

export const trackServiceView = (serviceName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_service', {
      service_name: serviceName,
    });
  }
};

export const trackBlogView = (blogTitle: string, blogSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_blog', {
      blog_title: blogTitle,
      blog_slug: blogSlug,
    });
  }
};
