// XML Sitemap generator for SEO
import { blogs } from '@/data/blogs';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SitemapGenerator {
  private static readonly DOMAIN = 'https://itgyani.com';
  
  static generateSitemap(): string {
    const entries = this.getAllSitemapEntries();
    
    const xmlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${xmlEntries}
</urlset>`;
  }

  static generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.DOMAIN}/sitemap.xml
Sitemap: ${this.DOMAIN}/blog-sitemap.xml

# Block admin and private areas
Disallow: /admin/
Disallow: /auth/
Disallow: /api/

# Allow images and CSS
Allow: /assets/
Allow: /*.css$
Allow: /*.js$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.gif$
Allow: /*.webp$
Allow: /*.svg$

# Crawl delay for respectful crawling
Crawl-delay: 1

# Specific rules for different bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /`;
  }

  static generateBlogSitemap(): string {
    const blogEntries = blogs.map(blog => ({
      url: `${this.DOMAIN}${blog.url}`,
      lastmod: new Date(blog.publishedAt).toISOString().split('T')[0],
      changefreq: 'weekly' as const,
      priority: 0.8,
      image: blog.featuredImage
    }));

    const xmlEntries = blogEntries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    ${entry.image ? `<image:image><image:loc>${entry.image}</image:loc></image:image>` : ''}
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${xmlEntries}
</urlset>`;
  }

  static generateNewsSitemap(): string {
    // Get recent blog posts (last 30 days) for news sitemap
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentPosts = blogs.filter(blog => 
      new Date(blog.publishedAt) > thirtyDaysAgo
    );

    const xmlEntries = recentPosts.map(blog => `
  <url>
    <loc>${this.DOMAIN}${blog.url}</loc>
    <news:news>
      <news:publication>
        <news:name>ITGYANI</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${blog.publishedAt}</news:publication_date>
      <news:title>${this.escapeXml(blog.title)}</news:title>
      <news:keywords>${blog.tags.join(', ')}</news:keywords>
    </news:news>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${xmlEntries}
</urlset>`;
  }

  private static getAllSitemapEntries(): SitemapEntry[] {
    const now = new Date().toISOString().split('T')[0];
    
    return [
      // Main pages
      {
        url: `${this.DOMAIN}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 1.0
      },
      {
        url: `${this.DOMAIN}/blog`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9
      },
      {
        url: `${this.DOMAIN}/services`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        url: `${this.DOMAIN}/resources`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/academy`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/case-studies`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/industries`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: `${this.DOMAIN}/about`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        url: `${this.DOMAIN}/contact`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        url: `${this.DOMAIN}/careers`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.6
      },
      
      // Service pages
      {
        url: `${this.DOMAIN}/services/business-automation`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/ai-customer-support`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/data-integration`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/ecommerce-automation`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/marketing-automation`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/scheduling-management`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/n8n-workflow`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: `${this.DOMAIN}/services/ai-strategy-consulting`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8
      },
      
      // Legal pages
      {
        url: `${this.DOMAIN}/privacy-policy`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        url: `${this.DOMAIN}/terms-of-service`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      
      // Blog posts
      ...blogs.map(blog => ({
        url: `${this.DOMAIN}${blog.url}`,
        lastmod: new Date(blog.publishedAt).toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.7
      }))
    ];
  }

  private static escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Generate sitemap index for large sites
  static generateSitemapIndex(): string {
    const now = new Date().toISOString().split('T')[0];
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${this.DOMAIN}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${this.DOMAIN}/blog-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${this.DOMAIN}/news-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
  }
}