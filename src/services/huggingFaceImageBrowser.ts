/**
 * Browser-Compatible Hugging Face Image Generation Service
 * 
 * Uses free Hugging Face models for AI image generation
 */

import { AI_BLOG_CONFIG } from '@/config/aiBlog';

export interface ImageGenerationRequest {
  prompt: string;
  category: string;
  style?: 'realistic' | 'artistic' | 'technical' | 'minimal';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16';
}

export interface ImageGenerationResult {
  success: boolean;
  data?: {
    url: string;
    prompt: string;
    model: string;
    style: string;
    timestamp: Date;
  };
  error?: string;
}

class BrowserHuggingFaceImageService {
  private config = AI_BLOG_CONFIG;
  private rateLimitTracker = {
    requestCount: 0,
    lastReset: new Date(),
    dailyLimit: 100
  };

  /**
   * Generate image prompt based on category and context
   */
  private generateImagePrompt(category: string, topic: string, imageType: string): string {
    const basePrompts = {
      technology: 'modern technology, digital innovation, clean design',
      business: 'professional business environment, corporate setting',
      automation: 'automated systems, robotic processes, efficiency',
      industry: 'industrial processes, manufacturing, innovation',
      aiStudio: 'artificial intelligence, neural networks, futuristic'
    };

    const categoryPrompt = basePrompts[category as keyof typeof basePrompts] || 'professional, modern';
    
    const typeModifiers = {
      header: 'banner style, wide aspect ratio, minimalist',
      inline: 'square format, detailed illustration',
      featured: 'high quality, detailed, professional photography style'
    };

    const typeModifier = typeModifiers[imageType as keyof typeof typeModifiers] || 'professional';

    return `${topic}, ${categoryPrompt}, ${typeModifier}, high quality, 4k resolution`;
  }

  /**
   * Check rate limits
   */
  private checkRateLimit(): boolean {
    const now = new Date();
    const timeSinceReset = now.getTime() - this.rateLimitTracker.lastReset.getTime();
    const hoursSinceReset = timeSinceReset / (1000 * 60 * 60);

    // Reset counter every 24 hours
    if (hoursSinceReset >= 24) {
      this.rateLimitTracker.requestCount = 0;
      this.rateLimitTracker.lastReset = now;
    }

    return this.rateLimitTracker.requestCount < this.rateLimitTracker.dailyLimit;
  }

  /**
   * Generate a single image
   */
  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResult> {
    try {
      // Check rate limits
      if (!this.checkRateLimit()) {
        return {
          success: false,
          error: 'Daily rate limit exceeded for Hugging Face API'
        };
      }

      // Enhance prompt
      const enhancedPrompt = this.generateImagePrompt(
        request.category,
        request.prompt,
        request.style || 'realistic'
      );

      // Use first available model
      const model = this.config.huggingFace.imageModels.primary;
      const apiUrl = `https://api-inference.huggingface.co/models/${model}`;

      console.log(`🎨 Generating image with model: ${model}`);
      console.log(`📝 Prompt: ${enhancedPrompt}`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.huggingFace.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            negative_prompt: 'blurry, low quality, distorted, text, watermark',
            num_inference_steps: 20,
            guidance_scale: 7.5,
            width: 512,
            height: 512
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
      }

      // Convert response to blob and create object URL
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      // Update rate limit tracker
      this.rateLimitTracker.requestCount++;

      console.log('✅ Image generated successfully');

      return {
        success: true,
        data: {
          url: imageUrl,
          prompt: enhancedPrompt,
          model,
          style: request.style || 'realistic',
          timestamp: new Date()
        }
      };

    } catch (error) {
      console.error('❌ Image generation failed:', error);
      
      return {
        success: false,
        error: `Image generation failed: ${error.message}`
      };
    }
  }

