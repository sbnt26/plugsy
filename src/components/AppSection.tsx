import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, MapPin, CreditCard, BarChart3, Bell, Settings } from "lucide-react";
import iphoneMockup from "@/assets/iphone-mockup-plugsy.jpg";
const AppSection = () => {
  return <section id="app" className="py-20 bg-background" role="region" aria-labelledby="app-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="app-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">Celé Česko. Jedna aplikace.
        </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Najdi stanici, spusť nabíjení a plať bez přirážek – vše jednoduše v Plugsy app.
        </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="/lovable-uploads/7117454e-03c4-4c30-8374-62c7cdaa16ea.png" 
              alt="iPhone s aplikací Plugsy pro nabíjení elektromobilů - intuitivní rozhraní a mapa nabíjecích stanic" 
              title="Mobilní aplikace Plugsy - najděte a plaťte za nabíjení elektromobilů"
              className="w-full h-80 object-cover rounded-xl shadow-elegant" 
              loading="lazy"
              width="400"
              height="320"
            />
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Nabíjení pod palcem
          </h3>
            
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Mapa stanic
                  </h4>
                  <p className="text-muted-foreground">Najdeš stanice podle aktuální dostupnosti a výkonu.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Start přes QR nebo kartu
                </h4>
                  <p className="text-muted-foreground">Nabíjení zahájíš mobilem nebo RFID Plugsy kartou.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Snadné platby
                  </h4>
                  <p className="text-muted-foreground">
                    Automatické platby s přehledem všech transakcí
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1"> Statistiky a historie
                </h4>
                  <p className="text-muted-foreground">Přehled o úsporách, kWh i oblíbených stanicích.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1"> Chytré notifikace
                </h4>
                  <p className="text-muted-foreground">Upozornění na nabíjení, stav účtu, problémy.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Personalizace
                </h4>
                  <p className="text-muted-foreground">
                    Nastavte si nabíjení podle vašich potřeb a preferencí
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-16">
          <Card className="bg-gradient-primary p-8 text-center shadow-elegant">
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary-foreground">
                  Stáhněte si aplikaci zdarma
                </h3>
                <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                  Dostupná pro iOS i Android. Začněte nabíjet už dnes!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Smartphone className="w-5 h-5 mr-2" />
                  App Store
                </Button>
                <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Google Play
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default AppSection;