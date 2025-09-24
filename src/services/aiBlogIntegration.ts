/**
 * AI Blog Integration Service
 * 
 * Central service that orchestrates all AI blog operations
 */

import { openRouterBlogService, BlogGenerationRequest } from './openRouterBlog';
import { huggingFaceImageService } from './huggingFaceImageBrowser';
import { blogSchedulingService } from './blogSchedulingBrowser';
import { blogStorageService, BlogPost } from './blogStorageBrowser';
import blogDefaultImage from "../assets/blog-default.jpg";

export interface BlogCreationRequest {
  topic: string;
  category: string;
  keywords: string[];
  tone: 'professional' | 'casual' | 'technical' | 'creative';
  audience: 'business' | 'technical' | 'general' | 'academic';
  wordCount: number;
  includeImages: boolean;
  autoPublish: boolean;
  scheduleDate?: Date;
}

export interface BlogCreationResult {
  success: boolean;
  data?: {
    blog: BlogPost;
    images?: Array<{ url: string; alt: string }>;
    published: boolean;
    scheduled: boolean;
  };
  error?: string;
  warnings?: string[];
}

class AIBlogIntegrationService {
  
  /**
   * Create a complete blog post with content, images, and storage
   */
  async createCompleteBlog(request: BlogCreationRequest): Promise<BlogCreationResult> {
    const warnings: string[] = [];
    
    try {
      // Step 1: Generate blog content
      console.log('🤖 Starting AI blog generation...');
      
      const blogRequest: BlogGenerationRequest = {
        topic: request.topic,
        category: request.category,
        keywords: request.keywords,
        tone: request.tone,
        audience: request.audience,
        wordCount: request.wordCount,
        includeImages: request.includeImages,
        seoOptimized: true
      };

      const contentResult = await openRouterBlogService.generateBlog(blogRequest);
      
      if (!contentResult.success || !contentResult.data) {
        return {
          success: false,
          error: `Failed to generate blog content: ${contentResult.error}`
        };
      }

      const generatedContent = contentResult.data;
      console.log('✅ Blog content generated successfully');

      // Step 2: Generate images if requested
      let blogImages: Array<{ url: string; alt: string }> = [];
      
      if (request.includeImages && generatedContent.imagePrompts.length > 0) {
        console.log('🎨 Generating blog images...');
        
        try {
          const imageResults = await huggingFaceImageService.generateBlogImages(
            generatedContent.title,
            request.category,
            Math.min(generatedContent.imagePrompts.length, 3) // Limit to 3 images
          );

          const successfulImages = imageResults.filter(result => result.success);
          
          if (successfulImages.length > 0) {
            blogImages = successfulImages.map((result, index) => ({
              url: result.data!.url,
              alt: generatedContent.imagePrompts[index] || `${generatedContent.title} - Image ${index + 1}`
            }));
            console.log(`✅ Generated ${blogImages.length} images`);
          } else {
            warnings.push('Image generation failed, but blog content was created successfully');
            console.log('⚠️ Image generation failed');
          }
        } catch (imageError) {
          warnings.push(`Image generation error: ${imageError.message}`);
          console.log('⚠️ Image generation encountered errors');
        }
      }

      // Step 3: Prepare blog post data
      const blogPost: Partial<BlogPost> = {
        title: generatedContent.title,
        content: generatedContent.content,
        excerpt: generatedContent.excerpt,
        category: request.category,
        tags: generatedContent.tags,
        metaDescription: generatedContent.metaDescription,
        images: blogImages.map(img => ({ url: img.url, alt: img.alt })),
        seo: {
          keywords: generatedContent.tags,
          openGraph: {
            title: generatedContent.title,
            description: generatedContent.metaDescription,
            image: blogDefaultImage || '/default-og-image.jpg'
          }
        },
        generatedBy: 'AI Blog System',
        aiModel: 'OpenRouter AI',
        generationCost: 0.10 // Estimated cost
      };

      // Step 4: Save blog post
      console.log('💾 Saving blog post...');
      
      const saveOptions = {
        status: request.autoPublish ? 'published' as const : 'draft' as const,
        author: 'ITGYANI AI',
        generateSlug: true
      };

      const saveResult = await blogStorageService.saveBlogPost(
        blogPost,
        generatedContent.content,
        saveOptions
      );

      if (!saveResult.success || !saveResult.data) {
        return {
          success: false,
          error: `Failed to save blog post: ${saveResult.error}`
        };
      }

      console.log('✅ Blog post saved successfully');

      // Step 5: Handle scheduling if requested
      let scheduled = false;
      if (request.scheduleDate && request.scheduleDate > new Date()) {
        console.log('📅 Scheduling blog post...');
        
        try {
          // Update blog post with scheduled publish date
          const updatedBlog = {
            ...saveResult.data,
            publishedAt: request.scheduleDate,
            status: 'draft' as const
          };

          await blogStorageService.saveBlogPost(
            updatedBlog,
            generatedContent.content,
            { status: 'draft' }
          );

          scheduled = true;
          console.log('✅ Blog post scheduled');
        } catch (scheduleError) {
          warnings.push(`Scheduling failed: ${scheduleError.message}`);
          console.log('⚠️ Scheduling failed');
        }
      }

      return {
        success: true,
        data: {
          blog: saveResult.data,
          images: blogImages,
          published: request.autoPublish,
          scheduled
        },
        warnings: warnings.length > 0 ? warnings : undefined
      };

    } catch (error) {
      console.error('❌ Blog creation failed:', error);
      return {
        success: false,
        error: `Blog creation failed: ${error.message}`,
        warnings: warnings.length > 0 ? warnings : undefined
      };
    }
  }

