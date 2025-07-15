import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LogoProcessor } from "./LogoProcessor";

const originalLogo = "/lovable-uploads/441b7c15-4b66-4a21-965a-d59a13a821b1.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [processedLogo, setProcessedLogo] = useState<string>(originalLogo);

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <LogoProcessor 
              originalLogoUrl={originalLogo} 
              onProcessed={setProcessedLogo} 
            />
            <img src={processedLogo} alt="PlugEasy Logo" className="w-24 h-24" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#network" className="text-foreground hover:text-primary transition-colors">
              Síť stanic
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Ceny
            </a>
            <a href="#app" className="text-foreground hover:text-primary transition-colors">
              Mobilní aplikace
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              O nás
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Kontakt
            </a>
            <Button variant="hero" size="sm">
              Stáhnout aplikaci
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a
                href="#network"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Síť stanic
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ceny
              </a>
              <a
                href="#app"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mobilní aplikace
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                O nás
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </a>
              <div className="px-3 py-2">
                <Button variant="hero" size="sm" className="w-full">
                  Stáhnout aplikaci
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;