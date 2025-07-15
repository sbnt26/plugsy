import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { LogoProcessor } from "./LogoProcessor";

const originalLogo = "/lovable-uploads/441b7c15-4b66-4a21-965a-d59a13a821b1.png";

const Footer = () => {
  const [processedLogo, setProcessedLogo] = useState<string>(originalLogo);
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Company Info */}
          <div>
            <LogoProcessor 
              originalLogoUrl={originalLogo} 
              onProcessed={setProcessedLogo} 
            />
            <div 
              className="w-[800px] h-8 bg-primary mb-4" 
              style={{ 
                WebkitMask: `url(${processedLogo}) no-repeat left top/contain`,
                mask: `url(${processedLogo}) no-repeat left top/contain`
              }}
            />
            <p className="text-background/80 mb-4">
              Vedoucí poskytovatel služeb elektromobility v Česku. 
              Nabíjení pro všechny za stejnou cenu.
            </p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@plugeasy.cz</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+420 800 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Praha, Česká republika</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Služby</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#network" className="hover:text-background transition-colors">Síť stanic</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">Ceník</a></li>
              <li><a href="#app" className="hover:text-background transition-colors">Mobilní aplikace</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Mapa stanic</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Technická podpora</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Společnost</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#about" className="hover:text-background transition-colors">O nás</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Kariéra</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Tiskové zprávy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Partneři</a></li>
              <li><a href="#contact" className="hover:text-background transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Právní informace</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Obchodní podmínky</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Ochrana osobních údajů</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Ceník a tarify</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Reklamační řád</a></li>
              <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2025 PlugEasy s.r.o. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;