import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ITGyaniHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: "AI Agents",
      items: [
        { name: "Lead Generation", href: "/ai-agents/lead-generation" },
        { name: "Social Media", href: "/ai-agents/social-media" },
        { name: "CRM Automation", href: "/ai-agents/crm" },
        { name: "Research Agent", href: "/ai-agents/research" },
      ],
    },
    {
      title: "Automation",
      items: [
        { name: "N8N Workflows", href: "/automation/n8n" },
        { name: "Zapier", href: "/automation/zapier" },
        { name: "Make.com", href: "/automation/make" },
        { name: "Custom Workflows", href: "/automation/custom" },
      ],
    },
    {
      title: "Trainings",
      items: [
        { name: "Beginner AI", href: "/trainings/beginner" },
        { name: "Advanced Automation", href: "/trainings/advanced" },
        { name: "Content Bootcamp", href: "/trainings/content" },
        { name: "All Courses", href: "/academy" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold">
            IT<span className="text-neon-green">Gyani</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-2">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="font-body text-[15px] font-medium text-muted-foreground hover:text-neon-green transition-colors">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-4">
                    {item.items.map((subItem) => (
                      <li key={subItem.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={subItem.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-neon-green"
                          >
                            <div className="text-sm font-medium leading-none">
                              {subItem.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Link
                to="/ai-studio"
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[15px] font-medium text-muted-foreground hover:text-neon-green transition-colors"
              >
                AI Content Studio
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/pricing"
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[15px] font-medium text-muted-foreground hover:text-neon-green transition-colors"
              >
                Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/blog"
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[15px] font-medium text-muted-foreground hover:text-neon-green transition-colors"
              >
                Blog
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/auth">
            <Button
              variant="outline"
              className="border-electric-blue text-electric-blue hover:bg-electric-blue/10"
            >
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-neon-green to-electric-blue text-black font-semibold hover:shadow-lg hover:shadow-neon-green/20">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-6 pt-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <h3 className="font-semibold mb-2 text-neon-green">{item.title}</h3>
                  <ul className="flex flex-col gap-2 pl-4">
                    {item.items.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-electric-blue text-electric-blue">
                    Login
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-neon-green to-electric-blue text-black font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default ITGyaniHeader;
