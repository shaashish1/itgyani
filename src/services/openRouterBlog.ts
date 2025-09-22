/**
 * OpenRouter AI Blog Generation Service
 * 
 * Handles communication with OpenRouter API for generating blog content
 * using various AI models (Claude, GPT-4, Gemini, Llama, etc.)
 */

import { getAIBlogConfig, getModelConfig } from '@/config/aiBlog';

export interface BlogGenerationRequest {
  topic: string;
  category: string;
  keywords?: string[];
  tone?: 'professional' | 'casual' | 'technical' | 'creative';
  audience?: 'business' | 'technical' | 'general' | 'academic';
  wordCount?: number;
  includeImages?: boolean;
  seoOptimized?: boolean;
}

export interface BlogContent {
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  excerpt: string;
  readingTime: number;
  imagePrompts: string[];
  category: string;
  publishedAt?: string;
  createdAt: string;
}

export interface APIResponse {
  success: boolean;
  data?: BlogContent;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost?: number;
  };
}

class OpenRouterBlogService {
  private config = getAIBlogConfig();
  private baseUrl = this.config.openRouter.baseUrl;
  private apiKey = this.config.openRouter.apiKey;

  /**
   * Generate blog content using OpenRouter API
   */
  async generateBlog(request: BlogGenerationRequest): Promise<APIResponse> {
    try {
      this.log('Starting blog generation', { topic: request.topic, category: request.category });

      // Select appropriate model based on request type
      const modelConfig = this.getOptimalModel(request);
      
      // Generate the blog content
      const prompt = this.buildBlogPrompt(request);
      const response = await this.callOpenRouter(prompt, modelConfig);

      if (!response.success) {
        return response;
      }

      // Parse and structure the generated content
      const blogContent = this.parseGeneratedContent(response.data, request);
      
      this.log('Blog generation completed', { 
        title: blogContent.title, 
        wordCount: blogContent.content.split(' ').length 
      });

      return {
        success: true,
        data: blogContent,
        usage: response.usage
      };

    } catch (error) {
      this.log('Blog generation failed', { error: error.message });
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate multiple blog ideas for a topic
   */
  async generateBlogIdeas(topic: string, count: number = 5): Promise<APIResponse> {
    try {
      const prompt = this.buildIdeaPrompt(topic, count);
      const modelConfig = getModelConfig('creative');
      
      const response = await this.callOpenRouter(prompt, modelConfig);
      
      if (!response.success) {
        return response;
      }

      const ideas = this.parseGeneratedIdeas(response.data);
      
      return {
        success: true,
        data: ideas,
        usage: response.usage
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Enhance existing blog content
   */
  async enhanceBlog(content: string, instructions: string): Promise<APIResponse> {
    try {
      const prompt = this.buildEnhancementPrompt(content, instructions);
      const modelConfig = getModelConfig('content');
      
      const response = await this.callOpenRouter(prompt, modelConfig);
      
      return response;

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Call OpenRouter API with retry logic
   */
  private async callOpenRouter(prompt: string, modelConfig: any, retryCount: number = 0): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://itgyani.com',
          'X-Title': 'ITGYANI AI Blog Generator'
        },
        body: JSON.stringify({
          model: modelConfig.model,
          messages: [
            {
              role: 'system',
              content: this.getSystemPrompt()
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: modelConfig.temperature,
          max_tokens: modelConfig.maxTokens,
          top_p: modelConfig.topP,
          frequency_penalty: this.config.openRouter.frequencyPenalty,
          presence_penalty: this.config.openRouter.presencePenalty,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific error types
        if (response.status === 429) {
          // Rate limited - wait and retry
          if (retryCount < this.config.errorHandling.maxRetries) {
            await this.delay(this.config.errorHandling.retryDelay * (retryCount + 1));
            return this.callOpenRouter(prompt, modelConfig, retryCount + 1);
          }
        }
        
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.choices[0].message.content,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
          cost: this.calculateCost(data.usage, modelConfig.model)
        }
      };

    } catch (error) {
      if (retryCount < this.config.errorHandling.maxRetries) {
        await this.delay(this.config.errorHandling.retryDelay);
        return this.callOpenRouter(prompt, modelConfig, retryCount + 1);
      }
      
      throw error;
    }
  }

  /**
   * Select optimal model based on request characteristics
   */
  private getOptimalModel(request: BlogGenerationRequest) {
    const { category, tone } = request;
    
    // Technical content - use technical model
    if (category === 'technology' || category === 'automation' || tone === 'technical') {
      return getModelConfig('technical');
    }
    
    // Creative content - use creative model
    if (tone === 'creative') {
      return getModelConfig('creative');
    }
    
    // Default to primary model for business content
    return getModelConfig('content');
  }

  /**
   * Build comprehensive blog generation prompt
   */
  private buildBlogPrompt(request: BlogGenerationRequest): string {
    const { topic, category, keywords = [], tone = 'professional', audience = 'business', wordCount = 1500 } = request;
    
    return `Create a comprehensive, SEO-optimized blog post about "${topic}" for the ${category} category.

REQUIREMENTS:
- Target audience: ${audience}
- Tone: ${tone}
- Word count: ${wordCount} words
- Include relevant keywords: ${keywords.join(', ')}
- SEO optimized with meta description and tags
- Professional structure with clear headings
- Include practical examples and actionable insights
- Add 2-3 relevant image suggestions with descriptions

STRUCTURE:
1. Compelling title (60 characters max)
2. Meta description (150-160 characters)
3. Introduction (engaging hook)
4. Main content with subheadings
5. Practical examples/case studies
6. Conclusion with key takeaways
7. Call-to-action
8. SEO keywords and tags

FORMAT YOUR RESPONSE AS JSON:
{
  "title": "Blog post title",
  "metaDescription": "SEO meta description",
  "content": "Full blog content in markdown format",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "tags": ["tag1", "tag2", "tag3"],
  "excerpt": "Brief excerpt for previews",
  "imagePrompts": ["Image prompt 1", "Image prompt 2", "Image prompt 3"]
}

Focus on providing genuine value to business professionals seeking ${category} solutions. Include current industry trends and actionable advice.`;
  }

  /**
   * Build prompt for generating blog ideas
   */
  private buildIdeaPrompt(topic: string, count: number): string {
    return `Generate ${count} engaging blog post ideas related to "${topic}".

For each idea, provide:
1. Title (compelling and SEO-friendly)
2. Brief description (2-3 sentences)
3. Target audience
4. Key points to cover
5. Estimated reading time

FORMAT AS JSON:
{
  "ideas": [
    {
      "title": "Blog title",
      "description": "Brief description",
      "audience": "Target audience",
      "keyPoints": ["Point 1", "Point 2", "Point 3"],
      "estimatedReadingTime": "5 minutes"
    }
  ]
}

Make the ideas diverse, actionable, and valuable for business professionals.`;
  }

  /**
   * Build prompt for enhancing existing content
   */
  private buildEnhancementPrompt(content: string, instructions: string): string {
    return `Enhance the following blog content based on these instructions: ${instructions}

ORIGINAL CONTENT:
${content}

ENHANCEMENT INSTRUCTIONS:
${instructions}

Please provide the enhanced version while maintaining the original structure and improving based on the specific instructions provided.`;
  }

  /**
   * Get system prompt for blog generation
   */
  private getSystemPrompt(): string {
    return `You are an expert content writer for ITGYANI, a leading business automation and AI solutions company. 

CRITICAL: All content must comply with Google AdSense policies and guidelines:

CONTENT QUALITY REQUIREMENTS:
- Create original, high-value content that provides genuine insights
- Write authoritative, well-researched articles with proper citations
- Ensure all information is accurate, factual, and up-to-date
- Focus on educational and informational content
- Provide actionable business insights and solutions

PROHIBITED CONTENT - NEVER include:
- Adult content, violence, or inappropriate material
- Misleading, deceptive, or clickbait content
- Copyrighted material without proper attribution
- Spam, low-quality, or automatically generated content
- Content that promotes illegal activities or harmful behavior
- Discriminatory or hate speech content
- Medical advice without proper disclaimers
- Financial advice without appropriate disclaimers

CONTENT STRUCTURE REQUIREMENTS:
- Use clear, descriptive headings and subheadings
- Include proper introduction, body, and conclusion
- Add value through actionable insights and real-world examples
- Maintain professional tone throughout
- Use proper markdown formatting for readability
- Include relevant, contextual internal and external links

SEO & READABILITY:
- Write compelling, non-clickbait titles that accurately reflect content
- Create engaging meta descriptions under 160 characters
- Use relevant keywords naturally throughout the content
- Maintain optimal keyword density (1-2%)
- Write for humans first, search engines second
- Ensure content is scannable with bullet points and lists

BUSINESS FOCUS:
- Center content around business automation and AI solutions
- Highlight practical applications and case studies
- Address common business challenges and solutions
- Demonstrate ITGYANI's expertise and thought leadership
- Include actionable recommendations readers can implement

Your goal is to create premium, Google AdSense-compliant content that establishes ITGYANI as a trusted authority while providing genuine value to business professionals seeking automation and AI solutions.`;
  }

  /**
   * Parse generated content into structured format
   */
  private parseGeneratedContent(content: string, request: BlogGenerationRequest): BlogContent {
    try {
      // Try to parse JSON response
      const parsed = JSON.parse(content);
      
      const slug = this.generateSlug(parsed.title);
      const readingTime = this.calculateReadingTime(parsed.content);
      
      return {
        title: parsed.title,
        slug,
        content: parsed.content,
        metaDescription: parsed.metaDescription,
        keywords: parsed.keywords || [],
        tags: parsed.tags || [],
        excerpt: parsed.excerpt || this.generateExcerpt(parsed.content),
        readingTime,
        imagePrompts: parsed.imagePrompts || [],
        category: request.category,
        createdAt: new Date().toISOString()
      };
      
    } catch (error) {
      // Fallback parsing if JSON fails
      this.log('JSON parsing failed, using fallback parsing', { error: error.message });
      
      return {
        title: this.extractTitle(content) || `Blog about ${request.topic}`,
        slug: this.generateSlug(request.topic),
        content: content,
        metaDescription: this.generateMetaDescription(content),
        keywords: request.keywords || [],
        tags: [request.category],
        excerpt: this.generateExcerpt(content),
        readingTime: this.calculateReadingTime(content),
        imagePrompts: [],
        category: request.category,
        createdAt: new Date().toISOString()
      };
    }
  }

  /**
   * Parse generated blog ideas
   */
  private parseGeneratedIdeas(content: string): any {
    try {
      return JSON.parse(content);
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        ideas: [{
          title: "Blog Ideas Generation Failed",
          description: "Unable to parse generated ideas. Please try again.",
          audience: "General",
          keyPoints: ["Retry generation", "Check API response", "Review prompt"],
          estimatedReadingTime: "N/A"
        }]
      };
    }
  }

  /**
   * Generate URL-friendly slug
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Calculate reading time based on word count
   */
  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Generate excerpt from content
   */
  private generateExcerpt(content: string, maxLength: number = 160): string {
    const sentences = content.split(/[.!?]+/);
    let excerpt = '';
    
    for (const sentence of sentences) {
      if ((excerpt + sentence).length > maxLength) {
        break;
      }
      excerpt += sentence + '.';
    }
    
    return excerpt.trim();
  }

  /**
   * Extract title from content
   */
  private extractTitle(content: string): string | null {
    const titleMatch = content.match(/^#\s*(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : null;
  }

  /**
   * Generate meta description
   */
  private generateMetaDescription(content: string): string {
    const excerpt = this.generateExcerpt(content, 155);
    return excerpt.replace(/\n/g, ' ').trim();
  }

  /**
   * Calculate approximate cost based on token usage
   */
  private calculateCost(usage: any, model: string): number {
    if (!usage) return 0;
    
    // Approximate pricing (update based on actual OpenRouter pricing)
    const pricing = {
      'anthropic/claude-3.5-sonnet': { input: 0.003, output: 0.015 },
      'openai/gpt-4o-mini': { input: 0.00015, output: 0.0006 },
      'google/gemini-pro': { input: 0.000125, output: 0.000375 },
      'meta-llama/llama-3.1-8b-instruct': { input: 0.0001, output: 0.0001 },
      'microsoft/phi-3-mini-128k-instruct': { input: 0.00005, output: 0.00005 }
    };
    
    const modelPricing = pricing[model] || { input: 0.001, output: 0.002 };
    
    return (usage.prompt_tokens * modelPricing.input / 1000) + 
           (usage.completion_tokens * modelPricing.output / 1000);
  }

  /**
   * Utility: Delay function for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Utility: Logging function
   */
  private log(message: string, data?: any): void {
    if (this.config.debug) {
      console.log(`[OpenRouter Blog Service] ${message}`, data || '');
    }
  }
}

// Export singleton instance
export const openRouterBlogService = new OpenRouterBlogService();
export default openRouterBlogService;