import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, CreditCard, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-charging-photo.jpg";
const HeroSection = () => {
  return <section className="bg-gradient-hero min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[35px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center px-[35px]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mt-8">
                Nabíjení pro<br /><span className="block mt-6">všechny</span>
                <span className="text-primary block mt-4">za stejnou cenu</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">1 aplikace, jedna karta, stejná cena. 
Jednoduché, transparentní a dostupné pro každého.
            </p>
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
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">24/7</p>
                  <p className="text-sm text-muted-foreground">Dostupnost</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Jedna cena</p>
                  <p className="text-sm text-muted-foreground">pro všechny</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
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
            <Card className="w-full max-w-md shadow-elegant">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Nezávazná poptávka
                    </h3>
                    <p className="text-sm text-muted-foreground">Napište nám o více informací</p>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Jméno a příjmení</Label>
                      <Input id="name" placeholder="Vaše jméno" className="border-border focus:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="vas@email.cz" className="border-border focus:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonní číslo</Label>
                      <Input id="phone" type="tel" placeholder="+420 123 456 789" className="border-border focus:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Lokalita</Label>
                      <Input id="location" placeholder="PSČ" className="border-border focus:ring-primary" />
                    </div>

                    <Button type="submit" className="w-full" variant="hero">
                      Odeslat poptávku
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16">
          <img src={heroImage} alt="Nabíjecí stanice" className="w-full h-64 md:h-96 object-cover rounded-xl shadow-elegant" />
        </div>
      </div>
    </section>;
};
export default HeroSection;