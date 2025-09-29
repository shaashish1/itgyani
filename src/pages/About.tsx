import FutureFlowHeader from "@/components/FutureFlowHeader";
import About from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <FutureFlowHeader />
    <main>
      <About />
    </main>
    <Footer />
  </div>
);

export default AboutPage;
