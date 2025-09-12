import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <About />
    </main>
    <Footer />
    
    {/* Popup Advertisement System */}
    <PopupManager page="about" />
  </div>
);

export default AboutPage;
