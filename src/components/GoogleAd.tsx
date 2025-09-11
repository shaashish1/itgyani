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

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
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
        {/* Ad Container */}
        <div 
          ref={adRef}
          className="flex justify-center items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-2 shadow-sm"
          style={{ minHeight: '80px', maxWidth: '488px', margin: '0 auto' }}
        >
          <ins
            className="adsbygoogle"
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
        
        {/* Development/Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 text-center mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            📢 AdSense Debug: Publisher ID {ADSENSE_CONFIG.publisherId} | Slot: {actualAdSlot} | Position: {position} | Format: {adFormat}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleAd;
