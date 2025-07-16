import { useEffect } from 'react';

const SEOOptimizations = () => {
  useEffect(() => {
    // Add breadcrumb structured data
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Domů",
          "item": "https://plugsy.cz"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Síť stanic",
          "item": "https://plugsy.cz/#network"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Ceny",
          "item": "https://plugsy.cz/#pricing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Aplikace",
          "item": "https://plugsy.cz/#app"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // Add FAQ structured data
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Jak funguje nabíjení s Plugsy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Plugsy je aplikace, která vám umožňuje najít nabíjecí stanici, spustit nabíjení a zaplatit za něj - vše na jednom místě. Stačí si stáhnout aplikaci, zaregistrovat se a můžete začít nabíjet na stovkách stanic po celé České republice."
          }
        },
        {
          "@type": "Question",
          "name": "Kolik stojí nabíjení s Plugsy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nabíjení s Plugsy má transparentní ceny bez skrytých poplatků. Platíte pouze za spotřebovanou energii podle aktuálního tarifu dané stanice. Aplikace je zdarma."
          }
        },
        {
          "@type": "Question",
          "name": "Kde najdu nabíjecí stanice Plugsy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nabíjecí stanice najdete po celé České republice - v Praze, Brně, Ostravě a dalších městech. Přesnou polohu a dostupnost stanic zobrazuje mapa v aplikaci Plugsy."
          }
        }
      ]
    });
    document.head.appendChild(faqScript);

    // Add service structured data
    const serviceScript = document.createElement('script');
    serviceScript.type = 'application/ld+json';
    serviceScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Nabíjení elektromobilů Plugsy",
      "description": "Služba pro nabíjení elektromobilů na rychlonabíjecích stanicích po celé České republice",
      "provider": {
        "@type": "Organization",
        "name": "Plugsy"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Czech Republic"
      },
      "serviceType": "Electric Vehicle Charging",
      "category": "Automotive",
      "availableLanguage": "cs"
    });
    document.head.appendChild(serviceScript);

    // Add local business structured data
    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Plugsy",
      "description": "Největší síť rychlonabíjecích stanic pro elektromobily v České republice",
      "url": "https://plugsy.cz",
      "telephone": "+420 XXX XXX XXX",
      "email": "info@plugsy.cz",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Náměstí Míru 1",
        "addressLocality": "Praha",
        "postalCode": "120 00",
        "addressCountry": "CZ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 50.0755,
        "longitude": 14.4378
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "paymentAccepted": "Credit Card, Debit Card, Mobile Payment"
    });
    document.head.appendChild(businessScript);

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};

export default SEOOptimizations;