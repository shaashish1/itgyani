/**
 * Performance Monitoring Utilities
 * Track and optimize web vitals for better SEO and user experience
 */

// Web Vitals monitoring
export const reportWebVitals = (metric: any) => {
  // Log performance metrics in development
  if (import.meta.env.DEV) {
    console.log('Performance Metric:', metric);
  }
  
  // In production, send to analytics service
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

// Lazy load images when they enter viewport
export const lazyLoadImage = (img: HTMLImageElement) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
            observer.unobserve(image);
          }
        }
      });
    });
    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  }
};

// Preload critical resources
export const preloadResource = (href: string, as: string, crossorigin?: string) => {
  // Check if already preloaded
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  if (crossorigin) link.crossOrigin = crossorigin;
  document.head.appendChild(link);
};

// Prefetch resources for next navigation
export const prefetchResource = (href: string) => {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Defer non-critical scripts
export const deferScript = (src: string) => {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
