import { Button } from "@/components/ui/button";
import { MapPin, Clock, CreditCard, Smartphone } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";
const HeroSection = () => {
  return <section className="bg-gradient-hero min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[35px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center px-[35px]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mt-8">
                Nabíjej svobodně.<br /><span className="text-primary block mt-8">Plať férově.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">Jedna aplikace. Jedna karta. Stejná cena na všech sítích. Férové, jednoduché a připravené k použití během minut.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="large" size="lg" className="group">
                <Smartphone className="w-5 h-5 mr-2" />
                Stáhnout aplikaci
              </Button>
              <Button variant="outline" size="lg">
                <MapPin className="w-5 h-5 mr-2" />
                Najít nejbližší stanici
              </Button>
            </div>

            {/* Key features */}
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">24/7</p>
                  <p className="text-sm text-muted-foreground">Dostupnost</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-md">
                  <CreditCard className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fixní cena</p>
                  <p className="text-sm text-muted-foreground">za kWh</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Většina</p>
                  <p className="text-sm text-muted-foreground">stanic v ČR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:flex lg:justify-end">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nezávazná poptávka
                </h3>
                <p className="text-sm text-muted-foreground">Napište nám o více informací</p>
              </div>
              <InquiryForm />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16">
          <img src="/lovable-uploads/c7f8d90e-49e3-4331-a78d-186142011774.png" alt="Nabíjecí stanice" className="w-full h-64 md:h-96 object-cover rounded-xl shadow-elegant" />
        </div>
      </div>
    </section>;
};
export default HeroSection;