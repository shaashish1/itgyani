import React from 'react';
import PopupAd from './PopupAd';

interface PopupManagerProps {
  page: 'home' | 'services' | 'about' | 'contact' | 'ai-studio' | 'careers' | 'case-studies' | 'blog' | 'terms' | 'privacy' | 'business-automation';
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
    const configs = {
      home: {
        entry: {
          enabled: true,
          delay: 10000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 50,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      services: {
        entry: {
          enabled: true,
          delay: 10000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 50,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      about: {
        entry: {
          enabled: true,
          delay: 10000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 60,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      contact: {
        entry: {
          enabled: true,
          delay: 15000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 40,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      'ai-studio': {
        entry: {
          enabled: true,
          delay: 15000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 50,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      careers: {
        entry: {
          enabled: true,
          delay: 12000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 45,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      'case-studies': {
        entry: {
          enabled: true,
          delay: 10000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 55,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      blog: {
        entry: {
          enabled: true,
          delay: 8000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 40,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      terms: {
        entry: {
          enabled: true,
          delay: 20000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 70,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      privacy: {
        entry: {
          enabled: true,
          delay: 20000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 70,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
          size: '250x200' as const,
          frequency: 'once-session' as const
        }
      },
      'business-automation': {
        entry: {
          enabled: true,
          delay: 12000,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-session' as const
        },
        scroll: {
          enabled: true,
          scrollTrigger: 50,
          adSlot: "7044876068",
          size: '200x150' as const,
          frequency: 'once-page' as const
        },
        exit: {
          enabled: true,
          adSlot: "7044876068",
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
