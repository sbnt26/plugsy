import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
const ContactSection = () => {
  return <section id="contact" className="bg-background py-[40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kontaktujte nás
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Máte otázky? Rádi vám pomůžeme s čímkoli, co potřebujete vědět.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">
              Jak nás najdete
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Adresa
                  </h4>
                  <p className="text-muted-foreground">
                    U hradu 125/3<br />
                    110 00 Praha 1<br />
                    Česká republika
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Telefon
                  </h4>
                  <p className="text-muted-foreground">
                    +420 800 123 456<br />
                    <span className="text-sm">Bezplatná linka</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    E-mail
                  </h4>
                  <p className="text-muted-foreground">
                    info@plugsy.cz
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Otevírací doba
                  </h4>
                  <p className="text-muted-foreground">
                    Podpora: 24/7<br />
                    Kancelář: Po-Pá 8:00-17:00
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <Card className="bg-primary-light border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Nouzová pomoc
                </h4>
                <p className="text-muted-foreground mb-3">
                  Máte problém s nabíjením? Kontaktujte naši 24/7 technickou podporu:
                </p>
                <p className="font-semibold text-primary text-lg">+420 123 456 789</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Napište nám
              </h3>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ContactSection;