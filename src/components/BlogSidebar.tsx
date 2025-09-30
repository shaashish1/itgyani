import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronDown, ChevronRight, Star, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface MonthGroup {
  month: string;
  year: number;
  count: number;
  posts: BlogPost[];
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get featured posts (latest 5)
  const featuredPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5);
  }, [posts]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [posts]);

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).slice(0, 20); // Show top 20 tags
  }, [posts]);

  // Group posts by month and year
  const monthGroups = useMemo(() => {
    const groups: { [key: string]: MonthGroup } = {};

    posts.forEach((post) => {
      const date = new Date(post.publishedAt);
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!groups[key]) {
        groups[key] = {
          month,
          year,
          count: 0,
          posts: [],
        };
      }

      groups[key].count++;
      groups[key].posts.push(post);
    });

    // Sort by year and month (newest first)
    return Object.values(groups).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      const monthA = new Date(`${a.month} 1, ${a.year}`).getMonth();
      const monthB = new Date(`${b.month} 1, ${b.year}`).getMonth();
      return monthB - monthA;
    });
  }, [posts]);

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <Sidebar className="border-l border-border/50 bg-card/30">
      <SidebarContent className="bg-gradient-to-b from-card/50 to-background/50">
        
        {/* Featured Posts Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold flex items-center gap-2 text-primary">
            <Star className="h-4 w-4" />
            Featured Posts
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="block p-2 rounded-md bg-card/50 hover:bg-primary/10 border border-border/30 hover:border-primary/40 transition-all group"
                >
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </Link>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold flex items-center gap-2 text-primary">
            <TrendingUp className="h-4 w-4" />
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-wrap gap-1.5 px-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs h-7 hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tags */}
        {allTags.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-semibold text-primary">
              Popular Tags
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-wrap gap-1.5 px-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Archives by Month */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold flex items-center gap-2 text-primary">
            <Calendar className="h-4 w-4" />
            Archives
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monthGroups.map((group) => {
                const key = `${group.year}-${group.month}`;
                const isExpanded = expandedGroups.has(key);
                
                return (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton asChild>
                      <div 
                        onClick={() => toggleGroup(key)}
                        className="flex items-center justify-between w-full cursor-pointer hover:bg-primary/10 rounded-md p-2 transition-colors border border-transparent hover:border-primary/30"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-primary" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium text-foreground">
                            {group.month} {group.year}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                          {group.count}
                        </Badge>
                      </div>
                    </SidebarMenuButton>
                    
                    {isExpanded && (
                      <div className="ml-6 mt-2 space-y-1 pb-2">
                        {group.posts.map((post) => (
                          <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="block text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors py-1.5 px-2 rounded line-clamp-2 border-l-2 border-transparent hover:border-primary"
                          >
                            {post.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
