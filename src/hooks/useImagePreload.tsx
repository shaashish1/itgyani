import { useEffect } from 'react';

/**
 * Preload images for better performance
 * @param images Array of image URLs to preload
 */
export const useImagePreload = (images: string[]) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    };

    // Preload all images in parallel
    Promise.all(images.map(preloadImage)).catch((error) => {
      console.warn('Failed to preload some images:', error);
    });
  }, [images]);
};

/**
 * Preload image when component mounts
 * @param src Image URL to preload
 */
export const useImagePreloadSingle = (src: string | undefined) => {
  useEffect(() => {
    if (!src) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);
};
