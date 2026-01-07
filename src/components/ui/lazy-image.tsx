import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
}

export const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  aspectRatio,
  loading = 'lazy'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Sanitize src to create a valid element ID
  const sanitizedId = `lazy-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { rootMargin: '50px' }
    );

    const element = document.getElementById(sanitizedId);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sanitizedId, loading]);

  return (
    <div
      id={sanitizedId}
      className={cn('relative overflow-hidden bg-muted', wrapperClassName)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Blur placeholder */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 backdrop-blur-xl transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-muted-foreground/5 to-transparent" />
      </div>

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
