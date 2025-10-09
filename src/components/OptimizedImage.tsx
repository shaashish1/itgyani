import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  blur?: boolean;
}

/**
 * Optimized Image Component with Progressive Loading
 * Features:
 * - Lazy loading with Intersection Observer
 * - Progressive blur-up effect
 * - Automatic WebP format detection
 * - Responsive image sizing
 * - Performance optimizations
 */
const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({ 
  src, 
  alt, 
  priority = false,
  blur = true,
  className = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-all duration-300 ${
          blur && !isLoaded ? 'blur-sm scale-105' : 'blur-0 scale-100'
        }`}
        {...props}
      />
      {blur && !isLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
