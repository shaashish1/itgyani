import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: Date;
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

  return (
    <Sidebar className="border-l border-border/50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Archives
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monthGroups.map((group) => (
                <SidebarMenuItem key={`${group.year}-${group.month}`}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center justify-between w-full cursor-pointer hover:bg-accent/50 rounded-md p-2 transition-colors">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {group.month} {group.year}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {group.count}
                      </Badge>
                    </div>
                  </SidebarMenuButton>
                  <div className="ml-6 mt-2 space-y-1">
                    {group.posts.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    ))}
                    {group.posts.length > 3 && (
                      <p className="text-xs text-muted-foreground italic">
                        +{group.posts.length - 3} more...
                      </p>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
