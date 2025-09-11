import { useEffect, useRef } from 'react';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  className?: string;
}

const GoogleAd = ({ 
  adSlot, 
  adFormat = "auto", 
  adLayout, 
  adLayoutKey,
  className = "flex justify-center py-4" 
}: GoogleAdProps) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Google Ad:', error);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle glass-card"
        style={{ 
          display: 'block',
          minHeight: '100px',
          background: 'transparent'
        }}
        data-ad-client="ca-pub-4997972039382567"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;