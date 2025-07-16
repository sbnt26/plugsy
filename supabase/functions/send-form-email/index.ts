import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

      // Send admin notification email
      const adminEmailResponse = await resend.emails.send({
        from: "Plugsy <noreply@plugsy.cz>",
        to: ["admin@plugsy.cz"], // Změňte na správný admin email
        subject: "Nová nezávazná poptávka - Plugsy",
        html: `
          <h2>Nová nezávazná poptávka</h2>
          <p><strong>Jméno:</strong> ${inquiryData.name}</p>
          <p><strong>Email:</strong> ${inquiryData.email}</p>
          <p><strong>Telefon:</strong> ${inquiryData.phone || "Neuvedeno"}</p>
          <p><strong>Lokalita:</strong> ${inquiryData.location || "Neuvedeno"}</p>
          <hr>
          <p>Tato zpráva byla odeslána z kontaktního formuláře na Plugsy.cz</p>
        `,
      });

      // Send confirmation email to user
      const userEmailResponse = await resend.emails.send({
        from: "Plugsy <noreply@plugsy.cz>",
        to: [inquiryData.email],
        subject: "Potvrzení přijetí vaší poptávky - Plugsy",
        html: `
          <h2>Děkujeme za vaši poptávku!</h2>
          <p>Vážený/á ${inquiryData.name},</p>
          <p>Obdrželi jsme vaši nezávaznou poptávku a do 24 hodin se vám ozveme s nabídkou.</p>
          <p>Vaše údaje:</p>
          <ul>
            <li><strong>Jméno:</strong> ${inquiryData.name}</li>
            <li><strong>Email:</strong> ${inquiryData.email}</li>
            <li><strong>Telefon:</strong> ${inquiryData.phone || "Neuvedeno"}</li>
            <li><strong>Lokalita:</strong> ${inquiryData.location || "Neuvedeno"}</li>
          </ul>
          <hr>
          <p>S pozdravem,<br>Tým Plugsy</p>
        `,
      });

      console.log("Emails sent:", { adminEmailResponse, userEmailResponse });

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

      // Send admin notification email
      const adminEmailResponse = await resend.emails.send({
        from: "Plugsy <noreply@plugsy.cz>",
        to: ["admin@plugsy.cz"], // Změňte na správný admin email
        subject: `Nová zpráva: ${contactData.subject} - Plugsy`,
        html: `
          <h2>Nová zpráva z kontaktního formuláře</h2>
          <p><strong>Jméno:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Telefon:</strong> ${contactData.phone || "Neuvedeno"}</p>
          <p><strong>Předmět:</strong> ${contactData.subject}</p>
          <p><strong>Zpráva:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #007cba;">
            ${contactData.message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p>Odpovězte přímo na email: ${contactData.email}</p>
        `,
      });

      // Send confirmation email to user
      const userEmailResponse = await resend.emails.send({
        from: "Plugsy <noreply@plugsy.cz>",
        to: [contactData.email],
        subject: "Potvrzení přijetí vaší zprávy - Plugsy",
        html: `
          <h2>Děkujeme za vaši zprávu!</h2>
          <p>Vážený/á ${contactData.name},</p>
          <p>Obdrželi jsme vaši zprávu s předmětem "${contactData.subject}" a do 24 hodin vám odpovíme.</p>
          <p>Vaše zpráva:</p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #007cba;">
            ${contactData.message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p>S pozdravem,<br>Tým Plugsy</p>
        `,
      });

      console.log("Emails sent:", { adminEmailResponse, userEmailResponse });
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