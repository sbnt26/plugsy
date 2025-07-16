import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log(`✅ Test health function called: ${req.method} ${new Date().toISOString()}`);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ 
    status: 'OK', 
    message: 'Edge function is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});