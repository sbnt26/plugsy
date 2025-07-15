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
            <h3 className="text-2xl font-bold text-foreground">Většina bodů v ČR</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Strategické umístění
                  </h4>
                  <p className="text-muted-foreground">
                    Naše stanice najdete u obchodních center, restaurací a na hlavních trasách
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Rychlé nabíjení
                  </h4>
                  <p className="text-muted-foreground">
                    Výkon až 150 kW pro maximální rychlost nabíjení vašeho vozu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Spolehlivost
                  </h4>
                  <p className="text-muted-foreground">
                    99,5% dostupnost stanic díky pravidelné údržbě a monitoringu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    24/7 podpora
                  </h4>
                  <p className="text-muted-foreground">
                    Nonstop technická podpora a zákaznický servis
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
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Nabíjecích stanic</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">1200+</div>
              <div className="text-muted-foreground">Nabíjecích bodů</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">150kW</div>
              <div className="text-muted-foreground">Maximální výkon</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <div className="text-muted-foreground">Dostupnost</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default NetworkSection;