// Plugsy.cz API konfigurace
// Napojeno na Plugsy Supabase projekt
const PLUGSY_API_URL = "https://uzrvewklanbxeuyifvip.supabase.co/functions/v1/export-inquiries";

// Zkontrolovat jestli je nastavená skutečná URL
const isPlugsyConfigured = !PLUGSY_API_URL.includes('dummy');

export interface PlugsyInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  created_at: string;
}

// Mapování z plugsy struktury na naši admin strukturu
export const mapPlugsyToAdmin = (plugsyData: PlugsyInquiry) => {
  return {
    customer_name: plugsyData.name,
    customer_phone: plugsyData.phone,
    customer_email: plugsyData.email || null,
    customer_address: plugsyData.location || null,
    customer_source: 'organic' as const, // plugsy data považujeme za organic
    form_type: 'poptavka' as const, // nebo určit podle nějakého kritéria
    status: 'new' as const,
    wants_rfid_card: false,
    wants_app_guidance: false,
    notes: null,
    referral_code: null,
    // Zachováváme originální plugsy ID pro reference
    _plugsy_original_id: plugsyData.id,
    _plugsy_created_at: plugsyData.created_at
  };
};

// Funkce pro načtení všech dat z plugsy přes API
export const fetchPlugsyInquiries = async (): Promise<PlugsyInquiry[]> => {
  if (!isPlugsyConfigured) {
    throw new Error('Plugsy.cz API není nakonfigurován. Doplňte API URL v src/integrations/plugsy/client.ts');
  }

  try {
    const response = await fetch(PLUGSY_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cnZld2tsYW5ieGV1eWlmdmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTc1NTksImV4cCI6MjA2ODE5MzU1OX0.bQ7GPUlS47E6HfhXa9jTV0wx72GNEYPasocwLxGPrYM',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cnZld2tsYW5ieGV1eWlmdmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTc1NTksImV4cCI6MjA2ODE5MzU1OX0.bQ7GPUlS47E6HfhXa9jTV0wx72GNEYPasocwLxGPrYM'
      },
    });

    if (!response.ok) {
      throw new Error(`API volání selhalo: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(`API chyba: ${result.error}`);
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching plugsy data:', error);
    throw error;
  }
};

// Pro API přístup nemusíme implementovat real-time subscription
// Místo toho můžeme periodicky kontrolovat nová data
export const subscribeToPlugsyChanges = (
  onInsert: (payload: PlugsyInquiry) => void,
  onUpdate?: (payload: PlugsyInquiry) => void
) => {
  if (!isPlugsyConfigured) {
    console.warn('Plugsy.cz API není nakonfigurován, real-time sync není k dispozici');
    return () => {}; // Prázdná cleanup funkce
  }

  // Pro API přístup implementujeme polling místo real-time
  console.log('Plugsy API: Real-time sync není podporován, použijte manuální synchronizaci');
  
  return () => {
    // Cleanup funkce (prázdná pro API přístup)
  };
};

// Helper funkce pro kontrolu konfigurace
export const isPlugsyAvailable = () => isPlugsyConfigured;