import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Leaf, Target } from "lucide-react";
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Naším cílem je zpřístupnit nabíjení všem lidem tak, aby bylo stejně jednoduché jako platba kartou.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Naším cílem je zjednodušit přechod na elektromobilitu a učinit z ní každodenní realitu pro miliony lidí.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Spokojených zákazníků</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">5</div>
                <div className="text-sm text-muted-foreground">Let na trhu</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Zelená energie</div>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-elegant">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Stanic do 2025</div>
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
                Věříme, že elektromobilita musí být dostupná všem bez rozdílu. 
                Proto nabízíme jednotné ceny bez skrytých poplatků.
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
                Všechna naše energie pochází z obnovitelných zdrojů. 
                Každé nabití přispívá k čistšímu prostředí.
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
                Investujeme do nejmodernějších technologií a poskytujeme 
                špičkový zákaznický servis 24/7.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default AboutSection;