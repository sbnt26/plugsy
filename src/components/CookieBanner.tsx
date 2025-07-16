import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCookieConsent } from "@/context/CookieContext";
import { useState } from "react";

const CookieBanner = () => {
  const { 
    showBanner, 
    acceptAll, 
    rejectOptional, 
    hideBanner,
    showSettings,
    setShowSettings,
    updateConsent,
    consent 
  } = useCookieConsent();
  
  const [localSettings, setLocalSettings] = useState({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    updateConsent({
      analytics: localSettings.analytics,
      marketing: localSettings.marketing,
      preferences: localSettings.preferences,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-background/95 backdrop-blur-sm border-border shadow-lg">
        {!showSettings ? (
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
                  <Button onClick={acceptAll} className="flex-1 sm:flex-none">
                    Přijmout všechny
                  </Button>
                  <Button onClick={rejectOptional} variant="outline" className="flex-1 sm:flex-none">
                    Odmítnout volitelné
                  </Button>
                  <Button 
                    onClick={() => setShowSettings(true)} 
                    variant="secondary" 
                    className="flex-1 sm:flex-none"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Nastavení
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={hideBanner}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Nastavení cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="necessary" className="text-sm font-medium">
                      Nezbytné cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Tyto cookies jsou nutné pro správné fungování webu.
                    </p>
                  </div>
                  <Switch id="necessary" checked={true} disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="analytics" className="text-sm font-medium">
                      Analytické cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Pomáhají nám porozumět tomu, jak návštěvníci používají web.
                    </p>
                  </div>
                  <Switch 
                    id="analytics" 
                    checked={localSettings.analytics}
                    onCheckedChange={(checked) => 
                      setLocalSettings(prev => ({ ...prev, analytics: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="marketing" className="text-sm font-medium">
                      Marketingové cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Používají se k zobrazování relevantních reklam.
                    </p>
                  </div>
                  <Switch 
                    id="marketing" 
                    checked={localSettings.marketing}
                    onCheckedChange={(checked) => 
                      setLocalSettings(prev => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="preferences" className="text-sm font-medium">
                      Preferenční cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Umožňují webu zapamatovat si vaše preference.
                    </p>
                  </div>
                  <Switch 
                    id="preferences" 
                    checked={localSettings.preferences}
                    onCheckedChange={(checked) => 
                      setLocalSettings(prev => ({ ...prev, preferences: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button onClick={handleSaveSettings} className="flex-1 sm:flex-none">
                  Uložit nastavení
                </Button>
                <Button onClick={acceptAll} variant="outline" className="flex-1 sm:flex-none">
                  Přijmout všechny
                </Button>
                <Button 
                  onClick={() => setShowSettings(false)} 
                  variant="ghost" 
                  className="flex-1 sm:flex-none"
                >
                  Zpět
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default CookieBanner;