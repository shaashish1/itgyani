// Performance optimization utilities for the blog website
export class PerformanceOptimizer {
  
  // Lazy loading utility for images
  static setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Preload critical resources
  static preloadCriticalResources() {
    const criticalResources = [
      '/assets/css/main.css',
      '/logo.png',
      '/'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      if (resource.endsWith('.css')) link.as = 'style';
      if (resource.endsWith('.js')) link.as = 'script';
      if (resource.endsWith('.png') || resource.endsWith('.jpg')) link.as = 'image';
      document.head.appendChild(link);
    });
  }

  // Cache management
  static setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Image compression utility
  static compressImage(file: File, quality: number = 0.8): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve as BlobCallback, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Critical CSS inlining
  static inlineCriticalCSS() {
    const criticalCSS = `
      body { font-family: system-ui, -apple-system, sans-serif; }
      .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      .loading { opacity: 0.6; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // Bundle splitting recommendations
  static getBundleSplittingConfig() {
    return {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    };
  }

  // Performance monitoring
  static monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Track in analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'timing_complete', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime)
          });
        }
      });
      lcpObserver.observe({entryTypes: ['largest-contentful-paint']});

      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'timing_complete', {
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime)
            });
          }
        }
      });
      fidObserver.observe({entryTypes: ['first-input']});

      // Monitor Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({entryTypes: ['layout-shift']});
    }
  }

  // Resource hints
  static addResourceHints() {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//images.unsplash.com' },
      { rel: 'preconnect', href: 'https://analytics.google.com' },
      { rel: 'preconnect', href: 'https://www.googletagmanager.com' }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      document.head.appendChild(link);
    });
  }

  // Initialize all optimizations
  static initialize() {
    // Run immediately
    this.inlineCriticalCSS();
    this.addResourceHints();
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupLazyLoading();
        this.monitorPerformance();
      });
    } else {
      this.setupLazyLoading();
      this.monitorPerformance();
    }

    // Run on window load
    window.addEventListener('load', () => {
      this.preloadCriticalResources();
      this.setupServiceWorker();
    });
  }
}