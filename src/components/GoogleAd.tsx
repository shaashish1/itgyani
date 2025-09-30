import { useEffect, useRef } from "react";
import { ADSENSE_CONFIG } from "@/config/adsense";

interface GoogleAdProps {
  adSlot?: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  className?: string;
  position?: 
    // Phase 1: Core positions
    | 'after-hero' | 'content-mid' | 'pre-footer'
    // Phase 2: Page-specific positions  
    | 'services-sidebar' | 'services-between' | 'about-mid' | 'contact-post'
    // Phase 3: Mobile positions
    | 'mobile-banner' | 'mobile-square'
    // Legacy positions (for backward compatibility)
    | 'header' | 'contentTop' | 'contentMiddle' | 'contentBottom' | 'sidebar' | 'footer' | 'auto';
}

const GoogleAd = ({
  adSlot,
  adFormat = "auto", 
  adLayout,
  adLayoutKey,
  className = "w-full py-4 my-6",
  position = "auto"
}: GoogleAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  // Get the appropriate ad slot based on position or use provided adSlot
  const actualAdSlot = adSlot || ADSENSE_CONFIG.adSlots[position];

  /** Initialize AdSense ads when component mounts */
  useEffect(() => {
    const initializeAd = () => {
      try {
        // Wait for AdSense script to load
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // Push empty object to trigger ad loading
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log('AdSense ad initialized for slot:', actualAdSlot, 'at position:', position);
        } else {
          // Retry after a short delay if script isn't loaded yet
          setTimeout(initializeAd, 500);
        }
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeAd, 100);
    return () => clearTimeout(timer);
  }, [actualAdSlot, position]);

  return (
    <div className={className}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Professional Ad Placeholder */}
        <div 
          ref={adRef}
          className="relative w-full rounded-lg border border-border bg-muted/30 overflow-hidden"
        >
          <div className="flex items-center justify-center py-16 px-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                <svg 
                  className="w-7 h-7 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-muted-foreground">Advertisement Space</p>
              <p className="text-xs text-muted-foreground/60">Sponsored Content</p>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-background/80 text-muted-foreground border border-border">
              Ad
            </span>
          </div>
          
          {/* Hidden actual ad element for when ads are enabled */}
          <ins
            className="adsbygoogle hidden"
            style={{
              display: 'inline-block',
              width: '468px',
              height: '60px',
              maxWidth: '100%',
            }}
            data-ad-client={ADSENSE_CONFIG.publisherId}
            data-ad-slot={actualAdSlot !== 'auto' ? actualAdSlot : undefined}
            data-ad-format={adFormat}
            data-ad-layout={adLayout}
            data-ad-layout-key={adLayoutKey}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleAd;
