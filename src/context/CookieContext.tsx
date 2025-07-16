import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CookieConsent, cookieUtils, analytics } from '@/lib/cookies';

interface CookieContextType {
  consent: CookieConsent | null;
  hasConsent: (category: string) => boolean;
  updateConsent: (newConsent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  showBanner: boolean;
  hideBanner: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
  gaId?: string; // Google Analytics ID
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ 
  children, 
  gaId = '' 
}) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const storedConsent = cookieUtils.getConsent();
    
    if (!storedConsent || cookieUtils.isConsentExpired()) {
      setShowBanner(true);
      setConsent(null);
    } else {
      setConsent(storedConsent);
      setShowBanner(false);
      
      // Initialize analytics if consent given
      if (storedConsent.analytics && gaId) {
        analytics.initGA(gaId);
      }
    }
  }, [gaId]);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = cookieUtils.setConsent(newConsent);
    setConsent(updatedConsent);
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize analytics if consent given
    if (updatedConsent.analytics && gaId) {
      analytics.initGA(gaId);
    }
  };

  const acceptAll = () => {
    const newConsent = cookieUtils.acceptAll();
    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
    
    if (gaId) {
      analytics.initGA(gaId);
    }
  };

  const rejectOptional = () => {
    const newConsent = cookieUtils.rejectOptional();
    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const hasConsent = (category: string) => {
    return cookieUtils.hasConsent(category as any);
  };

  const hideBanner = () => {
    setShowBanner(false);
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        hasConsent,
        updateConsent,
        acceptAll,
        rejectOptional,
        showBanner,
        hideBanner,
        showSettings,
        setShowSettings,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};