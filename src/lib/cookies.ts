export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
}

export const defaultConsent: CookieConsent = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: Date.now(),
};

export const cookieUtils = {
  // Set cookie consent preferences
  setConsent: (consent: Partial<CookieConsent>) => {
    const fullConsent: CookieConsent = {
      ...defaultConsent,
      ...consent,
      necessary: true, // Always true
      timestamp: Date.now(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(fullConsent));
    return fullConsent;
  },

  // Get current cookie consent
  getConsent: (): CookieConsent | null => {
    try {
      const stored = localStorage.getItem('cookieConsent');
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  // Check if user has given consent for specific category
  hasConsent: (category: CookieCategory): boolean => {
    const consent = cookieUtils.getConsent();
    if (!consent) return false;
    return consent[category] === true;
  },

  // Accept all cookies
  acceptAll: (): CookieConsent => {
    return cookieUtils.setConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  },

  // Reject optional cookies (keep only necessary)
  rejectOptional: (): CookieConsent => {
    return cookieUtils.setConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  },

  // Clear all consent data
  clearConsent: () => {
    localStorage.removeItem('cookieConsent');
  },

  // Check if consent is expired (6 months)
  isConsentExpired: (): boolean => {
    const consent = cookieUtils.getConsent();
    if (!consent) return true;
    
    const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
    return consent.timestamp < sixMonthsAgo;
  },
};

// Analytics integration
export const analytics = {
  // Initialize Google Analytics if consent given
  initGA: (measurementId: string) => {
    if (!cookieUtils.hasConsent('analytics')) return;
    
    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize GA
    window.gtag = window.gtag || function() {
      (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      allow_analytics_storage: true,
    });
  },

  // Track event if analytics consent given
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (!cookieUtils.hasConsent('analytics') || !window.gtag) return;
    
    window.gtag('event', eventName, parameters);
  },

  // Track page view
  trackPageView: (page: string) => {
    analytics.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: page,
    });
  },
};

// Extend window type for gtag
declare global {
  interface Window {
    gtag: ((...args: any[]) => void) & {
      q?: any[];
    };
  }
}
