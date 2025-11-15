import React, { useEffect, useRef, useState } from 'react';
import { getAdSenseConfig } from '@/config/adsense';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'leaderboard' | 'banner' | 'square' | 'mobile';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  layoutKey?: string;
  adTest?: boolean;
}

/**
 * Google AdSense Ad Component - Policy Compliant
 * 
 * Follows Google Ads specifications and best practices:
 * - Standard IAB ad sizes (300x250, 728x90, 320x50, etc.)
 * - Optimal placement for user experience
 * - Mobile-first responsive design
 * - Above-the-fold and below-the-fold optimization
 * - Viewability optimization for better performance
 * - Accessibility and user experience compliance
 * 
 * Reference: https://support.google.com/google-ads/answer/13676244
 * 
 * Usage:
 * <AdSenseAd 
 *   slot="content-mid" 
 *   format="rectangle"
 *   responsive={true}
 * />
 */
const AdSenseAd: React.FC<AdSenseAdProps> = ({ 
  slot, 
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
  layoutKey = '',
  adTest = false
}) => {
  const config = getAdSenseConfig();
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Google AdSense Standard Ad Sizes (IAB compliant)
  const getAdDimensions = () => {
    const adSizes = {
      // Most Popular Formats (Google Recommended)
      'rectangle': { width: 300, height: 250, name: 'Medium Rectangle' },      // Best performing
      'leaderboard': { width: 728, height: 90, name: 'Leaderboard' },         // Header/Footer
      'horizontal': { width: 728, height: 90, name: 'Leaderboard' },          // Same as leaderboard
      
      // Sidebar and Vertical Formats
      'vertical': { width: 300, height: 600, name: 'Half Page' },             // Sidebar
      'square': { width: 250, height: 250, name: 'Square' },                  // Compact
      
      // Mobile Optimized Formats
      'banner': { width: 320, height: 50, name: 'Mobile Banner' },            // Mobile top
      'mobile': { width: 320, height: 100, name: 'Large Mobile Banner' },     // Mobile content
      
      // Responsive
      'auto': { width: '100%', height: 'auto', name: 'Responsive' }           // Auto-sizing
    };
    return adSizes[format] || adSizes.auto;
  };

  const dimensions = getAdDimensions();

  useEffect(() => {
    // Don't initialize if already loaded or disabled
    if (adLoaded || !config.enabled) {
      return;
    }

    // Enhanced Intersection Observer for better viewability
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !adLoaded) {
            setIsVisible(true);
            
            // Only load ad if it has sufficient size and visibility
            const rect = entry.target.getBoundingClientRect();
            if (rect.width > 200 && rect.height > 100) {
              try {
                // Initialize AdSense script if needed
                if (!window.adsbygoogle) {
                  const script = document.createElement('script');
                  script.async = true;
                  script.crossOrigin = 'anonymous';
                  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.publisherId}`;
                  document.head.appendChild(script);
                  window.adsbygoogle = window.adsbygoogle || [];
                }

                // Push ad for rendering with delay for better performance
                setTimeout(() => {
                  if (window.adsbygoogle && adRef.current) {
                    (window.adsbygoogle as any[]).push({});
                    setAdLoaded(true);
                  }
                }, 100);
                
                observer.disconnect();
              } catch (error) {
                console.warn('AdSense initialization error:', error);
              }
            }
          }
        });
      },
      { 
        rootMargin: '200px 0px',  // Load 200px before entering viewport
        threshold: 0.1            // Trigger when 10% visible
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [config.enabled, config.publisherId, adLoaded]);

  // Don't render if AdSense is disabled
  if (!config.enabled) {
    return null;
  }

  // Get the ad slot ID
  const adSlot = config.adSlots[slot] || config.adSlots.auto;

  // Test mode or development - show professional placeholder
  if (config.testMode || adTest) {
    return (
      <div 
        ref={adRef}
        className={`ad-placeholder ${className}`} 
        style={{
          ...style,
          margin: '20px auto',
          width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
          height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : '250px',
          minHeight: '200px',
          maxWidth: '100%'
        }}
      >
        <div className="relative w-full h-full rounded-lg border border-border bg-muted/30 overflow-hidden">
          <div className="flex items-center justify-center h-full px-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <svg 
                  className="w-6 h-6 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-muted-foreground">Advertisement Space</p>
              <p className="text-xs text-muted-foreground/70">
                {dimensions.name} ({typeof dimensions.width === 'number' ? dimensions.width : 'Auto'} × {typeof dimensions.height === 'number' ? dimensions.height : 'Auto'})
              </p>
              <p className="text-xs text-muted-foreground/60">Development Mode - Real ads in production</p>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-background/80 text-muted-foreground border border-border">
              Ad
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Production mode - render real AdSense ad
  return (
    <div 
      ref={adRef}
      className={`adsense-ad adsense-${format} ${className}`} 
      style={{
        ...style,
        margin: '20px auto',
        width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
        minHeight: typeof dimensions.height === 'number' ? `${dimensions.height}px` : '200px',
        maxWidth: '100%',
        display: 'block',
        textAlign: 'center'
      }}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Ad Loading Placeholder */}
      {!adLoaded && isVisible && (
        <div 
          className="ad-loading-placeholder"
          style={{
            width: '100%',
            height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : '200px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ color: '#999', fontSize: '14px' }}>Loading ad...</span>
        </div>
      )}

      {/* Actual AdSense Ad */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
          height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : 'auto',
          textAlign: 'center'
        }}
        data-ad-client={config.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={responsive && format === 'auto' ? 'auto' : format}
        data-ad-layout-key={layoutKey || undefined}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        data-adtest={config.testMode ? 'on' : undefined}
      />

      {/* Loading Animation CSS */}
      <style>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

// Global type declaration for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdSenseAd;