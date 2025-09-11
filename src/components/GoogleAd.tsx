import { useEffect, useRef } from "react";

interface GoogleAdProps {
  adSlot?: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  className?: string;
  showMultiple?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const GoogleAd = ({
  adSlot = "1234567890",
  adFormat = "auto",
  adLayout,
  adLayoutKey,
  className = "w-full py-4",
  showMultiple = false,
}: GoogleAdProps) => {
  const adRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Different ad slots for multiple ads
  const adSlots = [
    adSlot || "1234567890",
    "1234567891",
    "1234567892",
    "1234567893",
  ];

  /** Load Google AdSense script dynamically */
  useEffect(() => {
    if (
      !document.querySelector(
        "script[src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.setAttribute("data-ad-client", "ca-pub-4997972039382567");
      document.body.appendChild(script);
    }
  }, []);

  /** Initialize ads when visible */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
              console.warn("Ad already loaded:", err);
            }
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    const numAds = showMultiple ? 4 : 1;
    for (let i = 0; i < numAds; i++) {
      if (adRefs.current[i]) {
        observer.observe(adRefs.current[i]!);
      }
    }

    return () => observer.disconnect();
  }, [showMultiple]);

  if (showMultiple) {
    return (
      <div className={`${className} px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
          {adSlots.map((slot, index) => (
            <div
              key={index}
              ref={(el) => (adRefs.current[index] = el)}
              className="bg-card rounded-lg border p-2 min-h-[250px] flex items-center justify-center"
            >
              <ins
                className="adsbygoogle"
                style={{
                  display: "block",
                  width: "100%",
                  height: "250px",
                }}
                data-ad-client="ca-pub-4997972039382567"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        ref={(el) => (adRefs.current[0] = el)}
        style={{
          minWidth: "300px",
          minHeight: "250px",
          width: "100%",
          maxWidth: "728px",
          margin: "0 auto",
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "250px",
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
