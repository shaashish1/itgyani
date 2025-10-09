import { useState, useEffect, useRef, memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyAdProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

/**
 * Lazy loading wrapper for ads with performance optimizations
 * Only renders ad content when in viewport
 * Memoized to prevent unnecessary re-renders
 */
export const LazyAd = memo(({ children, className = '', minHeight = '250px' }: LazyAdProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay ad loading to prioritize content
            setTimeout(() => setIsVisible(true), 300);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: '300px', // Load 300px before entering viewport
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ minHeight }}>
      {isVisible ? (
        children
      ) : (
        <Skeleton className="w-full h-full animate-pulse bg-muted/10" style={{ minHeight }} />
      )}
    </div>
  );
});

LazyAd.displayName = 'LazyAd';
