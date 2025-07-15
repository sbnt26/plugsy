import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NetworkSection from "@/components/NetworkSection";
import PricingSection from "@/components/PricingSection";
import AppSection from "@/components/AppSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <NetworkSection />
      <PricingSection />
      <AppSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
