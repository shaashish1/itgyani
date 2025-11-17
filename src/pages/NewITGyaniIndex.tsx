import ITGyaniHeader from "@/components/ITGyaniHeader";
import ITGyaniHero from "@/components/ITGyaniHero";
import StatsRow from "@/components/StatsRow";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedSlider from "@/components/FeaturedSlider";
import LatestContent from "@/components/LatestContent";
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
      <ITGyaniFooter />
    </div>
  );
};

export default NewITGyaniIndex;
