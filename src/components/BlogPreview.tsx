import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import OptimizedImage from "./OptimizedImage";

interface BlogPreviewProps {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  readingTime: number;
  category?: string;
  tags?: string[];
  keywords?: string[];
  publishedAt?: string;
}

const BlogPreview = ({
  title,
  excerpt,
  content,
  featuredImage,
  readingTime,
  category,
  tags = [],
  keywords = [],
  publishedAt
}: BlogPreviewProps) => {
  return (
    <div className="space-y-6">
      {/* Header with gradient - matching BlogDetail */}
      <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            {category && (
              <Badge variant="secondary" className="text-sm">
                {category}
              </Badge>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {publishedAt || new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {readingTime} min read
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                ITGYANI
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <OptimizedImage
            src={featuredImage}
            alt={title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content with same styling as BlogDetail */}
      <Card>
        <CardContent className="p-8">
          <article className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-4xl prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:mb-2 prose-li:text-foreground/90
            prose-blockquote:border-l-4 prose-blockquote:border-primary
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/80
            prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-img:rounded-lg prose-img:shadow-md"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {keywords.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">SEO Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPreview;
