import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import { Blog } from '@/services/blogService';
import { RelatedPost } from '@/utils/internalLinking';

interface RelatedPostsProps {
  relatedPosts: RelatedPost[];
  title?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  relatedPosts, 
  title = "Related Articles" 
}) => {
  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        {title}
        <ArrowRight className="h-5 w-5 text-primary" />
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-border">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readingTime} min
                </div>
              </div>
              
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                <Link to={post.url} className="block">
                  {post.title}
                </Link>
              </CardTitle>
              
              <CardDescription className="text-sm line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Button variant="outline" size="sm" asChild className="group/btn">
                <Link to={post.url}>
                  Read More
                  <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface CategoryPostsProps {
  posts: Blog[];
  category: string;
  currentPostId?: string;
}

export const CategoryPosts: React.FC<CategoryPostsProps> = ({ 
  posts, 
  category, 
  currentPostId 
}) => {
  const filteredPosts = posts.filter(post => 
    post.category === category && post.id !== currentPostId
  ).slice(0, 3);

  if (filteredPosts.length === 0) return null;

  return (
    <div className="bg-muted/30 rounded-lg p-6 mt-8">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        More in {category}
        <Badge variant="outline" className="text-xs">
          {filteredPosts.length} articles
        </Badge>
      </h4>
      
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div key={post.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-background transition-colors">
            <div className="flex-1">
              <h5 className="text-sm font-medium text-foreground leading-tight mb-1">
                <Link to={post.url} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" size="sm" asChild className="mt-4 w-full">
        <Link to={`/blog?category=${encodeURIComponent(category)}`}>
          View All {category} Articles
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </Button>
    </div>
  );
};

interface PopularPostsProps {
  posts: Blog[];
  title?: string;
}

export const PopularPosts: React.FC<PopularPostsProps> = ({ 
  posts, 
  title = "Popular Articles" 
}) => {
  if (posts.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        🔥 {title}
      </h4>
      
      <div className="space-y-4">
        {posts.slice(0, 4).map((post, index) => (
          <div key={post.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {index + 1}
              </span>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-foreground leading-tight mb-1">
                <Link to={post.url} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {post.category}
                </Badge>
                <Clock className="h-3 w-3" />
                {post.readingTime} min
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};