  /**
   * Generate multiple images for a blog post
   */
  async generateBlogImages(
    topic: string,
    category: string,
    imageCount: number = 2
  ): Promise<ImageGenerationResult[]> {
    const results: ImageGenerationResult[] = [];
    
    try {
      console.log(`🎨 Generating ${imageCount} images for blog: ${topic}`);

      // Generate header image
      const headerRequest: ImageGenerationRequest = {
        prompt: `${topic} header image`,
        category,
        style: 'realistic',
        aspectRatio: '16:9'
      };

      const headerResult = await this.generateImage(headerRequest);
      results.push(headerResult);

      // Add delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate additional inline images if requested
      for (let i = 1; i < imageCount; i++) {
        const inlineRequest: ImageGenerationRequest = {
          prompt: `${topic} illustration ${i}`,
          category,
          style: 'artistic',
          aspectRatio: '4:3'
        };

        const inlineResult = await this.generateImage(inlineRequest);
        results.push(inlineResult);

        // Add delay between requests
        if (i < imageCount - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      const successful = results.filter(r => r.success).length;
      console.log(`✅ Generated ${successful}/${imageCount} images successfully`);

      return results;

    } catch (error) {
      console.error('❌ Blog image generation failed:', error);
      
      // Return error result for any remaining images
      while (results.length < imageCount) {
        results.push({
          success: false,
          error: `Batch generation failed: ${error.message}`
        });
      }

      return results;
    }
  }

  /**
   * Generate featured image for blog post
   */
  async generateFeaturedImage(
    title: string,
    category: string
  ): Promise<ImageGenerationResult> {
    const request: ImageGenerationRequest = {
      prompt: `${title} featured image`,
      category,
      style: 'realistic',
      aspectRatio: '16:9'
    };

    return this.generateImage(request);
  }

  /**
   * Health check for Hugging Face service
   */
  async healthCheck(): Promise<{ success: boolean; error?: string; info?: any }> {
    try {
      // Check if API key is configured
      if (!this.config.huggingFace.apiKey) {
        return {
          success: false,
          error: 'Hugging Face API key not configured'
        };
      }

      // Check rate limits
      const withinLimits = this.checkRateLimit();
      
      // Simple API test with a basic request
      const testModel = this.config.huggingFace.imageModels.primary;
      const apiUrl = `https://api-inference.huggingface.co/models/${testModel}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.huggingFace.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: 'test image',
          parameters: { num_inference_steps: 1 }
        })
      });

      // Even if the model is loading, a 503 with the right format indicates API connectivity
      const isHealthy = response.status === 200 || response.status === 503;

      return {
        success: isHealthy,
        error: isHealthy ? undefined : `API connectivity test failed: ${response.status}`,
        info: {
          modelStatus: response.status === 200 ? 'ready' : 'loading',
          rateLimitOk: withinLimits,
          requestsToday: this.rateLimitTracker.requestCount,
          dailyLimit: this.rateLimitTracker.dailyLimit
        }
      };

    } catch (error) {
      return {
        success: false,
        error: `Health check failed: ${error.message}`
      };
    }
  }

  /**
   * Get current usage statistics
   */
  getUsageStats(): {
    requestsToday: number;
    dailyLimit: number;
    remainingRequests: number;
    resetTime: Date;
  } {
    return {
      requestsToday: this.rateLimitTracker.requestCount,
      dailyLimit: this.rateLimitTracker.dailyLimit,
      remainingRequests: Math.max(0, this.rateLimitTracker.dailyLimit - this.rateLimitTracker.requestCount),
      resetTime: new Date(this.rateLimitTracker.lastReset.getTime() + 24 * 60 * 60 * 1000)
    };
  }

  /**
   * Reset rate limit counter (for testing)
   */
  resetRateLimit(): void {
    this.rateLimitTracker.requestCount = 0;
    this.rateLimitTracker.lastReset = new Date();
  }
}

// Export singleton instance
export const huggingFaceImageService = new BrowserHuggingFaceImageService();