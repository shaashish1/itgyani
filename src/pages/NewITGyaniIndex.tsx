import ITGyaniHeader from "@/components/ITGyaniHeader";
import ITGyaniHero from "@/components/ITGyaniHero";
import StatsRow from "@/components/StatsRow";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedSlider from "@/components/FeaturedSlider";
import LatestContent from "@/components/LatestContent";
import TrainingsSection from "@/components/TrainingsSection";
import AIAgentStore from "@/components/AIAgentStore";
import ContentStudioGallery from "@/components/ContentStudioGallery";
import AutomationWorkflows from "@/components/AutomationWorkflows";
import SmartSearch from "@/components/SmartSearch";
import FinalCTA from "@/components/FinalCTA";
import ITGyaniFooter from "@/components/ITGyaniFooter";
import SEO from "@/components/SEO";

const NewITGyaniIndex = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SEO
        title="ITGyani - AI-Powered Automation & Business Solutions"
        description="Transform your business with AI agents, automation workflows, and expert training. Join 10,000+ professionals automating their success."
      />
      
      <ITGyaniHeader />
      <ITGyaniHero />
      <StatsRow />
      <CategoryGrid />
      <FeaturedSlider />
      <LatestContent />
      <TrainingsSection />
      <AIAgentStore />
      <ContentStudioGallery />
      <AutomationWorkflows />
      <SmartSearch />
      <FinalCTA />
      <ITGyaniFooter />
    </div>
  );
};

export default NewITGyaniIndex;
