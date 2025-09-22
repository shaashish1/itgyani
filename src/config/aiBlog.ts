/**
 * AI Blog Generation Configuration
 * 
 * Integrates OpenRouter API and Hugging Face models for:
 * - Automated blog content creation
 * - AI-generated images for blogs
 * - Scheduled publishing
 * - Multi-model support
 */

export const AI_BLOG_CONFIG = {
  // === MASTER CONTROLS ===
  enabled: true,                    // Master switch for AI blog generation
  debug: true,                     // Enable debug logging
  
  // === OPENROUTER API CONFIGURATION ===
  openRouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: "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",
    
    // Available models for blog generation
    models: {
      primary: "anthropic/claude-3.5-sonnet",     // Main content generation
      secondary: "openai/gpt-4o-mini",            // Backup/alternative
      creative: "google/gemini-pro",              // Creative writing
      technical: "meta-llama/llama-3.1-8b-instruct", // Technical content
      budget: "microsoft/phi-3-mini-128k-instruct"    // Cost-effective option
    },
    
    // Request settings
    temperature: 0.7,                // Creativity level (0-1)
    maxTokens: 4000,                // Maximum response length
    topP: 0.9,                      // Nucleus sampling
    frequencyPenalty: 0.1,          // Reduce repetition
    presencePenalty: 0.1,           // Encourage new topics
  },

  // === HUGGING FACE CONFIGURATION ===
  huggingFace: {
    apiKey: "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", // Bearer token for API access
    
    // Image generation models
    imageModels: {
      primary: "stabilityai/stable-diffusion-xl-base-1.0",
      artistic: "runwayml/stable-diffusion-v1-5",
      realistic: "SG161222/Realistic_Vision_V4.0",
      illustration: "prompthero/openjourney-v4",
    },
    
    // Text-to-image settings
    imageGeneration: {
      width: 1024,
      height: 576,                  // 16:9 aspect ratio for blog headers
      guidanceScale: 7.5,           // How closely to follow prompt
      numInferenceSteps: 50,        // Quality vs speed
      negativePrompt: "blurry, low quality, distorted, watermark, text, signature",
    },
    
    // Free tier limitations
    rateLimits: {
      imagesPerHour: 10,
      imagesPerDay: 50,
      requestDelay: 6000,           // 6 seconds between requests
    }
  },

  // === BLOG GENERATION SETTINGS ===
  blog: {
    // Content specifications
    minWordCount: 800,
    maxWordCount: 2500,
    targetWordCount: 1500,
    
    // Structure requirements
    sections: {
      introduction: true,
      mainContent: true,
      subheadings: 3,               // Minimum subheadings
      conclusion: true,
      callToAction: true,
    },
    
    // SEO optimization
    seo: {
      metaDescription: true,
      keywords: true,
      tags: true,
      slugGeneration: true,
      altTextForImages: true,
    },
    
    // Content style
    tone: "professional",           // professional, casual, technical, creative
    audience: "business",           // business, technical, general, academic
    includeStatistics: true,
    includeCitations: false,
    includeExamples: true,
  },

  // === SCHEDULING CONFIGURATION ===
  scheduling: {
    enabled: true,
    
    // Frequency options
    frequencies: {
      daily: { interval: 'days', count: 1 },
      weekly: { interval: 'weeks', count: 1 },
      biweekly: { interval: 'weeks', count: 2 },
      monthly: { interval: 'months', count: 1 },
      custom: { interval: 'hours', count: 24 }, // User-defined
    },
    
    // Publishing settings
    publishing: {
      autoPublish: false,           // Require manual approval
      draftMode: true,             // Save as drafts first
      reviewRequired: true,        // Human review before publishing
      timeZone: 'UTC',            // Publishing timezone
      preferredTime: '09:00',     // Preferred publishing time
    },
    
    // Queue management
    queue: {
      maxScheduled: 30,           // Maximum scheduled posts
      batchSize: 5,               // Process 5 at a time
      retryAttempts: 3,           // Retry failed generations
      retryDelay: 300000,         // 5 minutes between retries
    }
  },

  // === CONTENT CATEGORIES ===
  categories: {
    technology: {
      keywords: ["AI", "machine learning", "automation", "digital transformation"],
      tone: "technical",
      audience: "business",
      imageStyle: "modern, tech, professional"
    },
    business: {
      keywords: ["strategy", "growth", "productivity", "innovation"],
      tone: "professional",
      audience: "business",
      imageStyle: "corporate, professional, business"
    },
    industry: {
      keywords: ["manufacturing", "healthcare", "finance", "retail"],
      tone: "professional",
      audience: "business",
      imageStyle: "industry-specific, professional"
    },
    automation: {
      keywords: ["process automation", "workflow", "efficiency", "RPA"],
      tone: "technical",
      audience: "technical",
      imageStyle: "automation, workflows, digital"
    },
    aiStudio: {
      keywords: ["AI solutions", "custom AI", "AI development", "ML models"],
      tone: "technical",
      audience: "technical",
      imageStyle: "AI, futuristic, technology"
    }
  },

  // === QUALITY CONTROLS ===
  quality: {
    // Content validation
    minReadabilityScore: 60,      // Flesch reading ease
    maxSentenceLength: 25,        // Words per sentence
    maxParagraphLength: 150,      // Words per paragraph
    
    // Plagiarism prevention
    uniquenessCheck: true,
    similarityThreshold: 0.8,     // Maximum similarity to existing content
    
    // Fact checking
    factChecking: false,          // Requires external service
    sourceVerification: false,    // Requires external service
    
    // Content moderation
    profanityFilter: true,
    sensitiveContentFilter: true,
    brandSafetyCheck: true,
  },

  // === IMAGE GENERATION PROMPTS ===
  imagePrompts: {
    templates: {
      technology: "Professional technology concept illustration, {topic}, modern design, clean aesthetic, blue and white color scheme, corporate style",
      business: "Business professional illustration, {topic}, modern office environment, professional people, corporate colors",
      industry: "Industrial illustration, {topic}, professional setting, modern equipment, clean professional style",
      automation: "Process automation visualization, {topic}, flowcharts, digital interfaces, modern tech aesthetic",
      generic: "Professional blog header illustration, {topic}, modern design, clean composition, business-friendly colors"
    },
    
    styles: {
      header: "16:9 aspect ratio, blog header, professional, clean design",
      inline: "square format, supporting illustration, simple, clear",
      featured: "high quality, detailed, professional photography style"
    }
  },

  // === API RETRY AND ERROR HANDLING ===
  errorHandling: {
    maxRetries: 3,
    retryDelay: 5000,             // 5 seconds
    timeoutDuration: 30000,       // 30 seconds
    fallbackModel: "microsoft/phi-3-mini-128k-instruct", // Cheap fallback
    
    // Error types and responses
    errorResponses: {
      rateLimited: "delay",       // Wait and retry
      unauthorized: "skip",       // Skip this generation
      serverError: "retry",       // Retry with exponential backoff
      contentFiltered: "regenerate", // Try with different prompt
    }
  },

  // === STORAGE CONFIGURATION ===
  storage: {
    // Blog storage
    blogDirectory: "/home/itgyani.com/itgyani/src/content/blogs",
    imageDirectory: "/home/itgyani.com/itgyani/public/images/blogs",
    draftDirectory: "/home/itgyani.com/itgyani/src/content/drafts",
    
    // File naming
    fileNaming: {
      pattern: "{date}-{slug}",   // YYYY-MM-DD-blog-title
      extension: ".md",           // Markdown format
      imageFormat: ".webp",       // Optimized image format
    },
    
    // Backup settings
    backup: {
      enabled: true,
      directory: "/home/itgyani.com/backup/ai-blogs",
      frequency: "daily",
      retention: 30,              // Days to keep backups
    }
  }
};

