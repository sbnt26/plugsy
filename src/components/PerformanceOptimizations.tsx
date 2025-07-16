import { useEffect } from 'react';

const PerformanceOptimizations = () => {
  useEffect(() => {
    // Add preload hints for critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/lovable-uploads/2e55e6f1-88b0-42bc-9fbc-87cd12e28a5d.png';
    preloadLink.as = 'image';
    document.head.appendChild(preloadLink);

    // Add DNS prefetch for external resources
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = '//fonts.googleapis.com';
    document.head.appendChild(dnsPrefetch);

    // Add viewport meta tag for mobile optimization
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    // Add theme-color meta tag
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = '#22c55e';
    document.head.appendChild(themeColorMeta);

    // Add apple-mobile-web-app meta tags
    const appleWebAppCapable = document.createElement('meta');
    appleWebAppCapable.name = 'apple-mobile-web-app-capable';
    appleWebAppCapable.content = 'yes';
    document.head.appendChild(appleWebAppCapable);

    const appleWebAppStatus = document.createElement('meta');
    appleWebAppStatus.name = 'apple-mobile-web-app-status-bar-style';
    appleWebAppStatus.content = 'black-translucent';
    document.head.appendChild(appleWebAppStatus);

    const appleWebAppTitle = document.createElement('meta');
    appleWebAppTitle.name = 'apple-mobile-web-app-title';
    appleWebAppTitle.content = 'Plugsy';
    document.head.appendChild(appleWebAppTitle);

    // Add format-detection meta tag
    const formatDetection = document.createElement('meta');
    formatDetection.name = 'format-detection';
    formatDetection.content = 'telephone=no';
    document.head.appendChild(formatDetection);

    // Add critical CSS for above-the-fold content
    const criticalCSS = document.createElement('style');
    criticalCSS.innerHTML = `
      .hero-section {
        font-display: swap;
        contain: layout style paint;
      }
      .nav-optimized {
        will-change: transform;
        backface-visibility: hidden;
      }
      .image-optimized {
        content-visibility: auto;
        contain-intrinsic-size: 1px 400px;
      }
    `;
    document.head.appendChild(criticalCSS);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(preloadLink);
      document.head.removeChild(dnsPrefetch);
      document.head.removeChild(themeColorMeta);
      document.head.removeChild(appleWebAppCapable);
      document.head.removeChild(appleWebAppStatus);
      document.head.removeChild(appleWebAppTitle);
      document.head.removeChild(formatDetection);
      document.head.removeChild(criticalCSS);
    };
  }, []);

  return null;
};

export default PerformanceOptimizations;