/**
 * Image Generation Script for ITGYANI Website
 * 
 * Generates images for:
 * - Blog post thumbnails
 * - Read Me buttons
 * - Page headers
 * - Social media cards
 * - Case study images
 */

import fs from 'fs';
import path from 'path';

// Image generation configuration
const IMAGE_CONFIG = {
  // Blog image dimensions
  blog: {
    thumbnail: { width: 400, height: 250 },
    header: { width: 800, height: 400 },
    featured: { width: 1200, height: 630 }
  },
  
  // Button dimensions
  buttons: {
    readMe: { width: 200, height: 60 },
    cta: { width: 250, height: 80 },
    social: { width: 40, height: 40 }
  },
  
  // Page header dimensions
  pages: {
    hero: { width: 1920, height: 1080 },
    section: { width: 1200, height: 300 },
    card: { width: 400, height: 300 }
  }
};

// SVG template for Read Me buttons
const createReadMeButton = (text = "Read More", variant = "primary") => {
  const variants = {
    primary: {
      bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      text: "#ffffff",
      border: "none"
    },
    secondary: {
      bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      text: "#1e293b",
      border: "1px solid #cbd5e1"
    },
    outline: {
      bg: "transparent",
      text: "#6366f1",
      border: "2px solid #6366f1"
    }
  };
  
  const style = variants[variant] || variants.primary;
  
  return `
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <rect 
    width="200" 
    height="60" 
    rx="12" 
    fill="${style.bg}" 
    stroke="${style.border.includes('solid') ? style.border.split(' ')[2] : 'none'}"
    stroke-width="${style.border.includes('solid') ? style.border.split(' ')[0] : '0'}"
    filter="url(#shadow)"
  />
  
  <text 
    x="100" 
    y="35" 
    text-anchor="middle" 
    dominant-baseline="middle"
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="16" 
    font-weight="600"
    fill="${style.text}"
  >
    ${text}
  </text>
  
  <path 
    d="M160 25 L170 30 L160 35" 
    stroke="${style.text}" 
    stroke-width="2" 
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;
};

// SVG template for blog thumbnails
const createBlogThumbnail = (title, category, gradient = "tech") => {
  const gradients = {
    tech: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    business: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    ai: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    automation: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    case: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  };
  
  const bg = gradients[gradient] || gradients.tech;
  
  return `
<svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="250" fill="url(#bg)"/>
  
  <!-- Overlay pattern -->
  <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
    <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/>
  </pattern>
  <rect width="400" height="250" fill="url(#pattern)"/>
  
  <!-- Category tag -->
  <rect x="20" y="20" width="80" height="24" rx="12" fill="rgba(255,255,255,0.2)"/>
  <text x="60" y="34" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="500" fill="white">
    ${category.toUpperCase()}
  </text>
  
  <!-- Title -->
  <foreignObject x="20" y="180" width="360" height="50">
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: white;
      line-height: 1.2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">
      ${title}
    </div>
  </foreignObject>
  
  <!-- Icon -->
  <circle cx="350" cy="60" r="20" fill="rgba(255,255,255,0.2)"/>
  <path d="M340 55 L350 60 L360 55 M350 50 L350 70" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`;
};

// SVG template for page headers
const createPageHeader = (title, subtitle = "") => {
  return `
<svg width="1200" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="headerBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#334155;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#475569;stop-opacity:1" />
    </linearGradient>
    
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="300" fill="url(#headerBg)"/>
  <rect width="1200" height="300" fill="url(#grid)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="80" r="30" fill="rgba(99,102,241,0.1)"/>
  <circle cx="1100" cy="220" r="40" fill="rgba(139,92,246,0.1)"/>
  
  <!-- Title -->
  <text x="600" y="140" text-anchor="middle" font-family="system-ui" font-size="48" font-weight="700" fill="white">
    ${title}
  </text>
  
  <!-- Subtitle -->
  ${subtitle ? `
  <text x="600" y="180" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="400" fill="rgba(255,255,255,0.8)">
    ${subtitle}
  </text>` : ''}
  
  <!-- Bottom accent -->
  <rect x="0" y="290" width="1200" height="10" fill="linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)"/>
</svg>`;
};

// Generate all images
const generateImages = () => {
  const outputDir = './public/images/generated';
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🎨 Generating images for ITGYANI website...\n');
  
  // 1. Read Me Buttons
  console.log('📱 Creating Read Me buttons...');
  const buttonVariants = [
    { name: 'read-more-primary', text: 'Read More', variant: 'primary' },
    { name: 'read-more-secondary', text: 'Read More', variant: 'secondary' },
    { name: 'read-more-outline', text: 'Read More', variant: 'outline' },
    { name: 'learn-more-primary', text: 'Learn More', variant: 'primary' },
    { name: 'view-details-primary', text: 'View Details', variant: 'primary' },
    { name: 'get-started-primary', text: 'Get Started', variant: 'primary' },
    { name: 'explore-now-primary', text: 'Explore Now', variant: 'primary' }
  ];
  
  buttonVariants.forEach(button => {
    const svg = createReadMeButton(button.text, button.variant);
    fs.writeFileSync(`${outputDir}/${button.name}.svg`, svg);
    console.log(`  ✓ ${button.name}.svg`);
  });
  
  // 2. Blog Thumbnails
  console.log('\n📝 Creating blog thumbnails...');
  const blogThumbnails = [
    { name: 'ai-automation-guide', title: 'Complete Guide to AI Automation', category: 'AI', gradient: 'ai' },
    { name: 'business-transformation', title: 'Digital Business Transformation', category: 'Business', gradient: 'business' },
    { name: 'workflow-optimization', title: 'Advanced Workflow Optimization', category: 'Automation', gradient: 'automation' },
    { name: 'tech-innovation', title: 'Latest Technology Innovations', category: 'Tech', gradient: 'tech' },
    { name: 'case-study-success', title: 'Success Story: 500% Growth', category: 'Case Study', gradient: 'case' },
    { name: 'ai-implementation', title: 'AI Implementation Best Practices', category: 'AI', gradient: 'ai' },
    { name: 'automation-trends', title: '2025 Automation Trends', category: 'Automation', gradient: 'automation' }
  ];
  
  blogThumbnails.forEach(blog => {
    const svg = createBlogThumbnail(blog.title, blog.category, blog.gradient);
    fs.writeFileSync(`${outputDir}/${blog.name}.svg`, svg);
    console.log(`  ✓ ${blog.name}.svg`);
  });
  
  // 3. Page Headers
  console.log('\n🖼️  Creating page headers...');
  const pageHeaders = [
    { name: 'services-header', title: 'Our Services', subtitle: 'Comprehensive AI Automation Solutions' },
    { name: 'case-studies-header', title: 'Case Studies', subtitle: 'Real Results from Real Companies' },
    { name: 'blog-header', title: 'Blog & Insights', subtitle: 'Latest Trends in AI and Automation' },
    { name: 'about-header', title: 'About ITGYANI', subtitle: 'Empowering Businesses with AI' },
    { name: 'contact-header', title: 'Contact Us', subtitle: 'Let\'s Transform Your Business Together' },
    { name: 'resources-header', title: 'Resources', subtitle: 'Tools and Guides for Success' },
    { name: 'academy-header', title: 'ITGYANI Academy', subtitle: 'Learn AI Automation' }
  ];
  
  pageHeaders.forEach(header => {
    const svg = createPageHeader(header.title, header.subtitle);
    fs.writeFileSync(`${outputDir}/${header.name}.svg`, svg);
    console.log(`  ✓ ${header.name}.svg`);
  });
  
  // 4. Social Media Cards
  console.log('\n📱 Creating social media cards...');
  const socialCards = [
    'facebook-share',
    'twitter-share', 
    'linkedin-share',
    'github-link'
  ];
  
  socialCards.forEach(card => {
    const svg = createSocialCard(card);
    fs.writeFileSync(`${outputDir}/${card}.svg`, svg);
    console.log(`  ✓ ${card}.svg`);
  });
  
  console.log('\n✅ Image generation complete!');
  console.log(`📁 Images saved to: ${outputDir}`);
  console.log(`📊 Total images generated: ${buttonVariants.length + blogThumbnails.length + pageHeaders.length + socialCards.length}`);
};

// Social media card template
const createSocialCard = (type) => {
  const configs = {
    'facebook-share': { color: '#1877f2', icon: 'f' },
    'twitter-share': { color: '#1da1f2', icon: '𝕏' },
    'linkedin-share': { color: '#0077b5', icon: 'in' },
    'github-link': { color: '#333', icon: '⚡' }
  };
  
  const config = configs[type] || configs['facebook-share'];
  
  return `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="20" fill="${config.color}"/>
  <text x="20" y="25" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="700" fill="white">
    ${config.icon}
  </text>
</svg>`;
};

// Run the generation
generateImages();