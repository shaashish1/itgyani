import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  ArrowUp,
  Sparkles
} from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Services", href: "#services" },
      { name: "Case Studies", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" }
    ],
    services: [
      { name: "Business Automation", href: "#" },
      { name: "AI Integration", href: "#" },
      { name: "Custom Workflows", href: "#" },
      { name: "Data Synchronization", href: "#" },
      { name: "AI Studio", href: "/ai-studio" }
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Tutorials", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Community", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Security", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Mail className="h-5 w-5" />, href: "#", label: "Email" }
  ];

  return (
    <footer className="relative bg-card/50 backdrop-blur-xl border-t border-border/50">
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-foreground/70 mb-8">
              Get the latest automation insights, AI trends, and exclusive tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-input/50 border-border/50 focus:border-primary"
              />
              <Button className="btn-hero px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="NeuralFlow AI" className="h-10 w-10" />
              <span className="text-2xl font-bold gradient-text">
                NeuralFlow AI
              </span>
            </Link>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Empowering businesses with intelligent automation solutions. 
              Transform your workflows, accelerate growth, and focus on what matters most.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/60">
              © 2024 NeuralFlow AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-foreground/50">Made with ❤️ for automation</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="w-8 h-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;