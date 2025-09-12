import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Contact />
    </main>
    <Footer />
    
    {/* Popup Advertisement System */}
    <PopupManager page="contact" />
  </div>
);

export default ContactPage;
