import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-background/95 backdrop-blur-sm border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Používání cookies</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tyto webové stránky používají soubory cookies k zajištění nejlepší možné uživatelské zkušenosti. 
                Cookies nám pomáhají analyzovat návštěvnost a vylepšovat naše služby. 
                Používáme pouze nezbytné cookies pro fungování webu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptCookies} className="flex-1 sm:flex-none">
                  Přijmout všechny
                </Button>
                <Button onClick={rejectCookies} variant="outline" className="flex-1 sm:flex-none">
                  Odmítnout volitelné
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={rejectCookies}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;