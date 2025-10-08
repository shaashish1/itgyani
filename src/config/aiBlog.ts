/**
 * AI Blog Generation Configuration
 * 
 * Integrates OpenAI for:
 * - Automated blog content creation (GPT-5 Mini)
 * - AI-generated images for blogs (gpt-image-1)
 * - Scheduled publishing
 * - High-quality content generation
 */

export const AI_BLOG_CONFIG = {
  // === MASTER CONTROLS ===
  enabled: true,                    // Master switch for AI blog generation
  debug: true,                     // Enable debug logging
  
  // === OPENAI API CONFIGURATION ===
  openAI: {
    baseUrl: "https://api.openai.com/v1",
    // API key stored securely in Supabase secrets as OPENAI_API_KEY
    
    // Available models for blog generation
    models: {
      content: "gpt-5-mini-2025-08-07",          // Main content generation (GPT-5 Mini)
      contentPro: "gpt-5-2025-08-07",            // High-quality content (GPT-5)
      contentNano: "gpt-5-nano-2025-08-07",      // Fast, cost-effective (GPT-5 Nano)
      image: "gpt-image-1",                      // Image generation
    },
    
    // Content generation settings (GPT-5 models)
    contentGeneration: {
      maxCompletionTokens: 3000,    // Maximum response length (GPT-5 uses max_completion_tokens)
      // Note: temperature not supported in GPT-5 models (defaults to 1.0)
      useStructuredOutput: true,     // Use function calling for JSON
    },
    
    // Image generation settings
    imageGeneration: {
      size: "1792x1024",            // Landscape format for blog headers
      quality: "high",              // High resolution
      outputFormat: "png",          // PNG format
      background: "opaque",         // Solid background
      outputCompression: 100,       // No compression (0-100%)
    },
    
    // Cost estimates (approximate)
    pricing: {
      gpt5Mini: {
        input: 0.10,                // $ per 1M tokens
        output: 0.40,               // $ per 1M tokens
      },
      gptImage: {
        perImage: 0.040,            // $ per image (high quality, 1792x1024)
      },
      estimatedCostPerBlog: 0.20,   // ~$0.14-0.28 per blog (content + image)
    }
  },

  // === LEGACY PROVIDERS (Deprecated) ===
  // OpenRouter and Hugging Face configurations kept for backward compatibility
  // New implementations should use OpenAI
  openRouter: {
    deprecated: true,
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: "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", // Legacy
    models: {
      primary: "anthropic/claude-3.5-sonnet",
      secondary: "openai/gpt-4o-mini",
    },
    frequencyPenalty: 0.1,
    presencePenalty: 0.1,
  },

  huggingFace: {
    deprecated: true,
    apiKey: "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", // Legacy
    imageModels: {
      primary: "stabilityai/stable-diffusion-xl-base-1.0",
    },
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
    "AI/ML": {
      keywords: ["AI", "machine learning", "automation", "digital transformation"],
      tone: "technical",
      audience: "business",
      imageStyle: "Modern tech illustration with neural network patterns, blue and purple gradients, futuristic AI elements, professional and clean"
    },
    Automation: {
      keywords: ["process automation", "workflow", "efficiency", "RPA"],
      tone: "technical",
      audience: "technical",
      imageStyle: "Digital workflow illustration showing connected systems, process flow diagrams, efficiency icons, corporate blue theme"
    },
    "Quantum Computing": {
      keywords: ["quantum", "computing", "quantum algorithms", "quantum supremacy"],
      tone: "technical",
      audience: "technical",
      imageStyle: "Scientific visualization of quantum particles, abstract quantum circuits, blue and gold color scheme, futuristic lab aesthetic"
    },
    "Edge AI": {
      keywords: ["edge computing", "distributed AI", "IoT", "real-time processing"],
      tone: "technical",
      audience: "business",
      imageStyle: "Distributed systems illustration, edge devices network, real-time processing visual, tech-forward design"
    },
    "Future Tech": {
      keywords: ["innovation", "emerging tech", "future", "trends"],
      tone: "professional",
      audience: "business",
      imageStyle: "Innovation-focused illustration, cutting-edge technology, forward-thinking design, vibrant colors, inspiring composition"
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

  // === IMAGE GENERATION PROMPTS (OpenAI) ===
  imagePrompts: {
    templates: {
      "AI/ML": "Professional blog header image about {topic}. Modern tech illustration with neural network patterns, blue and purple gradients, futuristic AI elements, professional and clean, 16:9 aspect ratio. Ultra high resolution, magazine quality.",
      "Automation": "Professional blog header image about {topic}. Digital workflow illustration showing connected systems, process flow diagrams, efficiency icons, corporate blue theme, 16:9 aspect ratio. Ultra high resolution, magazine quality.",
      "Quantum Computing": "Professional blog header image about {topic}. Scientific visualization of quantum particles, abstract quantum circuits, blue and gold color scheme, futuristic lab aesthetic, 16:9 aspect ratio. Ultra high resolution, magazine quality.",
      "Edge AI": "Professional blog header image about {topic}. Distributed systems illustration, edge devices network, real-time processing visual, tech-forward design, 16:9 aspect ratio. Ultra high resolution, magazine quality.",
      "Future Tech": "Professional blog header image about {topic}. Innovation-focused illustration, cutting-edge technology, forward-thinking design, vibrant colors, inspiring composition, 16:9 aspect ratio. Ultra high resolution, magazine quality.",
      generic: "Professional blog header illustration about {topic}, modern design, clean composition, business-friendly colors, 16:9 aspect ratio. Ultra high resolution, magazine quality."
    },
    
    styles: {
      header: "16:9 aspect ratio (1792x1024), blog header, professional, high-quality",
      inline: "square format (1024x1024), supporting illustration, simple, clear",
      featured: "ultra high quality (1792x1024), detailed, professional magazine style"
    }
  },

  // === API RETRY AND ERROR HANDLING (OpenAI) ===
  errorHandling: {
    maxRetries: 3,
    retryDelay: 2000,             // 2 seconds initial delay
    exponentialBackoff: true,     // Multiply delay by attempt number
    timeoutDuration: 60000,       // 60 seconds for content generation
    imageTimeout: 90000,          // 90 seconds for image generation
    
    // OpenAI-specific error handling
    errorResponses: {
      rateLimited: "delay",       // 429: Wait and retry with exponential backoff
      unauthorized: "skip",       // 401: Invalid API key, skip
      paymentRequired: "skip",    // 402: Payment/credits required, skip
      serverError: "retry",       // 5xx: Retry with exponential backoff
      contentFiltered: "skip",    // Content moderation filter triggered
      invalidRequest: "skip",     // 400: Malformed request, skip
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
  
  // Always use safe defaults for browser environment
  config.debug = false;
  config.scheduling.publishing.autoPublish = false; // Always require manual approval
  
  return config;
};

/**
 * Get OpenAI model configuration for specific use case
 */
export const getModelConfig = (useCase: 'content' | 'high-quality' | 'fast' | 'image' | 'creative' | 'technical' | 'budget') => {
  const config = getAIBlogConfig();
  
  const modelMap = {
    content: config.openAI.models.content,         // GPT-5 Mini (default)
    'high-quality': config.openAI.models.contentPro, // GPT-5 Pro
    fast: config.openAI.models.contentNano,        // GPT-5 Nano
    image: config.openAI.models.image,             // gpt-image-1
    // Legacy mappings for backward compatibility
    creative: config.openAI.models.content,        // Use GPT-5 Mini for creative
    technical: config.openAI.models.content,       // Use GPT-5 Mini for technical
    budget: config.openAI.models.contentNano,      // Use GPT-5 Nano for budget
  };
  
  return {
    model: modelMap[useCase],
    maxCompletionTokens: config.openAI.contentGeneration.maxCompletionTokens,
    useStructuredOutput: config.openAI.contentGeneration.useStructuredOutput,
    // Note: temperature not included (not supported in GPT-5 models)
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