import React, { useEffect } from 'react';
import { getAdSenseConfig } from '@/config/adsense';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Google AdSense Ad Component - Policy Compliant
 * 
 * This component renders standard AdSense ads in compliance with Google's policies:
 * - Non-intrusive placement
 * - Clear content-ad distinction
 * - Mobile responsive
 * - Accessibility compliant
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
  style = {}
}) => {
  const config = getAdSenseConfig();

  useEffect(() => {
    try {
      // Only load ads if AdSense is enabled
      if (config.enabled && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [config.enabled]);

  // Don't render if AdSense is disabled
  if (!config.enabled) {
    return null;
  }

  // Get the ad slot ID
  const adSlot = config.adSlots[slot] || config.adSlots.auto;

  // Test mode - show professional placeholder
  if (config.testMode) {
    return (
      <div 
        className={`ad-placeholder ${className}`} 
        style={{
          ...style,
          margin: '20px 0'
        }}
      >
        <div className="relative w-full rounded-lg border border-border bg-muted/30 overflow-hidden">
          <div className="flex items-center justify-center py-12 px-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <svg 
                  className="w-6 h-6 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                  <path d="M9 9h6v6H9z" strokeWidth="2"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-muted-foreground">Advertisement Space</p>
              <p className="text-xs text-muted-foreground/60">Development Mode - Real ads will show in production</p>
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
    <div className={`adsense-ad ${className}`} style={{
      ...style,
      margin: '20px 0',
      textAlign: 'center',
      minHeight: '250px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center'
        }}
        data-ad-client={config.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={responsive ? 'auto' : format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        aria-label="Advertisement"
      />
    </div>
  );
};

export default AdSenseAd;