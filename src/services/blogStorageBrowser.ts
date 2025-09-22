/**
 * Browser-Compatible Blog Storage Service
 * 
 * Uses localStorage and IndexedDB for browser-based storage
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  metaDescription: string;
  featuredImage?: string;
  images?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  seo: {
    keywords: string[];
    canonicalUrl?: string;
    openGraph?: {
      title: string;
      description: string;
      image: string;
    };
  };
  wordCount: number;
  readingTime: number;
  generatedBy?: string;
  aiModel?: string;
  generationCost?: number;
}

export interface BlogMetadata {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  categories: Record<string, number>;
  tags: Record<string, number>;
  lastUpdated: Date;
}

class BrowserBlogStorageService {
  private readonly BLOGS_KEY = 'itgyani_ai_blogs';
  private readonly METADATA_KEY = 'itgyani_blog_metadata';

  /**
   * Generate unique slug from title
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }

  /**
   * Calculate reading time based on word count
   */
  private calculateReadingTime(wordCount: number): number {
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Get all blogs from localStorage
   */
  private getAllBlogs(): BlogPost[] {
    try {
      const blogsData = localStorage.getItem(this.BLOGS_KEY);
      if (!blogsData) return [];
      
      const blogs = JSON.parse(blogsData);
      return blogs.map((blog: any) => ({
        ...blog,
        publishedAt: new Date(blog.publishedAt),
        updatedAt: new Date(blog.updatedAt)
      }));
    } catch (error) {
      console.error('Failed to load blogs:', error);
      return [];
    }
  }

  /**
   * Save all blogs to localStorage
   */
  private saveAllBlogs(blogs: BlogPost[]): void {
    try {
      localStorage.setItem(this.BLOGS_KEY, JSON.stringify(blogs));
      this.updateMetadata();
    } catch (error) {
      console.error('Failed to save blogs:', error);
    }
  }

  /**
   * Save a blog post
   */
  async saveBlogPost(
    blogData: Partial<BlogPost>,
    content: string,
    options: {
      status?: 'draft' | 'published';
      author?: string;
      generateSlug?: boolean;
    } = {}
  ): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    try {
      const now = new Date();
      const id = blogData.id || `blog-${Date.now()}`;
      const slug = options.generateSlug !== false ? 
        this.generateSlug(blogData.title || 'untitled') : 
        blogData.slug || id;

      // Count words in content
      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

      const blogPost: BlogPost = {
        id,
        title: blogData.title || 'Untitled Post',
        slug,
        content,
        excerpt: blogData.excerpt || content.substring(0, 200).replace(/\s+/g, ' ').trim() + '...',
        author: options.author || blogData.author || 'ITGYANI',
        category: blogData.category || 'general',
        tags: blogData.tags || [],
        publishedAt: blogData.publishedAt || now,
        updatedAt: now,
        status: options.status || blogData.status || 'draft',
        metaDescription: blogData.metaDescription || '',
        featuredImage: blogData.featuredImage,
        images: blogData.images || [],
        seo: blogData.seo || {
          keywords: blogData.tags || [],
          openGraph: {
            title: blogData.title || 'Untitled Post',
            description: blogData.metaDescription || '',
            image: blogData.featuredImage || '/default-og-image.jpg'
          }
        },
        wordCount,
        readingTime: this.calculateReadingTime(wordCount),
        generatedBy: blogData.generatedBy,
        aiModel: blogData.aiModel,
        generationCost: blogData.generationCost
      };

      // Get existing blogs
      const blogs = this.getAllBlogs();
      
      // Update or add blog
      const existingIndex = blogs.findIndex(b => b.id === blogPost.id);
      if (existingIndex >= 0) {
        blogs[existingIndex] = blogPost;
      } else {
        blogs.push(blogPost);
      }

      // Save updated blogs
      this.saveAllBlogs(blogs);

      return {
        success: true,
        data: blogPost
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to save blog post: ${error.message}`
      };
    }
  }

  /**
   * Load a blog post by ID or slug
   */
  async loadBlogPost(identifier: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    try {
      const blogs = this.getAllBlogs();
      const blog = blogs.find(b => 
        b.id === identifier || 
        b.slug === identifier || 
        b.slug.includes(identifier)
      );

      if (!blog) {
        return {
          success: false,
          error: `Blog post not found: ${identifier}`
        };
      }

      return {
        success: true,
        data: blog
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to load blog post: ${error.message}`
      };
    }
  }

  /**
   * List all blog posts with optional filtering
   */
  async listBlogPosts(filters: {
    status?: 'draft' | 'published' | 'archived';
    category?: string;
    tag?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'publishedAt' | 'updatedAt' | 'title';
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ success: boolean; data?: BlogPost[]; total?: number; error?: string }> {
    try {
      let blogs = this.getAllBlogs();

      // Apply filters
      if (filters.status) {
        blogs = blogs.filter(blog => blog.status === filters.status);
      }

      if (filters.category) {
        blogs = blogs.filter(blog => blog.category === filters.category);
      }

      if (filters.tag) {
        blogs = blogs.filter(blog => blog.tags.includes(filters.tag));
      }

      // Sort blogs
      const sortBy = filters.sortBy || 'publishedAt';
      const sortOrder = filters.sortOrder || 'desc';

      blogs.sort((a, b) => {
        let comparison = 0;
        
        if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else {
          const aValue = sortBy === 'publishedAt' ? a.publishedAt : a.updatedAt;
          const bValue = sortBy === 'publishedAt' ? b.publishedAt : b.updatedAt;
          comparison = aValue.getTime() - bValue.getTime();
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });

      // Apply pagination
      const total = blogs.length;
      const offset = filters.offset || 0;
      const limit = filters.limit || total;

      const paginatedBlogs = blogs.slice(offset, offset + limit);

      return {
        success: true,
        data: paginatedBlogs,
        total
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to list blog posts: ${error.message}`
      };
    }
  }

  /**
   * Delete a blog post
   */
  async deleteBlogPost(identifier: string): Promise<{ success: boolean; error?: string }> {
    try {
      const blogs = this.getAllBlogs();
      const blogIndex = blogs.findIndex(b => 
        b.id === identifier || 
        b.slug === identifier
      );

      if (blogIndex === -1) {
        return {
          success: false,
          error: `Blog post not found: ${identifier}`
        };
      }

      blogs.splice(blogIndex, 1);
      this.saveAllBlogs(blogs);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: `Failed to delete blog post: ${error.message}`
      };
    }
  }

  /**
   * Update blog post status
   */
  async updateBlogStatus(identifier: string, status: 'draft' | 'published' | 'archived'): Promise<{ success: boolean; error?: string }> {
    try {
      const loadResult = await this.loadBlogPost(identifier);
      if (!loadResult.success || !loadResult.data) {
        return {
          success: false,
          error: `Blog post not found: ${identifier}`
        };
      }

      const blogPost = loadResult.data;
      blogPost.status = status;
      blogPost.updatedAt = new Date();

      if (status === 'published' && blogPost.publishedAt > new Date()) {
        blogPost.publishedAt = new Date();
      }

      const saveOptions: { status: 'draft' | 'published' } = {
        status: status === 'archived' ? 'draft' : status as 'draft' | 'published'
      };

      const saveResult = await this.saveBlogPost(blogPost, blogPost.content, saveOptions);
      
      return {
        success: saveResult.success,
        error: saveResult.error
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to update blog status: ${error.message}`
      };
    }
  }

  /**
   * Get blog metadata and statistics
   */
  async getBlogMetadata(): Promise<{ success: boolean; data?: BlogMetadata; error?: string }> {
    try {
      const blogs = this.getAllBlogs();
      const categories: Record<string, number> = {};
      const tags: Record<string, number> = {};

      let publishedPosts = 0;
      let draftPosts = 0;

      blogs.forEach(blog => {
        // Count by status
        if (blog.status === 'published') publishedPosts++;
        else if (blog.status === 'draft') draftPosts++;

        // Count by category
        categories[blog.category] = (categories[blog.category] || 0) + 1;

        // Count by tags
        blog.tags.forEach(tag => {
          tags[tag] = (tags[tag] || 0) + 1;
        });
      });

      const metadata: BlogMetadata = {
        totalPosts: blogs.length,
        publishedPosts,
        draftPosts,
        categories,
        tags,
        lastUpdated: new Date()
      };

      return {
        success: true,
        data: metadata
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to get blog metadata: ${error.message}`
      };
    }
  }

  /**
   * Update blog metadata
   */
  private updateMetadata(): void {
    try {
      this.getBlogMetadata().then(result => {
        if (result.success && result.data) {
          localStorage.setItem(this.METADATA_KEY, JSON.stringify(result.data));
        }
      });
    } catch (error) {
      console.error('Failed to update metadata:', error);
    }
  }

  /**
   * Search blog posts
   */
  async searchBlogPosts(
    query: string,
    filters: {
      category?: string;
      tag?: string;
      status?: 'draft' | 'published' | 'archived';
    } = {}
  ): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> {
    try {
      const listResult = await this.listBlogPosts(filters);
      if (!listResult.success || !listResult.data) {
        return listResult;
      }

      const searchTerm = query.toLowerCase();
      const searchResults = listResult.data.filter(blog => {
        return (
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.content.toLowerCase().includes(searchTerm) ||
          blog.excerpt.toLowerCase().includes(searchTerm) ||
          blog.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          blog.category.toLowerCase().includes(searchTerm)
        );
      });

      return {
        success: true,
        data: searchResults
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to search blog posts: ${error.message}`
      };
    }
  }

  /**
   * Export blog posts to JSON
   */
  async exportBlogs(): Promise<{ success: boolean; data?: string; filename?: string; error?: string }> {
    try {
      const blogs = this.getAllBlogs();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      const exportData = {
        exportedAt: new Date().toISOString(),
        totalPosts: blogs.length,
        posts: blogs
      };

      return {
        success: true,
        data: JSON.stringify(exportData, null, 2),
        filename: `blog-export-${timestamp}.json`
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to export blogs: ${error.message}`
      };
    }
  }

  /**
   * Clear all blog data (for testing/development)
   */
  clearAllBlogs(): void {
    try {
      localStorage.removeItem(this.BLOGS_KEY);
      localStorage.removeItem(this.METADATA_KEY);
    } catch (error) {
      console.error('Failed to clear blog data:', error);
    }
  }
}

// Export singleton instance
export const blogStorageService = new BrowserBlogStorageService();