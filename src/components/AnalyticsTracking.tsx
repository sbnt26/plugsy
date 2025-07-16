import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const AnalyticsTracking = () => {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    if (!hasConsent('analytics')) return;

    // Google Analytics 4
    const gaScript = document.createElement('script');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    gaScript.async = true;
    document.head.appendChild(gaScript);

    // Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-XXXXXXXXX');
    `;
    document.head.appendChild(gtmScript);

    // Seznam.cz Analytics
    const seznamScript = document.createElement('script');
    seznamScript.innerHTML = `
      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true; j.src = 'https://www.seznam.cz/rs/' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'YOUR_SEZNAM_ID');
    `;
    document.head.appendChild(seznamScript);

    // Initialize GA4
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: 'Plugsy - Nabíjení elektromobilů',
      page_location: window.location.href,
      custom_map: {
        dimension1: 'user_type',
        dimension2: 'page_category'
      }
    });

    // Seznam.cz tracking
    gtag('config', 'YOUR_SEZNAM_ID');

    return () => {
      // Cleanup scripts on component unmount
      const scripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="gtag"], script[src*="seznam.cz"]');
      scripts.forEach(script => script.remove());
    };
  }, [hasConsent]);

  // Google Tag Manager (noscript)
  useEffect(() => {
    if (!hasConsent('analytics')) return;

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXXXX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);

    return () => {
      const noscripts = document.querySelectorAll('noscript');
      noscripts.forEach(ns => {
        if (ns.innerHTML.includes('googletagmanager')) {
          ns.remove();
        }
      });
    };
  }, [hasConsent]);

  return null;
};

export default AnalyticsTracking;