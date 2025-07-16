import { useEffect } from 'react';

const SocialMediaMeta = () => {
  useEffect(() => {
    // Add additional social media meta tags
    const linkedinMeta = document.createElement('meta');
    linkedinMeta.name = 'linkedin:title';
    linkedinMeta.content = 'Plugsy - Nabíjení elektromobilů v ČR';
    document.head.appendChild(linkedinMeta);

    const linkedinDesc = document.createElement('meta');
    linkedinDesc.name = 'linkedin:description';
    linkedinDesc.content = 'Největší síť rychlonabíjecích stanic v České republice. Jedna aplikace, jedna cena.';
    document.head.appendChild(linkedinDesc);

    // Add additional Twitter meta tags
    const twitterSite = document.createElement('meta');
    twitterSite.name = 'twitter:site';
    twitterSite.content = '@plugsy_cz';
    document.head.appendChild(twitterSite);

    const twitterCreator = document.createElement('meta');
    twitterCreator.name = 'twitter:creator';
    twitterCreator.content = '@plugsy_cz';
    document.head.appendChild(twitterCreator);

    // Add WhatsApp meta tags
    const whatsappTitle = document.createElement('meta');
    whatsappTitle.setAttribute('property', 'og:title');
    whatsappTitle.setAttribute('content', 'Plugsy - Nabíjení elektromobilů v ČR');
    document.head.appendChild(whatsappTitle);

    // Add Telegram meta tags
    const telegramTitle = document.createElement('meta');
    telegramTitle.setAttribute('name', 'telegram:title');
    telegramTitle.setAttribute('content', 'Plugsy - Nabíjení elektromobilů v ČR');
    document.head.appendChild(telegramTitle);

    const telegramDesc = document.createElement('meta');
    telegramDesc.setAttribute('name', 'telegram:description');
    telegramDesc.setAttribute('content', 'Největší síť rychlonabíjecích stanic v České republice.');
    document.head.appendChild(telegramDesc);

    // Add Google+ meta tags (for legacy support)
    const googlePlusTitle = document.createElement('meta');
    googlePlusTitle.setAttribute('itemprop', 'name');
    googlePlusTitle.setAttribute('content', 'Plugsy - Nabíjení elektromobilů v ČR');
    document.head.appendChild(googlePlusTitle);

    const googlePlusDesc = document.createElement('meta');
    googlePlusDesc.setAttribute('itemprop', 'description');
    googlePlusDesc.setAttribute('content', 'Největší síť rychlonabíjecích stanic v České republice. Jedna aplikace, jedna cena.');
    document.head.appendChild(googlePlusDesc);

    const googlePlusImage = document.createElement('meta');
    googlePlusImage.setAttribute('itemprop', 'image');
    googlePlusImage.setAttribute('content', 'https://plugsy.cz/lovable-uploads/2e55e6f1-88b0-42bc-9fbc-87cd12e28a5d.png');
    document.head.appendChild(googlePlusImage);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(linkedinMeta);
      document.head.removeChild(linkedinDesc);
      document.head.removeChild(twitterSite);
      document.head.removeChild(twitterCreator);
      document.head.removeChild(whatsappTitle);
      document.head.removeChild(telegramTitle);
      document.head.removeChild(telegramDesc);
      document.head.removeChild(googlePlusTitle);
      document.head.removeChild(googlePlusDesc);
      document.head.removeChild(googlePlusImage);
    };
  }, []);

  return null;
};

export default SocialMediaMeta;