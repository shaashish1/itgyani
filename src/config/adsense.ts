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
    // === PHASE 1: CORE STRATEGIC POSITIONS ===
    // Start with these 3 high-impact, non-intrusive positions
    "after-hero": "9345363531",        // Post-hero engagement (your working slot)
    "content-mid": "CREATE_SLOT_2",    // Mid-content natural break
    "pre-footer": "CREATE_SLOT_3",     // Exit intent capture
    
    // === PHASE 2: PAGE-SPECIFIC POSITIONS (Future Implementation) ===
    "services-sidebar": "CREATE_SLOT_4",   // Desktop service browsing
    "services-between": "CREATE_SLOT_5",   // Between service cards
    "about-mid": "CREATE_SLOT_6",          // Professional about page break
    "contact-post": "CREATE_SLOT_7",       // After contact form completion
    
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
