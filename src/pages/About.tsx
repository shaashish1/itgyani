import FutureFlowHeader from "@/components/FutureFlowHeader";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ITGYANI",
    "description": "Learn about ITGYANI's mission to transform businesses through AI-powered automation and intelligent workflow solutions.",
    "url": "https://itgyani.com/about"
  };

  return (
    <>
      <SEO
        title="About ITGYANI - AI Automation Experts"
        description="Learn about ITGYANI's mission to transform businesses through AI-powered automation, n8n workflows, and intelligent solutions. Discover our team, values, and commitment to innovation."
        keywords="about ITGYANI, AI automation company, n8n experts, business automation team, automation consulting"
        canonicalUrl="https://itgyani.com/about"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <FutureFlowHeader />
        <main>
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
