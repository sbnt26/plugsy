import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PlugsyInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  created_at: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { plugsy_api_url } = await req.json();
    
    if (!plugsy_api_url) {
      return new Response(JSON.stringify({ 
        error: 'Missing plugsy_api_url parameter' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetching data from Plugsy API:', plugsy_api_url);

    // Načtení dat z plugsy.cz API
    const plugsyResponse = await fetch(plugsy_api_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!plugsyResponse.ok) {
      throw new Error(`Plugsy API error: ${plugsyResponse.status} ${plugsyResponse.statusText}`);
    }

    const plugsyResult = await plugsyResponse.json();
    
    if (plugsyResult.error) {
      throw new Error(`Plugsy API error: ${plugsyResult.error}`);
    }

    const plugsyData: PlugsyInquiry[] = plugsyResult.data || [];
    console.log(`Retrieved ${plugsyData.length} records from Plugsy`);

    if (plugsyData.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'No new data from Plugsy',
        synced: 0,
        skipped: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Kontrola již existujících záznamů podle _plugsy_original_id
    const existingIds = plugsyData.map(item => item.id);
    const { data: existingRecords } = await supabase
      .from('inquiries')
      .select('id, _plugsy_original_id')
      .in('_plugsy_original_id', existingIds);

    const existingPlugsyIds = new Set(
      (existingRecords || [])
        .filter(record => record._plugsy_original_id)
        .map(record => record._plugsy_original_id)
    );

    console.log(`Found ${existingPlugsyIds.size} existing records`);

    // Filtrování pouze nových záznamů
    const newRecords = plugsyData.filter(item => !existingPlugsyIds.has(item.id));
    
    if (newRecords.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'No new records to sync',
        synced: 0,
        skipped: plugsyData.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mapování na naši strukturu
    const mappedRecords = newRecords.map(plugsyItem => ({
      name: plugsyItem.name,
      email: plugsyItem.email,
      phone: plugsyItem.phone || null,
      location: plugsyItem.location || null,
      _plugsy_original_id: plugsyItem.id,
      _plugsy_created_at: plugsyItem.created_at,
    }));

    // Vložení nových záznamů
    const { data: insertedData, error: insertError } = await supabase
      .from('inquiries')
      .insert(mappedRecords)
      .select();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw insertError;
    }

    console.log(`Successfully synced ${insertedData?.length || 0} new records`);

    return new Response(JSON.stringify({ 
      message: 'Sync completed successfully',
      synced: insertedData?.length || 0,
      skipped: plugsyData.length - newRecords.length,
      total_processed: plugsyData.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in sync-plugsy-data function:', error);
    return new Response(JSON.stringify({ 
      error: 'Sync failed',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});