/**
 * Image Integration Component
 * Provides easy access to all generated images
 */

import React from 'react';

// Image paths configuration
const IMAGE_PATHS = {
  buttons: {
    readMorePrimary: '/images/generated/read-more-primary.svg',
    readMoreSecondary: '/images/generated/read-more-secondary.svg',
    readMoreOutline: '/images/generated/read-more-outline.svg',
    learnMore: '/images/generated/learn-more-primary.svg',
    viewDetails: '/images/generated/view-details-primary.svg',
    getStarted: '/images/generated/get-started-primary.svg',
    exploreNow: '/images/generated/explore-now-primary.svg'
  },
  
  blogThumbnails: {
    aiAutomationGuide: '/images/generated/ai-automation-guide.svg',
    businessTransformation: '/images/generated/business-transformation.svg',
    workflowOptimization: '/images/generated/workflow-optimization.svg',
    techInnovation: '/images/generated/tech-innovation.svg',
    caseStudySuccess: '/images/generated/case-study-success.svg',
    aiImplementation: '/images/generated/ai-implementation.svg',
    automationTrends: '/images/generated/automation-trends.svg'
  },
  
  pageHeaders: {
    services: '/images/generated/services-header.svg',
    caseStudies: '/images/generated/case-studies-header.svg',
    blog: '/images/generated/blog-header.svg',
    about: '/images/generated/about-header.svg',
    contact: '/images/generated/contact-header.svg',
    resources: '/images/generated/resources-header.svg',
    academy: '/images/generated/academy-header.svg'
  },
  
  social: {
    facebook: '/images/generated/facebook-share.svg',
    twitter: '/images/generated/twitter-share.svg',
    linkedin: '/images/generated/linkedin-share.svg',
    github: '/images/generated/github-link.svg'
  }
};

// ReadMe Button Component
interface ReadMeButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  text?: 'readMore' | 'learnMore' | 'viewDetails' | 'getStarted' | 'exploreNow';
  onClick?: () => void;
  className?: string;
}

export const ReadMeButton: React.FC<ReadMeButtonProps> = ({
  variant = 'primary',
  text = 'readMore',
  onClick,
  className = ''
}) => {
  const getImagePath = () => {
    if (text === 'readMore') {
      return variant === 'primary' ? IMAGE_PATHS.buttons.readMorePrimary :
             variant === 'secondary' ? IMAGE_PATHS.buttons.readMoreSecondary :
             IMAGE_PATHS.buttons.readMoreOutline;
    }
    return IMAGE_PATHS.buttons[text] || IMAGE_PATHS.buttons.readMorePrimary;
  };

  return (
    <button
      onClick={onClick}
      className={`inline-block transition-transform hover:scale-105 ${className}`}
      aria-label={`${text.replace(/([A-Z])/g, ' $1').toLowerCase()} button`}
    >
      <img 
        src={getImagePath()} 
        alt={text.replace(/([A-Z])/g, ' $1')}
        className="w-auto h-auto"
      />
    </button>
  );
};

// Blog Thumbnail Component
interface BlogThumbnailProps {
  type: keyof typeof IMAGE_PATHS.blogThumbnails;
  alt?: string;
  className?: string;
}

export const BlogThumbnail: React.FC<BlogThumbnailProps> = ({
  type,
  alt,
  className = ''
}) => {
  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <img 
        src={IMAGE_PATHS.blogThumbnails[type]}
        alt={alt || `${type.replace(/([A-Z])/g, ' $1')} thumbnail`}
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
    </div>
  );
};

// Page Header Component
interface PageHeaderProps {
  type: keyof typeof IMAGE_PATHS.pageHeaders;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  type,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <img 
        src={IMAGE_PATHS.pageHeaders[type]}
        alt={`${type} page header`}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

// Social Icon Component
interface SocialIconProps {
  type: keyof typeof IMAGE_PATHS.social;
  href?: string;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  type,
  href,
  className = ''
}) => {
  const Component = href ? 'a' : 'div';
  
  return (
    <Component
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-block transition-transform hover:scale-110 ${className}`}
    >
      <img 
        src={IMAGE_PATHS.social[type]}
        alt={`${type} social icon`}
        className="w-10 h-10"
      />
    </Component>
  );
};

// Image Gallery Component for showcasing all generated images
export const ImageGallery: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-2xl font-bold mb-4">Read Me Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <ReadMeButton variant="primary" text="readMore" />
          <ReadMeButton variant="secondary" text="readMore" />
          <ReadMeButton variant="outline" text="readMore" />
          <ReadMeButton variant="primary" text="learnMore" />
          <ReadMeButton variant="primary" text="viewDetails" />
          <ReadMeButton variant="primary" text="getStarted" />
          <ReadMeButton variant="primary" text="exploreNow" />
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Blog Thumbnails</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(IMAGE_PATHS.blogThumbnails).map((key) => (
            <BlogThumbnail 
              key={key}
              type={key as keyof typeof IMAGE_PATHS.blogThumbnails}
              className="aspect-video"
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Page Headers</h3>
        <div className="space-y-4">
          {Object.keys(IMAGE_PATHS.pageHeaders).map((key) => (
            <PageHeader 
              key={key}
              type={key as keyof typeof IMAGE_PATHS.pageHeaders}
              className="rounded-lg overflow-hidden"
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Social Icons</h3>
        <div className="flex gap-4">
          {Object.keys(IMAGE_PATHS.social).map((key) => (
            <SocialIcon 
              key={key}
              type={key as keyof typeof IMAGE_PATHS.social}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export image paths for direct usage
export { IMAGE_PATHS };