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

  // Test mode warning
  if (config.testMode) {
    return (
      <div className={`ad-test-mode ${className}`} style={{
        ...style,
        border: '2px dashed #ff6b6b',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fff5f5',
        color: '#666',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <p><strong>TEST MODE</strong></p>
        <p>AdSense Test Ad - Slot: {slot}</p>
        <p>ID: {adSlot}</p>
      </div>
    );
  }

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