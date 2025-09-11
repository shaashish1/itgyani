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
    // === HOME PAGE ADS ===
    homeHero: "9345363531", // Your current working slot - use for main hero area
    homeContent: "CREATE_NEW_SLOT_1", // Create new slot for home page content
    homeFooter: "CREATE_NEW_SLOT_2", // Create new slot for home page footer
    
    // === SERVICES PAGE ADS ===
    servicesHeader: "CREATE_NEW_SLOT_3", // Create new slot for services header
    servicesContent: "CREATE_NEW_SLOT_4", // Create new slot for services content
    servicesSidebar: "CREATE_NEW_SLOT_5", // Create new slot for services sidebar
    
    // === ABOUT PAGE ADS ===
    aboutHeader: "CREATE_NEW_SLOT_6", // Create new slot for about header
    aboutContent: "CREATE_NEW_SLOT_7", // Create new slot for about content
    
    // === BLOG/ARTICLES ADS ===
    blogHeader: "CREATE_NEW_SLOT_8", // Create new slot for blog header
    blogContent: "CREATE_NEW_SLOT_9", // Create new slot for blog content
    blogSidebar: "CREATE_NEW_SLOT_10", // Create new slot for blog sidebar
    
    // === CONTACT PAGE ADS ===
    contactHeader: "CREATE_NEW_SLOT_11", // Create new slot for contact header
    
    // === FALLBACK/GENERAL ===
    header: "9345363531", // Your working slot as fallback
    contentTop: "9345363531", // Your working slot as fallback
    contentMiddle: "9345363531", // Your working slot as fallback
    contentBottom: "9345363531", // Your working slot as fallback
    sidebar: "9345363531", // Your working slot as fallback
    footer: "9345363531", // Your working slot as fallback
    
    // Auto ads (let Google choose placement)
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
