import React from 'react';
import PopupAd from './PopupAd';

interface PopupManagerProps {
  page: 'home' | 'services' | 'about' | 'contact';
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
  // Configuration for different pages
  const getPopupConfig = (page: string): PopupConfig => {
    const configs = {
      home: {
        entry: {
          enabled: true,
          delay: 10000, // 10 seconds
          adSlot: "9345363531", // Your working slot
          size: '200x150' as const, // Small, non-intrusive
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 50, // 50% of page
          adSlot: "9345363531", // Your working slot
          size: '200x150' as const, // Small, consistent
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "9345363531", // Your working slot
          size: '250x200' as const, // Slightly larger for exit intent
          frequency: 'once-session' as const
        }
      },
      services: {
        entry: {
          enabled: true,
          delay: 10000, // Reduced to match homepage
          adSlot: "9345363531",
          size: '200x150' as const, // Small, consistent
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 50, // Add scroll popup to services
          adSlot: "9345363531",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "9345363531",
          size: '250x200' as const, // Slightly larger for exit intent
          frequency: 'once-session' as const
        }
      },
      about: {
        entry: {
          enabled: true,
          delay: 10000, // Reduced to match other pages
          adSlot: "9345363531",
          size: '200x150' as const, // Small, consistent
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 60, // Trigger later on about page
          adSlot: "9345363531",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "9345363531",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      contact: {
        entry: {
          enabled: true,
          delay: 15000, // Slightly longer on contact page
          adSlot: "9345363531",
          size: '200x150' as const, // Small, consistent
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 40, // Earlier trigger on contact page
          adSlot: "9345363531",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "9345363531",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      }
    };

    return configs[page as keyof typeof configs] || configs.home;
  };

  const config = getPopupConfig(page);

  return (
    <>
      {/* Entry Popup */}
      {config.entry?.enabled && (
        <PopupAd
          type="entry"
          delay={config.entry.delay}
          frequency={config.entry.frequency}
          adSlot={config.entry.adSlot}
          size={config.entry.size}
        />
      )}

      {/* Scroll Popup */}
      {config.scroll?.enabled && (
        <PopupAd
          type="scroll"
          scrollTrigger={config.scroll.scrollTrigger}
          frequency={config.scroll.frequency}
          adSlot={config.scroll.adSlot}
          size={config.scroll.size}
        />
      )}

      {/* Exit Intent Popup */}
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
