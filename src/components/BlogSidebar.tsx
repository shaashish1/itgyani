import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: Date;
  category?: string;
  tags?: string[];
}

interface BlogSidebarProps {
  posts: BlogPost[];
}

export const BlogSidebar = ({ posts }: BlogSidebarProps) => {
  const featuredPosts = useMemo(() => posts.slice(0, 5), [posts]);
  
  const categories = useMemo(() => {
    const cats = new Set(posts.map(post => post.category));
    return Array.from(cats);
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = new Set(posts.flatMap(post => post.tags || []));
    return Array.from(tags).slice(0, 20);
  }, [posts]);

  return (
    <aside className="w-80 bg-card border-l border-border/50 p-6 space-y-8 overflow-y-auto max-h-screen sticky top-0">
      {/* Featured Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Featured Posts
        </h3>
        <div className="space-y-3">
          {featuredPosts.map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block p-3 rounded-lg hover:bg-accent/50 transition-all border border-border/30 hover:border-primary/50"
            >
              <h4 className="font-medium text-sm hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer hover:bg-primary/20 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </aside>
  );
};
