import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * Optimized Image Component
 * Automatically adds lazy loading, proper sizing, and performance optimizations
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  priority = false,
  className = '',
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...props}
    />
  );
};

export default OptimizedImage;