// === HELPER FUNCTIONS ===

/**
 * Get current configuration with environment overrides
 */
export const getAIBlogConfig = () => {
  const config = { ...AI_BLOG_CONFIG };
  
  // Production overrides
  if (process.env.NODE_ENV === 'production') {
    config.debug = false;
    config.scheduling.publishing.autoPublish = false; // Always require manual approval in production
  }
  
  // Environment variable overrides
  if (process.env.OPENROUTER_API_KEY) {
    config.openRouter.apiKey = process.env.OPENROUTER_API_KEY;
  }
  
  return config;
};

/**
 * Get model configuration for specific use case
 */
export const getModelConfig = (useCase: 'content' | 'creative' | 'technical' | 'budget') => {
  const config = getAIBlogConfig();
  
  const modelMap = {
    content: config.openRouter.models.primary,
    creative: config.openRouter.models.creative,
    technical: config.openRouter.models.technical,
    budget: config.openRouter.models.budget,
  };
  
  return {
    model: modelMap[useCase],
    temperature: useCase === 'creative' ? 0.8 : 0.7,
    maxTokens: config.openRouter.maxTokens,
    topP: config.openRouter.topP,
  };
};

/**
 * Generate image prompt for specific category and topic
 */
export const generateImagePrompt = (category: string, topic: string, style: 'header' | 'inline' | 'featured' = 'header') => {
  const config = getAIBlogConfig();
  const categoryConfig = config.categories[category as keyof typeof config.categories];
  
  if (!categoryConfig) {
    // Use generic template
    const template = config.imagePrompts.templates.generic;
    return template.replace('{topic}', topic) + ', ' + config.imagePrompts.styles[style];
  }
  
  const template = config.imagePrompts.templates[category as keyof typeof config.imagePrompts.templates] || 
                  config.imagePrompts.templates.generic;
  
  return template.replace('{topic}', topic) + ', ' + 
         categoryConfig.imageStyle + ', ' + 
         config.imagePrompts.styles[style];
};

export default AI_BLOG_CONFIG;