/**
 * Google AdSense Configuration for ITGYANI
 * 
 * Update these values with your actual AdSense settings
 * from your Google AdSense dashboard
 */

export const ADSENSE_CONFIG = {
  // Your AdSense Publisher ID (already configured)
  publisherId: "ca-pub-4997972039382567",
  
  // IMPORTANT: Replace these with your actual ad slot IDs from AdSense dashboard
  // To get real slot IDs:
  // 1. Go to https://www.google.com/adsense/
  // 2. Navigate to Ads > By ad unit
  // 3. Create new ad units or copy existing slot IDs
  
  adSlots: {
    // === ACTIVE REAL SLOT IDS ===
    "after-hero": "7044876068",        // Your real working slot (itgyani)
    "content-mid": "7044876068",       // Using same slot for consistency
    "pre-footer": "7044876068",        // Using same slot for consistency
    
    // === POPUP SYSTEM SLOTS ===
    "entry-popup": "7044876068",       // Entry popup ads
    "scroll-popup": "7044876068",      // Scroll-triggered ads
    "exit-popup": "7044876068",        // Exit intent ads
    
    // === PAGE-SPECIFIC POSITIONS (Future Implementation) ===
    "services-sidebar": "7044876068",   // Desktop service browsing
    "services-between": "7044876068",   // Between service cards
    "about-mid": "7044876068",          // Professional about page break
    "contact-post": "7044876068",       // After contact form completion
    
    // === PHASE 3: MOBILE OPTIMIZATION (Future Implementation) ===
    "mobile-banner": "CREATE_SLOT_8",      // Mobile-optimized banner
    "mobile-square": "CREATE_SLOT_9",      // Mobile square format
    
    // === LEGACY FALLBACK POSITIONS ===
    // Keep these for backward compatibility with existing components
    header: "9345363531",
    contentTop: "9345363531", 
    contentMiddle: "9345363531",
    contentBottom: "9345363531",
    sidebar: "9345363531",
    footer: "9345363531",
    auto: "auto"
  },
  
  // Common ad formats
  formats: {
    banner: {
      width: 728,
      height: 90,
      format: "horizontal"
    },
    rectangle: {
      width: 300, 
      height: 250,
      format: "rectangle"
    },
    skyscraper: {
      width: 300,
      height: 600,
      format: "vertical"
    },
    responsive: {
      format: "auto",
      fullWidth: true
    }
  }
};

/**
 * How to get your real AdSense slot IDs:
 * 
 * 1. Login to https://www.google.com/adsense/
 * 2. Click "Ads" in the left sidebar
 * 3. Click "By ad unit"  
 * 4. Click "Create new ad unit" or select existing ones
 * 5. For each ad unit, copy the "data-ad-slot" value
 * 6. Replace the placeholder IDs above with your real ones
 * 
 * Example:
 * If your ad unit code shows: data-ad-slot="9876543210"
 * Then update: header: "9876543210"
 */
