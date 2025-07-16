
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    console.log(`Processing ${type} form submission`, data);

    if (type === "inquiry") {
      const inquiryData: InquiryRequest = data;
      
      // Save to database
      const { error: dbError } = await supabase
        .from("inquiries")
        .insert({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          location: inquiryData.location,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Chyba při ukládání do databáze");
      }

      console.log("Inquiry saved successfully to database");

    } else if (type === "contact") {
      const contactData: ContactRequest = data;
      
      // Save to database
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Chyba při ukládání do databáze");
      }

      console.log("Contact message saved successfully to database");
    } else {
      throw new Error("Neplatný typ formuláře");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Formulář byl úspěšně odeslán" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-form-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Došlo k chybě při odesílání formuláře" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);