/**
 * Social Sharing Component
 * Provides social media sharing functionality with custom icons
 */

import React from 'react';
import { SocialIcon } from './ImageComponents';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialSharingProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const SocialSharing: React.FC<SocialSharingProps> = ({
  url = window.location.href,
  title = document.title,
  description = 'Check out this amazing content from ITGYANI',
  className = ''
}) => {
  const { toast } = useToast();

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=ITGYANI`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The page URL has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-sm font-medium text-foreground/70 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleShare('facebook')}
          className="transition-transform hover:scale-110"
          aria-label="Share on Facebook"
        >
          <SocialIcon type="facebook" />
        </button>
        
        <button
          onClick={() => handleShare('twitter')}
          className="transition-transform hover:scale-110"
          aria-label="Share on Twitter"
        >
          <SocialIcon type="twitter" />
        </button>
        
        <button
          onClick={() => handleShare('linkedin')}
          className="transition-transform hover:scale-110"
          aria-label="Share on LinkedIn"
        >
          <SocialIcon type="linkedin" />
        </button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="p-2 h-10 w-10"
          aria-label="Copy link"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Blog Post Sharing Component
interface BlogSharingProps {
  post: {
    title: string;
    excerpt: string;
    slug: string;
  };
  className?: string;
}

export const BlogPostSharing: React.FC<BlogSharingProps> = ({ post, className = '' }) => {
  const url = `${window.location.origin}/blog/${post.slug}`;
  
  return (
    <SocialSharing
      url={url}
      title={post.title}
      description={post.excerpt}
      className={className}
    />
  );
};

// Case Study Sharing Component
interface CaseStudySharingProps {
  study: {
    title: string;
    company: string;
    slug: string;
  };
  className?: string;
}

export const CaseStudySharing: React.FC<CaseStudySharingProps> = ({ study, className = '' }) => {
  const url = `${window.location.origin}/case-studies/${study.slug}`;
  const title = `${study.title} - ${study.company}`;
  const description = `Discover how ${study.company} achieved incredible results with AI automation. Real success story from ITGYANI.`;
  
  return (
    <SocialSharing
      url={url}
      title={title}
      description={description}
      className={className}
    />
  );
};

export default SocialSharing;