import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <About />
      <GoogleAd position="about-mid" />
    </main>
    <Footer />
  </div>
);

export default AboutPage;
