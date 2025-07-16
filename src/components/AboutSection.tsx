import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Leaf, Target, MapPin, Zap, Shield, Clock, Network, Coins, Smartphone } from "lucide-react";
const AboutSection = () => {
  return <section id="about" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">O Plugsy</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">První česká platforma, která sjednocuje veřejné nabíjení elektromobilů napříč sítěmi – bez roamingových přirážek, bez chaosu, s jedinou aplikací.
        </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Naše mise
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Věříme, že férové a jednoduché nabíjení má být dostupné pro každého.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Proto jsme vytvořili Plugsy: jednu appku, jednu kartu a jednu férovou cenu – ve většině veřejných sítí.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">Naším cílem je zjednodušit přechod na elektromobilitu a učinit z ní každodenní realitu pro všechny.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">5+ sítí</div>
                <div className="text-sm text-muted-foreground">Připojeno přes OCPI (ČEZ, PRE, E.ON..)</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">90 % pokrytí</div>
                <div className="text-sm text-muted-foreground">Veřejná síť v ČR bez roamingových přirážek</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">8,4 Kč/kWh</div>
                <div className="text-sm text-muted-foreground">Reálná cena s Plugsy (napříč sítěmi)</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">1 appka</div>
                <div className="text-sm text-muted-foreground">Všechno nabíjení na jednom místě</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Dostupnost
              </h4>
              <p className="text-muted-foreground">
                Chceme, aby nabíjení bylo jednoduché a dostupné pro každého.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Udržitelnost
              </h4>
              <p className="text-muted-foreground">
                Naším cílem je umožnit čistší mobilitu s minimálním dopadem a maximálním smyslem.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Kvalita
              </h4>
              <p className="text-muted-foreground">
                Podpora Plugsy je tu pro tebe 24/7 – bez výmluv a bez čekání.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default AboutSection;