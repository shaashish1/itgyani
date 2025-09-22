# Google AdSense Configuration & Policy Compliance Guide

## 🎯 **How to Enable/Disable AdSense**

### **Master Controls Location**
File: `/home/itgyani.com/itgyani/src/config/adsense.ts`

### **Primary Settings**

```typescript
export const ADSENSE_CONFIG = {
  // === GLOBAL CONTROLS ===
  enabled: true,                    // Master switch for ALL AdSense ads
  testMode: false,                  // Set to true for testing (uses test ads)
  
  // === POPUP CONTROLS (CURRENTLY DISABLED FOR COMPLIANCE) ===
  popups: {
    enabled: false,                 // Popup ads disabled for policy compliance
    entryDelay: 30000,             // 30 seconds minimum (if enabled)
    scrollThreshold: 75,           // Only after 75% page scroll
    frequency: 'once-session',     // Respect user experience
    mobileDisabled: true,          // Disabled on mobile (UX best practice)
  },
}
```

## 🔧 **How to Control AdSense**

### **1. Enable/Disable ALL Ads**
```typescript
// To turn off all ads completely
enabled: false,

// To turn on all ads
enabled: true,
```

### **2. Enable/Disable Popups** 
```typescript
// Keep popups disabled (RECOMMENDED for Google policy compliance)
popups: {
  enabled: false,  // ✅ RECOMMENDED: Disabled for policy compliance
}

// If you must enable popups (NOT RECOMMENDED)
popups: {
  enabled: true,   // ⚠️ CAUTION: May violate Google policies
  entryDelay: 30000, // Wait 30+ seconds before showing
  scrollThreshold: 75, // Only after significant engagement
}
```

### **3. Test Mode**
```typescript
// For development/testing (uses Google test ads)
testMode: true,

// For production (uses your real ad slots)
testMode: false,
```

## 📋 **Google AdSense Policy Compliance**

### **Current Compliance Status: ✅ COMPLIANT**

- ✅ **Popups DISABLED** - Respects user experience
- ✅ **Standard ad sizes** - Uses Google IAB standard formats
- ✅ **Mobile optimized** - Responsive ad placement
- ✅ **Content-first approach** - Ads complement, don't interrupt
- ✅ **Minimum content requirements** - Quality content pages
- ✅ **User engagement thresholds** - Ads only after engagement

### **Policy Requirements Addressed**

#### **1. Minimum Content Requirements** ✅
- **Requirement**: Original, valuable content (300+ words per page)
- **Implementation**: All pages have substantial, original content
- **Reference**: [Google Policy](https://support.google.com/adsense/answer/9335564#minimum_content_requirements)

#### **2. User Experience Standards** ✅
- **Requirement**: Non-intrusive ad placement
- **Implementation**: Popups disabled, content-integrated ads only
- **Reference**: [UX Guidelines](https://support.google.com/adsense/answer/10015918)

#### **3. Quality Guidelines** ✅
- **Requirement**: No thin/low-quality content
- **Implementation**: Professional, informative content on all pages
- **Reference**: [Quality Standards](https://support.google.com/webmasters/answer/9044175#thin-content)

#### **4. Better Ad Standards** ✅
- **Requirement**: Coalition for Better Ads compliance
- **Implementation**: No popup ads, standard placements
- **Reference**: [Better Ads](https://support.google.com/adsense/answer/1348737)

## 🛠️ **Implementation Guide**

### **Step 1: Get Your Real AdSense IDs**

1. Login to [Google AdSense](https://www.google.com/adsense/)
2. Navigate to **Ads** → **By ad unit**
3. Create new ad units or copy existing slot IDs
4. Update the slot IDs in `adsense.ts`:

```typescript
adSlots: {
  "content-top": "YOUR_REAL_SLOT_ID",        // Replace with actual ID
  "content-mid": "YOUR_REAL_SLOT_ID",        // Replace with actual ID
  "content-bottom": "YOUR_REAL_SLOT_ID",     // Replace with actual ID
  // ... other slots
}
```

### **Step 2: Test Your Setup**

1. **Enable Test Mode First**:
   ```typescript
   testMode: true,  // Uses Google test ads
   ```

2. **Build and Test**:
   ```bash
   cd /home/itgyani.com/itgyani
   npm run build
   cp -r dist/* /home/itgyani.com/public_html/
   ```

3. **Verify Ads Display**:
   - Check that test ads appear correctly
   - Verify no console errors
   - Test on mobile devices

4. **Switch to Production**:
   ```typescript
   testMode: false,  // Uses your real slot IDs
   ```

### **Step 3: Monitor Performance**

- Check AdSense dashboard regularly
- Monitor policy warnings
- Optimize based on performance data

## 🚀 **File Structure**

### **Core AdSense Files**
```
src/
├── config/
│   └── adsense.ts              # Main configuration file
├── components/
│   ├── AdSenseAd.tsx           # Standard ad component
│   ├── PopupManager.tsx        # Popup management (disabled)
│   └── AdSenseControlPanel.tsx # Development control panel
└── vite-env.d.ts              # TypeScript declarations
```

### **Usage Examples**

#### **Standard Content Ad**
```tsx
import AdSenseAd from '@/components/AdSenseAd';

// In your component
<AdSenseAd 
  slot="content-mid" 
  format="rectangle"
  responsive={true}
/>
```

#### **Development Control Panel**
```tsx
import AdSenseControlPanel from '@/components/AdSenseControlPanel';

// Add to your main layout (only shows in development)
<AdSenseControlPanel />
```

## ⚙️ **Configuration Options**

### **Ad Slot Types**
- `content-top` - After main headline
- `content-mid` - Between content sections  
- `content-bottom` - After main content
- `sidebar-top` - Desktop sidebar
- `mobile-header` - Mobile header
- `mobile-content` - Mobile content integration

### **Ad Formats**
- `auto` - Responsive (recommended)
- `rectangle` - 300x250 medium rectangle
- `vertical` - 300x600 skyscraper
- `horizontal` - 728x90 leaderboard

### **Compliance Features**
- Automatic policy checking
- Content validation
- Ad density monitoring
- User experience metrics

## 🔍 **Troubleshooting**

### **Ads Not Showing**
1. Check `enabled: true` in config
2. Verify correct slot IDs
3. Check browser console for errors
4. Ensure AdSense script is loaded

### **Policy Warnings**
1. Disable popups: `popups.enabled: false`
2. Reduce ad density
3. Improve content quality
4. Check mobile experience

### **Development Issues**
1. Use test mode: `testMode: true`
2. Check development control panel
3. Verify TypeScript compilation
4. Review browser console

## 📊 **Current Configuration Summary**

| Setting | Value | Status | Reason |
|---------|-------|---------|---------|
| Master Ads | ✅ ENABLED | Active | Standard content ads allowed |
| Popup Ads | ❌ DISABLED | Compliant | Google policy compliance |
| Test Mode | ❌ DISABLED | Production | Using real slot IDs |
| Mobile Optimized | ✅ ENABLED | Active | Better user experience |
| Accessibility | ✅ ENABLED | Active | WCAG compliance |

## 📞 **Support Resources**

- [Google AdSense Help](https://support.google.com/adsense/)
- [AdSense Policy Center](https://support.google.com/adsense/answer/48182)
- [Better Ads Standards](https://www.betterads.org/standards/)
- [ITGYANI Configuration Guide](./ADSENSE_CONFIGURATION.md)

---

**Last Updated**: September 23, 2025  
**Configuration Version**: 2.0 - Policy Compliant  
**Status**: ✅ Google AdSense Policy Compliant