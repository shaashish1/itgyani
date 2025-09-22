import React from 'react';
import PopupAd from './PopupAd';
import { ADSENSE_CONFIG, getAdSenseConfig } from '@/config/adsense';

interface PopupManagerProps {
  page: 'home' | 'services' | 'about' | 'contact' | 'ai-studio' | 'careers' | 'case-studies' | 'blog' | 'terms' | 'privacy' | 'business-automation' | 'resources' | 'academy' | 'industries';
}

interface PopupConfig {
  entry?: {
    enabled: boolean;
    delay: number;
    adSlot: string;
    size: '300x250' | '400x300' | '500x400' | '320x240' | '250x200' | '200x150';
    frequency: 'once-session' | 'once-page' | 'persistent';
  };
  scroll?: {
    enabled: boolean;
    scrollTrigger: number;
    adSlot: string;
    size: '300x250' | '400x300' | '500x400' | '320x240' | '250x200' | '200x150';
    frequency: 'once-session' | 'once-page' | 'persistent';
  };
  exit?: {
    enabled: boolean;
    adSlot: string;
    size: '300x250' | '400x300' | '500x400' | '320x240' | '250x200' | '200x150';
    frequency: 'once-session' | 'once-page' | 'persistent';
  };
}

const PopupManager: React.FC<PopupManagerProps> = ({ page }) => {
  const getPopupConfig = (page: string): PopupConfig => {
    const config = getAdSenseConfig();
    const { adSlots, popups } = config;
    
    // Early return if popups are globally disabled
    if (!config.enabled || !popups.enabled) {
      return {}; // No popup configuration if disabled
    }

    // Default popup configuration (when enabled)
    const defaultConfig: PopupConfig = {
      entry: {
        enabled: false, // DISABLED for Google AdSense policy compliance
        delay: popups.entryDelay, // 30 seconds minimum per policy
        adSlot: adSlots["entry-popup"],
        size: '300x250' as const, // Standard IAB size
        frequency: 'once-session' as const
      },
      scroll: {
        enabled: false, // DISABLED for Google AdSense policy compliance
        scrollTrigger: popups.scrollThreshold, // 75% scroll threshold
        adSlot: adSlots["scroll-popup"],
        size: '300x250' as const,
        frequency: 'once-session' as const
      },
      exit: {
        enabled: false, // DISABLED for Google AdSense policy compliance
        adSlot: adSlots["exit-popup"],
        size: '300x250' as const,
        frequency: 'once-session' as const
      }
    };

    // All pages use the same disabled configuration for policy compliance
    return defaultConfig;
  };

  const config = getPopupConfig(page);

  return (
    <>
      {config.entry?.enabled && (
        <PopupAd
          type="entry"
          delay={config.entry.delay}
          frequency={config.entry.frequency}
          adSlot={config.entry.adSlot}
          size={config.entry.size}
        />
      )}

      {config.scroll?.enabled && (
        <PopupAd
          type="scroll"
          scrollTrigger={config.scroll.scrollTrigger}
          frequency={config.scroll.frequency}
          adSlot={config.scroll.adSlot}
          size={config.scroll.size}
        />
      )}

      {config.exit?.enabled && (
        <PopupAd
          type="exit"
          frequency={config.exit.frequency}
          adSlot={config.exit.adSlot}
          size={config.exit.size}
        />
      )}
    </>
  );
};

export default PopupManager;
