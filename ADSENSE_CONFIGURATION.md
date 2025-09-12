# 🎯 ITGYANI AdSense Configuration Guide

## 📊 **Current Ad Placements Summary**

### ✅ **Currently Active Positions (6 total)**

| Position | Location | Page(s) | Current Slot ID | Status |
|----------|----------|---------|----------------|---------|
| `after-hero` | After hero section | Homepage | `9345363531` ✅ | **ACTIVE** |
| `content-mid` | Mid-content break | Homepage, Services | `CREATE_SLOT_2` ⚠️ | **NEEDS ID** |
| `pre-footer` | Before footer | Homepage | `CREATE_SLOT_3` ⚠️ | **NEEDS ID** |
| `about-mid` | About page middle | About page | `CREATE_SLOT_6` ⚠️ | **NEEDS ID** |
| `contact-post` | After contact form | Contact page | `CREATE_SLOT_7` ⚠️ | **NEEDS ID** |

### 📋 **Phase 2 Positions (Future Use)**

| Position | Purpose | Slot ID | Status |
|----------|---------|---------|--------|
| `services-sidebar` | Desktop browsing | `CREATE_SLOT_4` | Planned |
| `services-between` | Between service cards | `CREATE_SLOT_5` | Planned |
| `mobile-banner` | Mobile optimization | `CREATE_SLOT_8` | Planned |
| `mobile-square` | Mobile square format | `CREATE_SLOT_9` | Planned |

---

## 🚀 **Step-by-Step Configuration Instructions**

### **Step 1: Access Google AdSense Dashboard**

1. Go to **https://adsense.google.com/**
2. Sign in with your Google account
3. Navigate to **"Ads"** in the left sidebar
4. Click **"By ad unit"**

### **Step 2: Create Required Ad Units**

You need to create **4 new ad units** to complete the current implementation:

#### **Ad Unit 1: Content Mid-Break**
```
Name: ITGYANI-Content-Mid
Type: Display ads
Size: Responsive (recommended) or 300x250
Use for: content-mid position
```

#### **Ad Unit 2: Pre-Footer Banner**
```
Name: ITGYANI-Pre-Footer
Type: Display ads  
Size: 728x90 (Leaderboard) or Responsive
Use for: pre-footer position
```

#### **Ad Unit 3: About Page Mid**
```
Name: ITGYANI-About-Mid
Type: Display ads
Size: 300x250 (Medium Rectangle) or Responsive
Use for: about-mid position
```

#### **Ad Unit 4: Contact Post-Form**
```
Name: ITGYANI-Contact-Post
Type: Display ads
Size: 300x250 (Medium Rectangle) or Responsive
Use for: contact-post position
```

### **Step 3: Copy Ad Unit Slot IDs**

For each created ad unit:

1. Click on the ad unit name
2. Find the **data-ad-slot** value in the ad code
3. Copy the numeric ID (e.g., `"1234567890"`)

**Example Ad Code:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4997972039382567"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4997972039382567"
     data-ad-slot="1234567890"    ← COPY THIS NUMBER
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

### **Step 4: Update Configuration File**

Update `/home/itgyani.com/itgyani/src/config/adsense.ts`:

```typescript
adSlots: {
  // === PHASE 1: CORE STRATEGIC POSITIONS ===
  "after-hero": "9345363531",        // ✅ Already working
  "content-mid": "YOUR_NEW_SLOT_1",  // 🔄 Replace with slot from Step 3
  "pre-footer": "YOUR_NEW_SLOT_2",   // 🔄 Replace with slot from Step 3
  
  // === PHASE 2: PAGE-SPECIFIC POSITIONS ===
  "about-mid": "YOUR_NEW_SLOT_3",    // 🔄 Replace with slot from Step 3
  "contact-post": "YOUR_NEW_SLOT_4", // 🔄 Replace with slot from Step 3
  
  // ... rest remains the same
}
```

### **Step 5: Deploy Changes**

After updating the slot IDs:

```bash
cd /home/itgyani.com/itgyani
npm run build
cd /home/itgyani.com
./deploy.sh
```

---

## 📈 **Ad Format Recommendations**

### **By Position Type:**

| Position | Recommended Format | Size | Best For |
|----------|-------------------|------|----------|
| `after-hero` | Leaderboard | 728x90 | Desktop engagement |
| `content-mid` | Medium Rectangle | 300x250 | Universal performance |
| `pre-footer` | Leaderboard | 728x90 | Exit intent |
| `about-mid` | Medium Rectangle | 300x250 | Professional pages |
| `contact-post` | Square | 250x250 | Post-action |

### **Mobile Considerations:**

- Use **Responsive** format for all positions
- Enable **"full-width-responsive"** in AdSense settings
- Consider mobile-specific units for Phase 3

---

## 🎯 **Current Implementation Status**

### ✅ **Working (1/5)**
- `after-hero`: **9345363531** ← Your current working slot

### ⚠️ **Needs Configuration (4/5)**
- `content-mid`: Replace `CREATE_SLOT_2`
- `pre-footer`: Replace `CREATE_SLOT_3`  
- `about-mid`: Replace `CREATE_SLOT_6`
- `contact-post`: Replace `CREATE_SLOT_7`

---

## 🚀 **Quick Action Checklist**

- [ ] **Create 4 new ad units** in Google AdSense
- [ ] **Copy slot IDs** from each ad unit
- [ ] **Update adsense.ts** with real slot IDs
- [ ] **Build and deploy** the application
- [ ] **Test ads** are showing on all pages
- [ ] **Monitor performance** for 1 week
- [ ] **Plan Phase 2** expansion based on results

---

## 📱 **Ad Unit Creation Quick Reference**

When creating ad units in AdSense, use these settings:

### **Recommended Settings:**
```
Ad type: Display ads
Ad size: Responsive (Auto-sizing)
Ad format: Auto
Advanced settings:
  ✅ Allow ads to be shown in inappropriate inventory
  ✅ Show ads on parked domains
  ✅ Show ads in ads.txt
```

### **Advanced Options:**
```
Backup ads: None (let Google handle)
Frequency capping: Default
Category blocking: Default (can customize later)
Ad review center: Default approval
```

---

## 🔧 **Troubleshooting**

### **If Ads Don't Show:**
1. **Check slot ID**: Ensure correct ID from AdSense dashboard
2. **Verify Publisher ID**: Should be `ca-pub-4997972039382567`
3. **Clear cache**: Hard refresh the page (Ctrl+F5)
4. **Wait time**: New ad units can take 24-48 hours to activate
5. **Check console**: Look for JavaScript errors in browser console

### **Performance Optimization:**
1. **Start with 2-3 positions** (avoid overwhelming users)
2. **Monitor Core Web Vitals** (page speed impact)
3. **A/B test formats** (rectangle vs banner)
4. **Track user engagement** (bounce rate, session duration)
5. **Gradual expansion** (add positions based on performance)

---

**🎯 Priority: Complete the 4 pending slot ID configurations to activate all current ad positions!**
