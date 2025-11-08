// Internal linking utility for blog posts
import { Blog } from '@/services/blogService';

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readingTime: number;
  url: string;
  relevanceScore: number;
}

export class InternalLinkingService {
  private static calculateRelevanceScore(currentBlog: Blog, candidateBlog: Blog): number {
    let score = 0;

    // Same category gets high score
    if (currentBlog.category === candidateBlog.category) {
      score += 40;
    }

    // Shared tags get points
    const sharedTags = currentBlog.tags.filter(tag => candidateBlog.tags.includes(tag));
    score += sharedTags.length * 15;

    // Similar keywords in title/excerpt
    const currentWords = `${currentBlog.title} ${currentBlog.excerpt}`.toLowerCase().split(/\s+/);
    const candidateWords = `${candidateBlog.title} ${candidateBlog.excerpt}`.toLowerCase().split(/\s+/);
    const commonWords = currentWords.filter(word => 
      candidateWords.includes(word) && word.length > 4
    );
    score += commonWords.length * 5;

    // Recency bonus (newer posts get slight preference)
    const currentDate = new Date(currentBlog.publishedAt);
    const candidateDate = new Date(candidateBlog.publishedAt);
    const daysDiff = Math.abs((currentDate.getTime() - candidateDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 30) score += 10;
    else if (daysDiff < 90) score += 5;

    return score;
  }

  static getRelatedPosts(currentBlog: Blog, allBlogs: Blog[], limit: number = 4): RelatedPost[] {
    return allBlogs
      .filter(blog => blog.id !== currentBlog.id)
      .map(blog => ({
        ...blog,
        relevanceScore: this.calculateRelevanceScore(currentBlog, blog)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        category: blog.category,
        readingTime: blog.readingTime,
        url: blog.url,
        relevanceScore: blog.relevanceScore
      }));
  }

  static getCategoryPosts(category: string, allBlogs: Blog[], currentBlogId?: string, limit: number = 6): Blog[] {
    return allBlogs
      .filter(blog => blog.category === category && blog.id !== currentBlogId)
      .slice(0, limit);
  }

  static getPopularPosts(allBlogs: Blog[], limit: number = 5): Blog[] {
    // For now, use most recent posts as "popular"
    // In a real system, you'd use view counts or engagement metrics
    return allBlogs
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  static generateInternalLinks(content: string, allBlogs: Blog[], currentBlogId: string): string {
    let linkedContent = content;
    
    // Keywords to automatically link
    const linkableKeywords = [
      { keywords: ['automation', 'business automation'], category: 'Automation' },
      { keywords: ['AI', 'artificial intelligence', 'machine learning'], category: 'AI & Machine Learning' },
      { keywords: ['n8n', 'workflow', 'workflows'], category: 'n8n Workflows' },
      { keywords: ['quantum computing', 'quantum'], category: 'Quantum Computing' },
      { keywords: ['edge AI', 'edge computing'], category: 'Edge AI' },
      { keywords: ['future tech', 'emerging technology'], category: 'Future Tech' }
    ];

    // Find relevant posts for linking
    linkableKeywords.forEach(({ keywords, category }) => {
      const categoryPosts = this.getCategoryPosts(category, allBlogs, currentBlogId, 3);
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        let matchCount = 0;
        
        linkedContent = linkedContent.replace(regex, (match) => {
          matchCount++;
          // Only link the first 2 occurrences to avoid over-linking
          if (matchCount <= 2 && categoryPosts.length > 0) {
            const randomPost = categoryPosts[Math.floor(Math.random() * categoryPosts.length)];
            return `<a href="${randomPost.url}" class="text-primary hover:text-primary/80 underline transition-colors" title="Learn more about ${match}">${match}</a>`;
          }
          return match;
        });
      });
    });

    return linkedContent;
  }

  static generateBreadcrumbs(category: string, title: string): Array<{name: string, href: string}> {
    return [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: category, href: `/blog?category=${encodeURIComponent(category)}` },
      { name: title, href: '#' }
    ];
  }
}