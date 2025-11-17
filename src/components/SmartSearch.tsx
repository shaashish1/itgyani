import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const quickSuggestions = [
  { text: "Lead generation workflow", icon: TrendingUp },
  { text: "Instagram carousel template", icon: TrendingUp },
  { text: "Beginner AI training", icon: TrendingUp },
  { text: "N8N CRM automation", icon: TrendingUp },
];

const SmartSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full filter blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Find Your Perfect AI Solution
          </h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="glass-card rounded-xl border border-white/20 focus-within:border-neon-green/50 transition-colors">
              <div className="flex items-center gap-3 p-4">
                <Search className="h-6 w-6 text-neon-green flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Search: AI agents, automations, trainings, templates…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 text-electric-blue hover:text-electric-blue/80"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-white/20 p-4 animate-fade-in">
                <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase">
                  Popular Searches
                </p>
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                        onClick={() => setSearchValue(suggestion.text)}
                      >
                        <Icon className="h-4 w-4 text-neon-green flex-shrink-0" />
                        <span className="text-sm">{suggestion.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="glass-card border-white/10 hover:border-electric-blue/50 transition-colors">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="agents">AI Agents</SelectItem>
                <SelectItem value="workflows">Workflows</SelectItem>
                <SelectItem value="trainings">Trainings</SelectItem>
                <SelectItem value="templates">Templates</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="glass-card border-white/10 hover:border-electric-blue/50 transition-colors">
                <SelectValue placeholder="Skill Level" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="glass-card border-white/10 hover:border-electric-blue/50 transition-colors">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSearch;
