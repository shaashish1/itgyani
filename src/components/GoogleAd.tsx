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
  className = "w-full max-w-4xl mx-auto py-4" 
}: GoogleAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error('Error loading Google Ad:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      <div 
        ref={adRef}
        style={{
          minWidth: '300px',
          minHeight: '250px',
          width: '100%',
          maxWidth: '728px',
          margin: '0 auto'
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            height: '250px'
          }}
          data-ad-client="ca-pub-4997972039382567"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-ad-layout={adLayout}
          data-ad-layout-key={adLayoutKey}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default GoogleAd;