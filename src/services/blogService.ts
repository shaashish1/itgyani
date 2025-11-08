// blogService.ts - Static blog data service for ITGyani admin
// This service provides access to blog data for the admin interface

import { blogs } from '../data/blogs';
import { metadata } from '../data/metadata';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  created_at?: string;
  updated_at?: string;
  readingTime: number;
  read_time?: number;
  author?: string;
  featured?: boolean;
  featuredImage?: string;
  status?: 'published' | 'draft' | 'archived';
  views?: number;
  likes?: number;
}

export interface BlogsPaginatedResult {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogStats {
  total: number;
  categories: Record<string, number>;
  recentCount: number;
  avgReadTime: number;
}

class BlogService {
  private blogData: Blog[] = [];
  private blogsPerPage: number = 12;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    try {
      // Load blogs from static data
      if (Array.isArray(blogs)) {
        this.blogData = blogs.map(blog => ({
          ...blog,
          created_at: blog.publishedAt,
          read_time: blog.readingTime,
          status: blog.status || 'published'
        }));
        console.log(`📚 BlogService: Initialized with ${this.blogData.length} blogs`);
      } else {
        console.error('❌ BlogService: Invalid blogs data structure');
        this.blogData = [];
      }

      // Set blogs per page from metadata
      if (metadata?.blogsPerPage) {
        this.blogsPerPage = metadata.blogsPerPage;
      }

    } catch (error) {
      console.error('❌ BlogService: Error initializing data:', error);
      this.blogData = [];
    }
  }

  // Get all blogs
  getAllBlogs(): Blog[] {
    try {
      console.log(`📚 BlogService.getAllBlogs(): Returning ${this.blogData.length} blogs`);
      return [...this.blogData]; // Return a copy to prevent mutations
    } catch (error) {
      console.error('❌ BlogService.getAllBlogs(): Error:', error);
      return [];
    }
  }

  // Get blogs with pagination
  getBlogsPaginated(page: number = 1): BlogsPaginatedResult {
    try {
      const totalBlogs = this.blogData.length;
      const totalPages = Math.ceil(totalBlogs / this.blogsPerPage);
      const currentPage = Math.max(1, Math.min(page, totalPages));
      
      const startIndex = (currentPage - 1) * this.blogsPerPage;
      const endIndex = startIndex + this.blogsPerPage;
      const blogs = this.blogData.slice(startIndex, endIndex);

      const result = {
        blogs,
        currentPage,
        totalPages,
        totalBlogs,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      };

      console.log(`📄 BlogService.getBlogsPaginated(${page}):`, {
        totalBlogs,
        totalPages,
        currentPage,
        blogsOnPage: blogs.length
      });

      return result;
    } catch (error) {
      console.error('❌ BlogService.getBlogsPaginated(): Error:', error);
      return {
        blogs: [],
        currentPage: 1,
        totalPages: 0,
        totalBlogs: 0,
        hasNextPage: false,
        hasPrevPage: false
      };
    }
  }

  // Get blog by ID
  getBlogById(id: string): Blog | null {
    try {
      const blog = this.blogData.find(b => b.id === id);
      console.log(`🔍 BlogService.getBlogById(${id}):`, blog ? 'Found' : 'Not found');
      return blog || null;
    } catch (error) {
      console.error('❌ BlogService.getBlogById(): Error:', error);
      return null;
    }
  }

  // Get blog by slug
  getBlogBySlug(slug: string): Blog | null {
    try {
      const blog = this.blogData.find(b => b.slug === slug);
      console.log(`🔍 BlogService.getBlogBySlug(${slug}):`, blog ? 'Found' : 'Not found');
      return blog || null;
    } catch (error) {
      console.error('❌ BlogService.getBlogBySlug(): Error:', error);
      return null;
    }
  }

  // Get blogs by category
  getBlogsByCategory(category: string): Blog[] {
    try {
      const blogs = this.blogData.filter(b => b.category === category);
      console.log(`🏷️ BlogService.getBlogsByCategory(${category}): Found ${blogs.length} blogs`);
      return blogs;
    } catch (error) {
      console.error('❌ BlogService.getBlogsByCategory(): Error:', error);
      return [];
    }
  }

  // Get all categories
  getCategories(): string[] {
    try {
      const categories = [...new Set(this.blogData.map(b => b.category))].filter(Boolean);
      console.log(`🏷️ BlogService.getCategories(): Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      console.error('❌ BlogService.getCategories(): Error:', error);
      return [];
    }
  }

  // Get blog statistics
  getStatistics(): BlogStats {
    try {
      const stats = {
        total: this.blogData.length,
        categories: this.blogData.reduce((acc, blog) => {
          const category = blog.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        recentCount: this.blogData.filter(blog => {
          const blogDate = new Date(blog.publishedAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return blogDate > weekAgo;
        }).length,
        avgReadTime: this.blogData.length > 0 
          ? Math.round(this.blogData.reduce((acc, blog) => acc + (blog.readingTime || 0), 0) / this.blogData.length)
          : 0
      };

      console.log('📊 BlogService.getStatistics():', stats);
      return stats;
    } catch (error) {
      console.error('❌ BlogService.getStatistics(): Error:', error);
      return {
        total: 0,
        categories: {},
        recentCount: 0,
        avgReadTime: 0
      };
    }
  }

  // Search blogs
  searchBlogs(query: string): Blog[] {
    try {
      if (!query.trim()) {
        return this.blogData;
      }

      const searchTerm = query.toLowerCase();
      const results = this.blogData.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.category.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );

      console.log(`🔍 BlogService.searchBlogs(${query}): Found ${results.length} results`);
      return results;
    } catch (error) {
      console.error('❌ BlogService.searchBlogs(): Error:', error);
      return [];
    }
  }

  // Health check for debugging
  healthCheck(): { status: string; details: any } {
    try {
      const health = {
        status: 'healthy',
        details: {
          totalBlogs: this.blogData.length,
          blogsPerPage: this.blogsPerPage,
          categories: this.getCategories().length,
          firstBlog: this.blogData[0] ? {
            id: this.blogData[0].id,
            title: this.blogData[0].title,
            category: this.blogData[0].category
          } : null,
          timestamp: new Date().toISOString()
        }
      };

      console.log('🏥 BlogService.healthCheck():', health);
      return health;
    } catch (error) {
      console.error('❌ BlogService.healthCheck(): Error:', error);
      return {
        status: 'error',
        details: { error: error.message }
      };
    }
  }
}

// Create and export singleton instance
export const blogService = new BlogService();

// Export class for testing
export { BlogService };

// Export default
export default blogService;