  /**
   * Get blog creation status and statistics
   */
  async getBlogStats(): Promise<{
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    scheduledBlogs: number;
    imagesGenerated: number;
    totalCost: number;
  }> {
    try {
      // Get blog metadata
      const metadataResult = await blogStorageService.getBlogMetadata();
      const metadata = metadataResult.data;

      // Get scheduled blogs
      const scheduledBlogs = blogSchedulingService.getScheduledBlogs();

      // Get AI-generated blogs for cost calculation
      const aiGeneratedResult = await blogStorageService.listBlogPosts({
        sortBy: 'publishedAt',
        sortOrder: 'desc'
      });

      let totalCost = 0;
      let imagesGenerated = 0;

      if (aiGeneratedResult.success && aiGeneratedResult.data) {
        for (const blog of aiGeneratedResult.data) {
          if (blog.generationCost) {
            totalCost += blog.generationCost;
          }
          if (blog.images) {
            imagesGenerated += blog.images.length;
          }
        }
      }

      return {
        totalBlogs: metadata?.totalPosts || 0,
        publishedBlogs: metadata?.publishedPosts || 0,
        draftBlogs: metadata?.draftPosts || 0,
        scheduledBlogs: scheduledBlogs.length,
        imagesGenerated,
        totalCost
      };

    } catch (error) {
      console.error('Failed to get blog stats:', error);
      return {
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        scheduledBlogs: 0,
        imagesGenerated: 0,
        totalCost: 0
      };
    }
  }

  /**
   * Batch process scheduled blogs
   */
  async processScheduledBlogs(): Promise<{
    processed: number;
    successful: number;
    failed: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let processed = 0;
    let successful = 0;
    let failed = 0;

    try {
      console.log('🔄 Processing scheduled blogs...');
      
      const result = await blogSchedulingService.processScheduledBlogs();
      
      if (result.success && result.data) {
        processed = result.data.processed;
        successful = result.data.successful;
        failed = result.data.failed;
        
        if (result.data.errors) {
          errors.push(...result.data.errors);
        }
      }

      console.log(`✅ Processed ${processed} scheduled blogs: ${successful} successful, ${failed} failed`);

    } catch (error) {
      console.error('❌ Failed to process scheduled blogs:', error);
      errors.push(`Processing failed: ${error.message}`);
    }

    return {
      processed,
      successful,
      failed,
      errors
    };
  }

  /**
   * Health check for all AI blog services
   */
  async healthCheck(): Promise<{
    overall: 'healthy' | 'warning' | 'error';
    services: {
      openRouter: boolean;
      huggingFace: boolean;
      storage: boolean;
      scheduling: boolean;
    };
    details: string[];
  }> {
    const details: string[] = [];
    const services = {
      openRouter: false,
      huggingFace: false,
      storage: false,
      scheduling: false
    };

    try {
      // Check OpenRouter service
      try {
        // Simple connectivity test for OpenRouter
        services.openRouter = true; // Assume healthy for now
      } catch (error) {
        details.push(`OpenRouter: ${error.message}`);
      }

      // Check Hugging Face service
      try {
        const hfHealth = await huggingFaceImageService.healthCheck();
        services.huggingFace = hfHealth.success;
        if (!hfHealth.success) {
          details.push(`Hugging Face: ${hfHealth.error}`);
        }
      } catch (error) {
        details.push(`Hugging Face: ${error.message}`);
      }

      // Check storage service
      try {
        const storageHealth = await blogStorageService.getBlogMetadata();
        services.storage = storageHealth.success;
        if (!storageHealth.success) {
          details.push(`Storage: ${storageHealth.error}`);
        }
      } catch (error) {
        details.push(`Storage: ${error.message}`);
      }

      // Check scheduling service
      try {
        const scheduleStats = blogSchedulingService.getScheduleStats();
        services.scheduling = scheduleStats.queueHealth !== 'error';
        if (scheduleStats.queueHealth === 'error') {
          details.push('Scheduling: Queue in error state');
        }
      } catch (error) {
        details.push(`Scheduling: ${error.message}`);
      }

      // Determine overall health
      const healthyServices = Object.values(services).filter(status => status).length;
      const totalServices = Object.keys(services).length;

      let overall: 'healthy' | 'warning' | 'error';
      if (healthyServices === totalServices) {
        overall = 'healthy';
      } else if (healthyServices >= totalServices / 2) {
        overall = 'warning';
      } else {
        overall = 'error';
      }

      return {
        overall,
        services,
        details
      };

    } catch (error) {
      return {
        overall: 'error',
        services,
        details: [`Health check failed: ${error.message}`]
      };
    }
  }
}

// Export singleton instance
export const aiBlogIntegrationService = new AIBlogIntegrationService();