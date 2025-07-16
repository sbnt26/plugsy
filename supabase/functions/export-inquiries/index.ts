import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Ověření API tokenu
  const authHeader = req.headers.get('authorization');
  const expectedToken = Deno.env.get('PLUGSY_API_TOKEN');
  
  console.log('🔍 Auth header:', authHeader ? 'Přítomen' : 'Chybí');
  console.log('🔍 Expected token:', expectedToken ? 'Nastaven' : 'Chybí v secrets');
  
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== expectedToken) {
    console.error('❌ Token validation failed');
    return new Response(JSON.stringify({ 
      error: 'Neplatný nebo chybějící API token',
      debug: {
        hasAuthHeader: !!authHeader,
        hasExpectedToken: !!expectedToken,
        authHeaderFormat: authHeader ? authHeader.substring(0, 20) + '...' : 'none'
      }
    }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Načtení dat z inquiries tabulky
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ 
        error: 'Nepodařilo se načíst data z databáze',
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Export successful: ${data?.length || 0} records`);

    return new Response(JSON.stringify({ 
      data: data || [],
      count: data?.length || 0,
      exported_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in export-inquiries function:', error);
    return new Response(JSON.stringify({ 
      error: 'Interní chyba serveru',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});