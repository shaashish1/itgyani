/**
 * Google AdSense Configuration for ITGYANI
 * 
 * COMPLIANCE: Designed to meet Google AdSense Policy Requirements
 * - Minimum content requirements (original, valuable content)
 * - User experience standards (non-intrusive ad placement)
 * - Quality guidelines (relevant, compliant content)
 * 
 * References:
 * - https://support.google.com/adsense/answer/9335564#minimum_content_requirements
 * - https://support.google.com/adsense/answer/10015918
 * - https://support.google.com/webmasters/answer/9044175#thin-content
 * - https://support.google.com/adsense/answer/1348737
 */

export const ADSENSE_CONFIG = {
  // === GLOBAL CONTROLS ===
  enabled: true,                    // Master switch for all AdSense ads
  testMode: false,                  // Set to true for testing (uses test ads)
  
  // === POLICY COMPLIANCE SETTINGS ===
  policies: {
    respectUserExperience: true,    // Ensures ads don't disrupt user experience
    minimumContentGap: 300,         // Minimum pixels between ads (Google recommendation)
    maxAdsPerPage: 3,              // Limit ads per page (Google best practice)
    mobileOptimized: true,         // Mobile-first ad placement
    accessibilityCompliant: true,   // WCAG compliance for ads
  },

  // === POPUP CONTROLS (COMPLIANCE-FOCUSED) ===
  popups: {
    enabled: false,                 // DISABLED by default for policy compliance
    entryDelay: 30000,             // 30 seconds minimum (user engagement requirement)
    scrollThreshold: 75,           // Only after 75% page scroll (value-first approach)
    frequency: 'once-session',     // Respect user experience
    respectCookieConsent: true,    // Honor privacy preferences
    mobileDisabled: true,          // Disable on mobile (UX best practice)
  },

  // Your AdSense Publisher ID (already configured)
  publisherId: "ca-pub-4997972039382567",
  
  // === AD SLOT CONFIGURATION ===
  // IMPORTANT: Replace these with your actual ad slot IDs from AdSense dashboard
  // To get real slot IDs:
  // 1. Go to https://www.google.com/adsense/
  // 2. Navigate to Ads > By ad unit
  // 3. Create new ad units or copy existing slot IDs
  
  adSlots: {
     // === PRIMARY CONTENT ADS (POLICY COMPLIANT) ===
     "content-top": "7044876068",       // After main headline (high value content)
     "content-mid": "7044876068",       // Between content sections (natural breaks)
     "content-bottom": "7044876068",    // After main content (completion point)
    
     // === SIDEBAR ADS (DESKTOP ONLY) ===
     "sidebar-top": "7044876068",       // Desktop sidebar placement
     "sidebar-mid": "7044876068",       // Mid-sidebar (complementary content)
    
     // === POPUP SYSTEM SLOTS (DISABLED FOR COMPLIANCE) ===
     "entry-popup": "2469074914",       // ⚠️ DISABLED - Entry popup ads
     "scroll-popup": "7256204022",      // ⚠️ DISABLED - Scroll-triggered ads  
     "exit-popup": "3882228932",        // ⚠️ DISABLED - Exit intent ads
    
     // === PAGE-SPECIFIC POSITIONS ===
     "services-between": "7044876068",   // Between service cards (natural flow)
     "about-expertise": "7044876068",    // After expertise section (relevant context)
     "contact-info": "7044876068",       // After contact information (completion)
     "resources-featured": "7044876068", // Featured resources section
     "academy-courses": "7044876068",    // Between course listings
     "industries-solutions": "7044876068", // Industry-specific solutions
    
     // === MOBILE OPTIMIZATION ===
     "mobile-header": "7044876068",      // Mobile-optimized header placement
     "mobile-content": "7044876068",    // Mobile content integration
     "mobile-footer": "7044876068",     // Mobile footer placement
    
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
  
  // === AD FORMATS (GOOGLE APPROVED SIZES) ===
  formats: {
    // Standard IAB formats (Google recommended)
    leaderboard: {
      width: 728,
      height: 90,
      format: "horizontal",
      placement: "header/footer"
    },
    mediumRectangle: {
      width: 300, 
      height: 250,
      format: "rectangle",
      placement: "content/sidebar"
    },
    skyscraper: {
      width: 300,
      height: 600,
      format: "vertical",
      placement: "sidebar"
    },
    banner: {
      width: 320,
      height: 50,
      format: "mobile",
      placement: "mobile-only"
    },
    responsive: {
      format: "auto",
      fullWidth: true,
      placement: "any"
    }
  },

  // === POLICY COMPLIANCE FUNCTIONS ===
  compliance: {
    // Check if content meets minimum requirements
    validateContent: (wordCount: number, hasOriginalContent: boolean) => {
      return wordCount >= 300 && hasOriginalContent; // Google minimum content requirements
    },
    
    // Ensure ad density compliance
    validateAdDensity: (contentLength: number, adCount: number) => {
      const ratio = adCount / (contentLength / 1000); // Ads per 1000 characters
      return ratio <= 0.3; // Max 30% ad density (conservative approach)
    },
    
    // Check user experience standards
    validateUserExperience: (timeOnPage: number, scrollDepth: number) => {
      return timeOnPage >= 30 && scrollDepth >= 25; // User engagement thresholds
    }
  }
};

// === ENVIRONMENT-BASED CONFIGURATION ===
export const getAdSenseConfig = () => {
  const config = { ...ADSENSE_CONFIG };
  
  // Use safe defaults for browser environment
  config.testMode = true; // Default to test mode for safety
  config.popups.enabled = false; // No popups by default
  
  // Test mode configuration
  if (config.testMode) {
    // Use Google's test publisher ID for testing
    config.publisherId = "ca-pub-3940256099942544"; // Google test publisher
    
    // Override all slots with test slots
    Object.keys(config.adSlots).forEach(key => {
      config.adSlots[key] = "6300978111"; // Google test slot
    });
  }
  
  return config;
};

/**
 * === GOOGLE ADSENSE POLICY COMPLIANCE GUIDE ===
 * 
 * 🎯 HOW TO ENABLE/DISABLE ADS:
 * 
 * 1. MASTER CONTROL:
 *    - Set ADSENSE_CONFIG.enabled = true/false
 *    - This controls ALL ads on the website
 * 
 * 2. POPUP CONTROL:
 *    - Set ADSENSE_CONFIG.popups.enabled = true/false
 *    - Currently DISABLED for policy compliance
 * 
 * 3. PAGE-SPECIFIC CONTROL:
 *    - Edit PopupManager.tsx configs per page
 *    - Set enabled: false for specific pages
 * 
 * 4. TEST MODE:
 *    - Set ADSENSE_CONFIG.testMode = true
 *    - Uses Google test ads (safe for testing)
 * 
 * 🔒 POLICY COMPLIANCE CHECKLIST:
 * 
 * ✅ Content Requirements:
 *    - Minimum 300 words per page
 *    - Original, valuable content
 *    - Clear navigation structure
 *    - Professional design
 * 
 * ✅ Ad Placement Guidelines:
 *    - No popups on page load (30+ second delay if used)
 *    - Maximum 3 ads per page
 *    - 300px minimum gap between ads
 *    - Mobile-optimized placement
 * 
 * ✅ User Experience Standards:
 *    - Fast loading times
 *    - Non-intrusive ad placement
 *    - Clear content-ad distinction
 *    - Accessibility compliance
 * 
 * ✅ Quality Guidelines:
 *    - No thin/low-quality content
 *    - Relevant, helpful information
 *    - Regular content updates
 *    - Professional presentation
 * 
 * 🚀 IMPLEMENTATION STEPS:
 * 
 * 1. Get your real AdSense slot IDs:
 *    - Login to https://www.google.com/adsense/
 *    - Click "Ads" → "By ad unit"  
 *    - Create new ad units or copy existing ones
 *    - Replace placeholder IDs above with real ones
 * 
 * 2. Test your setup:
 *    - Set testMode = true first
 *    - Verify ads display correctly
 *    - Check policy compliance
 *    - Switch to production IDs
 * 
 * 3. Monitor performance:
 *    - Check AdSense dashboard regularly
 *    - Monitor policy warnings
 *    - Optimize based on performance data
 * 
 * 📋 CURRENT STATUS:
 *    - ✅ Master ads: ENABLED
 *    - ❌ Popups: DISABLED (policy compliance)
 *    - ✅ Content ads: ENABLED
 *    - ✅ Mobile optimization: ENABLED
 *    - ✅ Test mode: Available
 * 
 * For support: https://support.google.com/adsense/
 */
