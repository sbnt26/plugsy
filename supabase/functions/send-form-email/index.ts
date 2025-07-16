
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

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

    // Initialize Resend client
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

      // Send confirmation email to user
      try {
        await resend.emails.send({
          from: "Plugsy <noreply@plugsy.cz>",
          to: [inquiryData.email],
          subject: "Děkujeme za váš zájem o nabíjecí stanice Plugsy",
          html: `
            <h2>Děkujeme za váš zájem, ${inquiryData.name}!</h2>
            <p>Přijali jsme váš dotaz ohledně nabíjecích stanic pro elektromobily.</p>
            <p><strong>Vaše údaje:</strong></p>
            <ul>
              <li>Jméno: ${inquiryData.name}</li>
              <li>Email: ${inquiryData.email}</li>
              ${inquiryData.phone ? `<li>Telefon: ${inquiryData.phone}</li>` : ''}
              ${inquiryData.location ? `<li>Lokalita: ${inquiryData.location}</li>` : ''}
            </ul>
            <p>Ozveme se vám co nejdříve s konkrétní nabídkou a informacemi o instalaci nabíjecích stanic.</p>
            <p>S pozdravem,<br>Tým Plugsy</p>
          `,
        });
        console.log("Confirmation email sent to user");
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Send notification email to admin
      try {
        await resend.emails.send({
          from: "Plugsy <noreply@plugsy.cz>",
          to: ["info@plugsy.cz"], // Replace with your admin email
          subject: `Nový dotaz na nabíjecí stanice od ${inquiryData.name}`,
          html: `
            <h2>Nový dotaz na nabíjecí stanice</h2>
            <p><strong>Kontaktní údaje:</strong></p>
            <ul>
              <li>Jméno: ${inquiryData.name}</li>
              <li>Email: ${inquiryData.email}</li>
              ${inquiryData.phone ? `<li>Telefon: ${inquiryData.phone}</li>` : ''}
              ${inquiryData.location ? `<li>Lokalita: ${inquiryData.location}</li>` : ''}
            </ul>
            <p>Obraťte se na tohoto zájemce co nejdříve.</p>
          `,
        });
        console.log("Admin notification email sent");
      } catch (emailError) {
        console.error("Error sending admin notification email:", emailError);
      }

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

      // Send confirmation email to user
      try {
        await resend.emails.send({
          from: "Plugsy <noreply@plugsy.cz>",
          to: [contactData.email],
          subject: "Potvrzení přijetí vaší zprávy - Plugsy",
          html: `
            <h2>Děkujeme za vaši zprávu, ${contactData.name}!</h2>
            <p>Přijali jsme váš kontakt a ozveme se vám co nejdříve.</p>
            <p><strong>Váš dotaz:</strong></p>
            <p><strong>Předmět:</strong> ${contactData.subject}</p>
            <p><strong>Zpráva:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>Vaše kontaktní údaje:</strong></p>
            <ul>
              <li>Jméno: ${contactData.name}</li>
              <li>Email: ${contactData.email}</li>
              ${contactData.phone ? `<li>Telefon: ${contactData.phone}</li>` : ''}
            </ul>
            <p>S pozdravem,<br>Tým Plugsy</p>
          `,
        });
        console.log("Confirmation email sent to user");
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Send notification email to admin
      try {
        await resend.emails.send({
          from: "Plugsy <noreply@plugsy.cz>",
          to: ["info@plugsy.cz"], // Replace with your admin email
          subject: `Nová zpráva z kontaktního formuláře od ${contactData.name}`,
          html: `
            <h2>Nová zpráva z kontaktního formuláře</h2>
            <p><strong>Od:</strong> ${contactData.name} (${contactData.email})</p>
            ${contactData.phone ? `<p><strong>Telefon:</strong> ${contactData.phone}</p>` : ''}
            <p><strong>Předmět:</strong> ${contactData.subject}</p>
            <p><strong>Zpráva:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            <p>Odpovězte na tento dotaz co nejdříve.</p>
          `,
        });
        console.log("Admin notification email sent");
      } catch (emailError) {
        console.error("Error sending admin notification email:", emailError);
      }
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