import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log(`🚀 Export-inquiries function called: ${req.method} ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Simple health check
  if (req.url.includes('health')) {
    return new Response(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      function: 'export-inquiries'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Test endpoint bez token validace - jen pro testing
  if (req.url.includes('test')) {
    console.log('🧪 Test endpoint called');
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      return new Response(JSON.stringify({ 
        status: 'test_ok',
        data: data || [],
        count: data?.length || 0,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // Ověření API tokenu
  const authHeader = req.headers.get('authorization');
  const expectedToken = Deno.env.get('PLUGSY_API_TOKEN') || 'PLUGSY_API_2024_abc123def456';
  
  console.log('🔍 Auth header:', authHeader);
  console.log('🔍 Expected token from secret:', expectedToken);
  console.log('🔍 Secret exists:', !!expectedToken);
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const receivedToken = authHeader.split(' ')[1];
    console.log('🔍 Received token:', receivedToken);
    console.log('🔍 Token match:', receivedToken === expectedToken);
    console.log('🔍 Token lengths:', `received: ${receivedToken?.length}, expected: ${expectedToken?.length}`);
  }
  
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== expectedToken) {
    console.error('❌ Token validation failed');
    console.error('❌ Details:', {
      hasAuthHeader: !!authHeader,
      hasExpectedToken: !!expectedToken,
      authHeaderFormat: authHeader ? authHeader.substring(0, 30) + '...' : 'none',
      expectedTokenStart: expectedToken ? expectedToken.substring(0, 10) + '...' : 'none'
    });
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