import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SEOUtils, BreadcrumbItem } from '@/utils/seoUtils';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const breadcrumbSchema = SEOUtils.generateBreadcrumbSchema(items);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-1 text-sm text-muted-foreground mb-6 ${className}`}
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
              )}
              
              {index === 0 && (
                <Home className="h-4 w-4 mr-2 text-muted-foreground/70" />
              )}
              
              {index === items.length - 1 ? (
                <span 
                  className="font-medium text-foreground truncate max-w-[200px]" 
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-primary transition-colors truncate max-w-[150px]"
                  title={item.name}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

// Utility function to generate breadcrumbs for different page types
export const generateBreadcrumbs = {
  blog: (): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' }
  ],
  
  blogPost: (category: string, title: string, slug: string): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: category, href: `/blog?category=${encodeURIComponent(category)}` },
    { name: title, href: `/blog/${slug}` }
  ],
  
  category: (category: string): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: category, href: `/blog?category=${encodeURIComponent(category)}` }
  ],
  
  services: (): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' }
  ],
  
  service: (serviceName: string, serviceSlug: string): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: serviceName, href: `/services/${serviceSlug}` }
  ],
  
  resources: (): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Resources', href: '/resources' }
  ],
  
  resource: (resourceName: string, resourceId: string): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Resources', href: '/resources' },
    { name: resourceName, href: `/resources/${resourceId}` }
  ],
  
  academy: (): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy' }
  ],
  
  course: (courseName: string, courseId: string): BreadcrumbItem[] => [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy' },
    { name: courseName, href: `/course/${courseId}` }
  ]
};