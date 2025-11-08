// Advanced SEO utilities and schema markup generators
import { Blog } from '@/services/blogService';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export class SEOUtils {
  private static readonly SITE_URL = 'https://itgyani.com';
  private static readonly SITE_NAME = 'ITGYANI';
  private static readonly ORGANIZATION_NAME = 'ITGYANI - Intelligent Automation Solutions';

  // Generate JSON-LD structured data for articles
  static generateArticleSchema(blog: Blog): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${this.SITE_URL}${blog.url}`,
      "headline": blog.title,
      "description": blog.excerpt,
      "image": blog.featuredImage || `${this.SITE_URL}/favicon.ico`,
      "author": {
        "@type": "Organization",
        "name": this.ORGANIZATION_NAME,
        "url": this.SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.SITE_URL}/logo.png`
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": this.ORGANIZATION_NAME,
        "url": this.SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.SITE_URL}/logo.png`
        }
      },
      "datePublished": blog.publishedAt,
      "dateModified": blog.publishedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.SITE_URL}${blog.url}`
      },
      "articleSection": blog.category,
      "keywords": blog.tags.join(", "),
      "wordCount": this.estimateWordCount(blog.excerpt),
      "timeRequired": `PT${blog.readingTime}M`,
      "inLanguage": "en-US"
    };
  }

  // Generate JSON-LD structured data for blog listing page
  static generateBlogListSchema(blogs: Blog[]): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${this.SITE_URL}/blog`,
      "name": `${this.SITE_NAME} Blog - AI Automation Insights`,
      "description": "Expert insights, practical guides, and proven strategies to help you master AI automation and AI training for business success.",
      "url": `${this.SITE_URL}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": this.ORGANIZATION_NAME,
        "url": this.SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.SITE_URL}/logo.png`
        }
      },
      "inLanguage": "en-US",
      "blogPost": blogs.slice(0, 10).map(blog => ({
        "@type": "BlogPosting",
        "@id": `${this.SITE_URL}${blog.url}`,
        "headline": blog.title,
        "description": blog.excerpt,
        "url": `${this.SITE_URL}${blog.url}`,
        "datePublished": blog.publishedAt,
        "author": {
          "@type": "Organization",
          "name": this.ORGANIZATION_NAME
        },
        "image": blog.featuredImage
      }))
    };
  }

  // Generate organization schema
  static generateOrganizationSchema(): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": this.ORGANIZATION_NAME,
      "alternateName": "ITGyani",
      "url": this.SITE_URL,
      "logo": `${this.SITE_URL}/logo.png`,
      "description": "Leading provider of AI automation solutions, business process automation, and intelligent workflow optimization.",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "ITGyani Team"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "customer service",
        "availableLanguage": "en"
      },
      "sameAs": [
        "https://twitter.com/itgyani",
        "https://linkedin.com/company/itgyani",
        "https://github.com/itgyani"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    };
  }

  // Generate website schema
  static generateWebsiteSchema(): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${this.SITE_URL}#website`,
      "name": this.SITE_NAME,
      "alternateName": "ITGYANI - Intelligent Automation",
      "url": this.SITE_URL,
      "description": "Transform your business with intelligent automation solutions, AI-powered workflows, and cutting-edge automation strategies.",
      "publisher": {
        "@id": `${this.SITE_URL}#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${this.SITE_URL}/blog?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US"
    };
  }

  // Generate breadcrumb schema
  static generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.href.startsWith('http') ? item.href : `${this.SITE_URL}${item.href}`
      }))
    };
  }

  // Generate FAQ schema for blog posts
  static generateFAQSchema(faqs: Array<{question: string, answer: string}>): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // Estimate word count from content
  private static estimateWordCount(content: string): number {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  // Generate optimized meta description
  static generateMetaDescription(blog: Blog): string {
    let description = blog.excerpt;
    
    // Ensure description is within optimal length (150-160 characters)
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
    
    // Add relevant keywords if not present
    const keywords = ['automation', 'AI', 'workflow', 'business'];
    const lowerDesc = description.toLowerCase();
    
    for (const keyword of keywords) {
      if (blog.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())) && 
          !lowerDesc.includes(keyword.toLowerCase())) {
        if (description.length + keyword.length + 10 < 160) {
          description += ` ${keyword}`;
        }
        break;
      }
    }
    
    return description;
  }

  // Generate optimized title tag
  static generateTitle(blog: Blog): string {
    let title = blog.title;
    
    // Ensure title is within optimal length (50-60 characters)
    if (title.length > 60) {
      title = title.substring(0, 57) + '...';
    }
    
    return title;
  }

  // Generate canonical URL
  static generateCanonicalUrl(path: string): string {
    return `${this.SITE_URL}${path.startsWith('/') ? path : '/' + path}`;
  }

  // Generate hreflang tags for international SEO
  static generateHreflangTags(path: string): Array<{lang: string, url: string}> {
    return [
      { lang: 'en', url: `${this.SITE_URL}${path}` },
      { lang: 'x-default', url: `${this.SITE_URL}${path}` }
    ];
  }

  // Generate robots meta tag based on content type
  static generateRobotsMeta(isIndex: boolean = true, isFollow: boolean = true): string {
    const index = isIndex ? 'index' : 'noindex';
    const follow = isFollow ? 'follow' : 'nofollow';
    return `${index}, ${follow}`;
  }

  // Generate Open Graph image URL
  static generateOGImage(blog: Blog): string {
    return blog.featuredImage || `${this.SITE_URL}/og-image-default.jpg`;
  }

  // Calculate reading time more accurately
  static calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const wordCount = this.estimateWordCount(content);
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Generate keywords from blog content
  static extractKeywords(blog: Blog): string {
    const allText = `${blog.title} ${blog.excerpt} ${blog.tags.join(' ')}`.toLowerCase();
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'shall', 'a', 'an', 'as', 'if', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    
    const words = allText.split(/\s+/).filter(word => 
      word.length > 3 && !commonWords.includes(word)
    );
    
    // Get unique words and their frequency
    const wordFreq = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Sort by frequency and take top keywords
    const topKeywords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
    
    return [...blog.tags, ...topKeywords].join(', ');
  }
}