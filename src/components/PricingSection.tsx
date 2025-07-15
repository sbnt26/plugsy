import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Smartphone } from "lucide-react";
const PricingSection = () => {
  return <section id="pricing" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stejná cena za kWh. 
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            U všech stanic platíš oficiální cenu operátora (např. ČEZ, PRE, E.ON). Plugsy si účtuje malý poplatek podle zvoleného tarifu.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* AC Nabíjení */}
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                AC Nabíjení
              </CardTitle>
              <div className="text-4xl font-bold text-primary">≈ 8,4 Kč</div>
              <div className="text-muted-foreground">za kWh</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-6">
                Výkon do 22 kW
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Ideální pro delší parkování</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Šetrné k baterii</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Dostupné ve většině lokalit</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Plugsy poplatek:<br />
                    od 0 Kč/relaci
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* DC Rychlonabíjení */}
          <Card className="shadow-elegant border-primary border-2 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Nejpopulárnější
              </span>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                DC Rychlonabíjení
              </CardTitle>
              <div className="text-4xl font-bold text-primary">≈ 11,4 Kč</div>
              <div className="text-muted-foreground">za kWh</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-6">
                Výkon 50-150 kW
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Nabití za 20-45 minut</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Optimální rychlost</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Široká síť stanic</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Plugsy poplatek:<br />
                    od 0 Kč/relaci
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* DC Ultra rychlé */}
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                DC Ultra rychlé
              </CardTitle>
              <div className="text-4xl font-bold text-primary">≈ 14,6 Kč</div>
              <div className="text-muted-foreground">za kWh</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-6">
                Výkon nad 150 kW
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Nabíjení za 10–20 minut</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Nejnovější technologie</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Vhodné pro dálkové jízdy
                </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Plugsy poplatek:<br />
                    od 0 Kč/relaci
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="bg-background rounded-xl p-8 shadow-elegant">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Způsoby platby
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Mobilní aplikace
                </h4>
                <p className="text-muted-foreground">
                  Nejpohodlnější způsob platby přímo z telefonu
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">RFID karta</h4>
                <p className="text-muted-foreground">Bezkontaktní kartou přímo na stanici</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="large" size="lg">
              Začít nabíjet nyní
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;