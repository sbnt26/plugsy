import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NetworkSection from "@/components/NetworkSection";
import PricingSection from "@/components/PricingSection";
import AppSection from "@/components/AppSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import SEOOptimizations from "@/components/SEOOptimizations";
import SocialMediaMeta from "@/components/SocialMediaMeta";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOOptimizations />
      <SocialMediaMeta />
      <Navigation />
      <main role="main">
        <HeroSection />
        <NetworkSection />
        <PricingSection />
        <AppSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
