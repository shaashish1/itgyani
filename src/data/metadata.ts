// Metadata configuration for ITGyani blog system
// This file contains site-wide configuration and metadata

export const metadata = {
  // Site Information
  siteName: "ITGyani",
  siteDescription: "Your ultimate guide to cryptocurrency, blockchain, and digital finance",
  siteUrl: "https://itgyani.com",
  
  // Blog Configuration
  totalBlogs: 32,
  blogsPerPage: 12,
  featuredBlogsCount: 5,
  
  // Categories
  categories: [
    "Cryptocurrency",
    "DeFi", 
    "NFT",
    "Technology",
    "Finance",
    "Security",
    "Trading",
    "Investment",
    "Blockchain",
    "Web3"
  ],
  
  // Popular Tags
  popularTags: [
    "bitcoin",
    "ethereum",
    "defi",
    "nft",
    "trading",
    "blockchain",
    "investment",
    "security",
    "analysis",
    "guide"
  ],
  
  // Social Media
  social: {
    twitter: "https://twitter.com/itgyani",
    linkedin: "https://linkedin.com/company/itgyani",
    telegram: "https://t.me/itgyani",
    discord: "https://discord.gg/itgyani"
  },
  
  // Admin Configuration
  admin: {
    defaultPageSize: 12,
    maxPageSize: 50,
    enableAnalytics: true,
    enableNotifications: true,
    autoSave: true,
    theme: "light"
  },
  
  // API Configuration
  api: {
    version: "v1",
    baseUrl: "/api",
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Feature Flags
  features: {
    enableComments: true,
    enableLikes: true,
    enableSharing: true,
    enableNewsletter: true,
    enableSearch: true,
    enableDarkMode: true
  },
  
  // SEO Configuration
  seo: {
    defaultTitle: "ITGyani - Cryptocurrency & Blockchain News",
    titleSeparator: " | ",
    defaultDescription: "Stay updated with the latest cryptocurrency news, blockchain technology insights, and digital finance trends.",
    defaultKeywords: "cryptocurrency, bitcoin, ethereum, blockchain, defi, nft, trading, investment",
    defaultImage: "/images/og-default.jpg",
    twitterCard: "summary_large_image"
  },
  
  // Performance Settings
  performance: {
    enableLazyLoading: true,
    imageOptimization: true,
    cacheTimeout: 3600, // 1 hour
    compressionLevel: 6
  },
  
  // Last Updated
  lastUpdated: "2024-01-15T10:00:00Z",
  version: "2.1.0"
};

export default metadata;