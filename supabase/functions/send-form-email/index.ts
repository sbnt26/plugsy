
// Updated: Admin email styling fixed
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
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Resend API key:", resendApiKey ? "EXISTS" : "MISSING");
    const resend = new Resend(resendApiKey);

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
          from: "Plugsy <info@plugsy.cz>",
          to: [inquiryData.email],
          subject: "🔌 Děkujeme za váš zájem o nabíjecí stanice Plugsy",
          text: `
Plugsy - Budoucnost nabíjení elektromobilů

Děkujeme za váš zájem, ${inquiryData.name}! 🚗⚡

Právě jsme přijali váš dotaz ohledně Plugsy. Váš zájem o ekologickou budoucnost nás velmi těší!

SHRNUTÍ VAŠEHO DOTAZU:
- Jméno: ${inquiryData.name}
- Email: ${inquiryData.email}
${inquiryData.phone ? `- Telefon: ${inquiryData.phone}` : ''}
${inquiryData.location ? `- Lokalita: ${inquiryData.location}` : ''}

CO BUDE NÁSLEDOVAT?
Náš expert vás kontaktuje do 24 hodin a zodpoví vám každý dotaz.

Máte další dotazy? Neváhejte nás kontaktovat:
📧 info@plugsy.cz | 📱 +420 XXX XXX XXX

Díky, že jste si vybrali Plugsy! 🌱
Tým Plugsy
          `,
        });
        console.log("Confirmation email sent to user");
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Send notification email to admin
      try {
        await resend.emails.send({
          from: "Plugsy <info@plugsy.cz>",
          to: ["info@plugsy.cz"], // Replace with your admin email
          subject: `🚨 NOVÝ DOTAZ od ${inquiryData.name}`,
          text: `
NOVÝ DOTAZ - Plugsy Admin Panel

🚨 NOVÝ ZÁJEM O PLUGSY

PRIORITA: Kontaktovat do 24 hodin!

KONTAKTNÍ ÚDAJE ZÁKAZNÍKA:
- Jméno: ${inquiryData.name}
- Email: ${inquiryData.email}
${inquiryData.phone ? `- Telefon: ${inquiryData.phone}` : ''}
${inquiryData.location ? `- Lokalita: ${inquiryData.location}` : ''}

DOPORUČENÉ KROKY:
✓ Kontaktovat zákazníka do 24 hodin
✓ Připravit argumenty a prezentaci
✓ Popsat onboarding proces
✓ Zaslat další informace

RYCHLÉ AKCE:
- Email: ${inquiryData.email}
${inquiryData.phone ? `- Telefon: ${inquiryData.phone}` : ''}

Plugsy Admin Dashboard - ${new Date().toLocaleString('cs-CZ')}
Automatický email systém | Čas doručení: ${new Date().toLocaleString('cs-CZ')}
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
          from: "Plugsy <info@plugsy.cz>",
          to: [contactData.email],
          subject: "✅ Potvrzení přijetí vaší zprávy - Plugsy",
          text: `
Plugsy - Váš dotaz byl úspěšně přijat

Děkujeme za vaši zprávu, ${contactData.name}! ✉️

Vaše zpráva byla úspěšně doručena a zpracována!

Přijali jsme váš kontakt a náš tým se vám ozve co nejdříve s odpovědí na váš dotaz.

SHRNUTÍ VAŠÍ ZPRÁVY:

Předmět: ${contactData.subject}

Vaše zpráva:
${contactData.message}

Vaše kontaktní údaje:
- Jméno: ${contactData.name}
- Email: ${contactData.email}
${contactData.phone ? `- Telefon: ${contactData.phone}` : ''}

DOBA ODPOVĚDI:
Odpovíme vám obvykle do 24-48 hodin v pracovních dnech.

Potřebujete rychlejší odpověď?
📧 info@plugsy.cz | 📱 +420 XXX XXX XXX

Děkujeme za váš zájem o služby Plugsy! 🌱
Tým Plugsy
          `,
        });
        console.log("Confirmation email sent to user");
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Send notification email to admin
      try {
        await resend.emails.send({
          from: "Plugsy <info@plugsy.cz>",
          to: ["info@plugsy.cz"], // Replace with your admin email
          subject: `💬 NOVÁ ZPRÁVA - ${contactData.subject} od ${contactData.name}`,
          text: `
NOVÁ ZPRÁVA - Plugsy Admin Panel

ZPRÁVA Z KONTAKTNÍHO FORMULÁŘE

Doporučená doba odpovědi: do 24 hodin

ODESÍLATEL:
- Jméno: ${contactData.name}
- Email: ${contactData.email}
${contactData.phone ? `- Telefon: ${contactData.phone}` : ''}

PŘEDMĚT ZPRÁVY:
${contactData.subject}

OBSAH ZPRÁVY:
${contactData.message}

RYCHLÉ AKCE:
- Odpovědět na email: ${contactData.email}
${contactData.phone ? `- Zavolat: ${contactData.phone}` : ''}

Plugsy Admin Dashboard - ${new Date().toLocaleString('cs-CZ')}
ID zprávy: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
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