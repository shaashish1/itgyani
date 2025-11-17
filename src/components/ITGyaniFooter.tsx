import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Youtube, Github, ArrowUp } from "lucide-react";
import { useState } from "react";

const ITGyaniFooter = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand + Mission */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-display font-bold">
                IT<span className="text-neon-green">Gyani</span>
              </span>
            </Link>
            <p className="text-base font-body text-muted-foreground leading-relaxed">
              Empowering businesses and professionals with AI-driven automation, training, and content solutions. Build your AI workforce today.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-base font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/ai-agents" className="text-muted-foreground hover:text-neon-green transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link to="/automation" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Automation Workflows
                </Link>
              </li>
              <li>
                <Link to="/academy" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Training Academy
                </Link>
              </li>
              <li>
                <Link to="/ai-studio" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Content Studio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-neon-green transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/api-documentation" className="text-muted-foreground hover:text-neon-green transition-colors">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest AI automation tips and updates
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-neon-green"
              />
              <Button className="bg-neon-green text-black hover:bg-neon-green/90 font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">We respect your privacy</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 ITGyani. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-neon-green transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-neon-green transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-neon-green transition-colors">
                Cookies
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-green transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-green transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-green transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="text-muted-foreground hover:text-neon-green"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ITGyaniFooter;
