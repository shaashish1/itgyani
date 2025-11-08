// Static blog service - no database dependencies!
import { blogs } from '../data/blogs';
import { siteMetadata } from '../data/metadata';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featuredImage?: string;
  url: string;
  searchText: string;
}

export interface BlogPagination {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class BlogService {
  private blogs: Blog[] = blogs;
  private blogsPerPage = 12;

  // Get all blogs
  getAllBlogs(): Blog[] {
    return this.blogs;
  }

  // Get paginated blogs
  getBlogsPaginated(page: number = 1): BlogPagination {
    const start = (page - 1) * this.blogsPerPage;
    const end = start + this.blogsPerPage;
    const totalPages = Math.ceil(this.blogs.length / this.blogsPerPage);

    return {
      blogs: this.blogs.slice(start, end),
      currentPage: page,
      totalPages,
      totalBlogs: this.blogs.length,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  }

  // Search blogs
  searchBlogs(query: string): Blog[] {
    const searchTerm = query.toLowerCase();
    return this.blogs.filter(blog => 
      blog.searchText.includes(searchTerm)
    );
  }

  // Filter by category
  getBlogsByCategory(category: string): Blog[] {
    return this.blogs.filter(blog => 
      blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by tag
  getBlogsByTag(tag: string): Blog[] {
    return this.blogs.filter(blog => 
      blog.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Get featured blogs
  getFeaturedBlogs(limit: number = 6): Blog[] {
    return this.blogs.slice(0, limit);
  }

  // Get blog by slug
  getBlogBySlug(slug: string): Blog | undefined {
    return this.blogs.find(blog => blog.slug === slug);
  }

  // Get recent blogs
  getRecentBlogs(limit: number = 10): Blog[] {
    return this.blogs.slice(0, limit);
  }

  // Get site metadata
  getMetadata() {
    return siteMetadata;
  }

  // Get all categories
  getCategories(): string[] {
    return [...new Set(this.blogs.map(blog => blog.category))];
  }

  // Get all tags
  getTags(): string[] {
    return [...new Set(this.blogs.flatMap(blog => blog.tags))];
  }
}

// Export singleton instance
export const blogService = new BlogService();
export default blogService;
