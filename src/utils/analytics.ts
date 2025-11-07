export const trackFormSubmission = (formName: string) => {
  // Simple analytics tracking - can be expanded later
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submission', {
      form_name: formName
    });
  }
};
