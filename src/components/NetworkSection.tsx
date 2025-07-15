import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Zap, Shield, Clock } from "lucide-react";
import networkImage from "@/assets/network-map.jpg";
const NetworkSection = () => {
  return <section id="network" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Jedna aplikace, stovky možností</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">Za stejnou cenu ve většině sítí napříč Českem.
        </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img src={networkImage} alt="Mapa nabíjecích stanic" className="w-full h-80 object-cover rounded-xl shadow-elegant" />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Většina veřejných bodů v ČR 
          </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Strategické pokrytí
                </h4>
                  <p className="text-muted-foreground">Dostupné v síti ČEZ, PRE, E.ON a dalších – města, nákupní centra, hlavní trasy.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Zap className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Efektivní nabíjení
                </h4>
                  <p className="text-muted-foreground">Podpora AC i DC – až 150 kW výkon pro nejrychlejší dobíjení dostupné na trhu.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Maximální dostupnost</h4>
                  <p className="text-muted-foreground">Síť se 99,5% spolehlivostí – Plugsy funguje, když to potřebuješ.
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">24/7 zákaznická podpora
                </h4>
                  <p className="text-muted-foreground">Pomůžeme kdykoliv – přímo v aplikaci nebo na lince podpory.
                </p>
                </div>
              </div>
            </div>

            <Button variant="large" className="mt-6">
              <MapPin className="w-5 h-5 mr-2" />
              Prohlédnout mapu stanic
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">15+ sítí
            </div>
              <div className="text-muted-foreground">Připojeno přes OCPI (ČEZ, PRE, E.ON..)</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">90 % pokrytí
            </div>
              <div className="text-muted-foreground">Veřejná síť v ČR bez roamingových přirážek
            </div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">8,4 Kč/kWh
            </div>
              <div className="text-muted-foreground">Reálná cena s Plugsy (napříč sítěmi)
            </div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">1 appka</div>
              <div className="text-muted-foreground">Všechno nabíjení na jednom místě
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default NetworkSection;