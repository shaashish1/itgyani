import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ADSENSE_CONFIG } from '@/config/adsense';

interface PopupAdProps {
  type: 'entry' | 'scroll' | 'exit' | 'sticky';
  delay?: number;
  frequency: 'once-session' | 'once-page' | 'persistent';
  adSlot: string;
  size?: '300x250' | '400x300' | '500x400' | '320x240' | '250x200' | '200x150';
  scrollTrigger?: number; // percentage of page scrolled
  onClose?: () => void;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const PopupAd: React.FC<PopupAdProps> = ({
  type,
  delay = 10000,
  frequency,
  adSlot,
  size = '200x150',
  scrollTrigger = 50,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Get size dimensions
  const getSizeDimensions = (size: string) => {
    const dimensions = {
      '300x250': { width: 300, height: 250 },
      '400x300': { width: 400, height: 300 },
      '500x400': { width: 500, height: 400 },
      '320x240': { width: 320, height: 240 },
      '250x200': { width: 250, height: 200 },
      '200x150': { width: 200, height: 150 }
    };
    return dimensions[size as keyof typeof dimensions] || dimensions['200x150'];
  };

  const { width, height } = getSizeDimensions(size);

  // Check if popup has been shown based on frequency
  const checkFrequency = () => {
    const key = `popup_${type}_${frequency}`;
    const now = Date.now();
    
    switch (frequency) {
      case 'once-session':
        return !sessionStorage.getItem(key);
      case 'once-page':
        return !sessionStorage.getItem(`${key}_${window.location.pathname}`);
      case 'persistent':
        return true;
      default:
        return true;
    }
  };

  // Mark popup as shown
  const markAsShown = () => {
    const key = `popup_${type}_${frequency}`;
    const now = Date.now();
    
    switch (frequency) {
      case 'once-session':
        sessionStorage.setItem(key, now.toString());
        break;
      case 'once-page':
        sessionStorage.setItem(`${key}_${window.location.pathname}`, now.toString());
        break;
    }
  };

  // Handle popup close
  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
    markAsShown();
    if (onClose) onClose();
  };

  // Entry popup logic
  useEffect(() => {
    if (type === 'entry' && !hasShown && checkFrequency()) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        markAsShown();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [type, delay, hasShown]);

  // Scroll popup logic
  useEffect(() => {
    if (type === 'scroll' && !hasShown && checkFrequency()) {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent >= scrollTrigger) {
          setIsVisible(true);
          markAsShown();
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [type, scrollTrigger, hasShown]);

  // Exit intent logic
  useEffect(() => {
    if (type === 'exit' && !hasShown && checkFrequency()) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true);
          markAsShown();
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [type, hasShown]);

  // Sticky popup logic
  useEffect(() => {
    if (type === 'sticky' && checkFrequency()) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [type, delay]);

  // Initialize AdSense
  useEffect(() => {
    if (isVisible && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        onClick={type !== 'sticky' ? handleClose : undefined}
      />
      
      {/* Popup */}
      <div 
        className={`fixed z-[9999] ${
          type === 'sticky' 
            ? 'bottom-4 right-4' 
            : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        } ${className}`}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ 
            width: type === 'sticky' ? 200 : width,
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}
        >
          {/* Header with close button */}
          <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
            <span className="text-xs text-gray-500 font-medium">Advertisement</span>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close advertisement"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Ad Content */}
          <div className="p-4">
            <ins 
              className="adsbygoogle block"
              style={{ 
                display: 'block',
                width: type === 'sticky' ? 160 : width - 32,
                height: type === 'sticky' ? 160 : height - 32
              }}
              data-ad-client={ADSENSE_CONFIG.publisherId}
              data-ad-slot={adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupAd;
