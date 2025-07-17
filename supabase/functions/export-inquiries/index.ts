import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log(`🚀 SIMPLE export-inquiries called: ${req.method} ${new Date().toISOString()}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ Returning CORS headers');
    return new Response(null, { headers: corsHeaders });
  }

  console.log('✅ Edge function is working!');
  
  return new Response(JSON.stringify({ 
    status: 'working',
    message: 'Edge function export-inquiries is responding!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});