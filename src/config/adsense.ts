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
    // Header banner ad (468x60 or responsive) - "admission" ad unit
    header: "9345363531", // Real AdSense slot ID
    
    // Content area ads (using same slot for now - create more in AdSense if needed)
    contentTop: "9345363531", // Using same slot ID - create separate ones for better tracking
    contentMiddle: "9345363531", // Using same slot ID - create separate ones for better tracking
    contentBottom: "9345363531", // Using same slot ID - create separate ones for better tracking
    
    // Sidebar ads (using same slot for now)
    sidebar: "9345363531", // Using same slot ID - create separate ones for better tracking
    
    // Footer ad (using same slot for now)
    footer: "9345363531", // Using same slot ID - create separate ones for better tracking
    
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
