import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyAdProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

/**
 * Lazy loading wrapper for ads
 * Only renders ad content when in viewport
 */
export const LazyAd = ({ children, className = '', minHeight = '250px' }: LazyAdProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px' } // Load 300px before entering viewport
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
        <Skeleton className="w-full h-full" style={{ minHeight }} />
      )}
    </div>
  );
};
