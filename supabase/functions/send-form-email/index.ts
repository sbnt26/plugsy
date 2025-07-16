
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
          html: `
            <!DOCTYPE html>
            <html lang="cs">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
              <title>Plugsy - Potvrzení zájmu</title>
            </head>
            <body style="font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
              <div style="background: linear-gradient(135deg, hsl(135, 76%, 65%), hsl(135, 76%, 75%)); padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
                <img src="https://lov-elz-8uq.lovableproject.com/lovable-uploads/0c597499-3242-4920-8644-dad091cfc410.png" alt="Plugsy" style="height: 60px; width: auto;" />
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: hsl(135, 76%, 65%); margin-top: 0; font-size: 24px;">Děkujeme za váš zájem, ${inquiryData.name}! 🚗⚡</h2>
                
                <p style="font-size: 16px; margin: 20px 0;">Právě jsme přijali váš dotaz ohledně Plugsy. Váš zájem o ekologickou budoucnost nás velmi těší!</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid hsl(135, 76%, 65%); margin: 25px 0;">
                  <h3 style="color: hsl(135, 76%, 65%); margin-top: 0; font-size: 18px;">📋 Shrnutí vašeho dotazu:</h3>
                  <ul style="list-style: none; padding: 0; margin: 15px 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>👤 Jméno:</strong> ${inquiryData.name}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>📧 Email:</strong> ${inquiryData.email}</li>
                    ${inquiryData.phone ? `<li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;"><strong>📱 Telefon:</strong> ${inquiryData.phone}</li>` : ''}
                    ${inquiryData.location ? `<li style="padding: 8px 0;"><strong>📍 Lokalita:</strong> ${inquiryData.location}</li>` : ''}
                  </ul>
                </div>
                
                <div style="background: linear-gradient(135deg, hsl(135, 76%, 65%), hsl(135, 76%, 55%)); padding: 20px; border-radius: 8px; color: white; margin: 25px 0; text-align: center;">
                  <h3 style="margin: 0 0 10px 0; font-size: 18px;">⏰ Co bude následovat?</h3>
                  <p style="margin: 0; font-size: 15px;">Náš expert vás kontaktuje do <strong>24 hodin</strong>a zodpoví vám každý dotaz.</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p style="font-size: 14px; color: #6c757d; margin: 0;">Máte další dotazy? Neváhejte nás kontaktovat:</p>
                  <p style="font-size: 16px; margin: 10px 0;"><strong>📧 info@plugsy.cz</strong> | <strong>📱 +420 XXX XXX XXX</strong></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6c757d; font-size: 14px;">
                <p style="margin: 0;">Díky, že jste si vybrali Plugsy! 🌱</p>
                <p style="margin: 10px 0 0 0;"><strong>Tým Plugsy</strong></p>
              </div>
            </body>
            </html>
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

NOVÝ ZÁJEM O PLUGSY

PRIORITA: Kontaktovat do 24 hodin!

KONTAKTNÍ ÚDAJE ZÁKAZNÍKA:
- Jméno: ${inquiryData.name}
- Email: ${inquiryData.email}
${inquiryData.phone ? `- Telefon: ${inquiryData.phone}` : ''}
${inquiryData.location ? `- Lokalita: ${inquiryData.location}` : ''}

DOPORUČENÉ KROKY:
- Kontaktovat zákazníka do 24 hodin
- Připravit argumenty
- Popsat onboarding

Plugsy Admin Dashboard - ${new Date().toLocaleString('cs-CZ')}
          `,
          html: `
            <!DOCTYPE html>
            <html lang="cs">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
              <title>Nový dotaz - Plugsy Admin</title>
            </head>
            <body style="font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #2c3e50;">
              <div style="background: linear-gradient(135deg, hsl(135, 76%, 55%), hsl(135, 76%, 45%)); padding: 25px; border-radius: 10px; margin-bottom: 25px; text-align: center;">
                <img src="https://lov-elz-8uq.lovableproject.com/lovable-uploads/0c597499-3242-4920-8644-dad091cfc410.png" alt="Plugsy" style="height: 50px; width: auto; filter: brightness(0) invert(1);" />
                <p style="color: white; margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">🚨 NOVÝ DOTAZ - Admin Panel</p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: hsl(135, 76%, 55%); margin-top: 0; font-size: 22px;">⚡ Nový zájem o Plugsy</h2>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404; font-weight: bold;">⏰ PRIORITA: Kontaktovat do 24 hodin!</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid hsl(135, 76%, 55%); margin: 20px 0;">
                  <h3 style="color: hsl(135, 76%, 55%); margin-top: 0; font-size: 18px;">👤 Kontaktní údaje zákazníka:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold; width: 30%;">Jméno:</td>
                      <td style="padding: 10px;">${inquiryData.name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold;">Email:</td>
                      <td style="padding: 10px;"><a href="mailto:${inquiryData.email}" style="color: hsl(135, 76%, 65%); text-decoration: none;">${inquiryData.email}</a></td>
                    </tr>
                    ${inquiryData.phone ? `
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold;">Telefon:</td>
                      <td style="padding: 10px;"><a href="tel:${inquiryData.phone}" style="color: hsl(135, 76%, 65%); text-decoration: none;">${inquiryData.phone}</a></td>
                    </tr>
                    ` : ''}
                    ${inquiryData.location ? `
                    <tr>
                      <td style="padding: 10px; font-weight: bold;">Lokalita:</td>
                      <td style="padding: 10px;">${inquiryData.location}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>
                
                <div style="background: linear-gradient(135deg, hsl(135, 76%, 65%), hsl(135, 76%, 55%)); padding: 20px; border-radius: 8px; color: white; text-align: center; margin: 25px 0;">
                  <h3 style="margin: 0 0 10px 0; font-size: 18px;">📋 Doporučené kroky:</h3>
                  <ul style="text-align: left; margin: 15px 0; padding-left: 20px;">
                    <li style="margin: 8px 0;">Kontaktovat zákazníka do 24 hodin</li>
                    <li style="margin: 8px 0;">Připravit argumenty</li>
                    <li style="margin: 8px 0;">Popsat onboarding</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                  <a href="mailto:${inquiryData.email}" style="background: hsl(135, 76%, 65%); color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 5px;">📧 Odpovědět emailem</a>
                  ${inquiryData.phone ? `<a href="tel:${inquiryData.phone}" style="background: hsl(135, 76%, 55%); color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 5px;">📱 Zavolat</a>` : ''}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 25px; padding: 15px; color: #6c757d; font-size: 12px;">
                <p style="margin: 0;">Plugsy Admin Dashboard - ${new Date().toLocaleString('cs-CZ')}</p>
              </div>
            </body>
            </html>
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
          html: `
            <!DOCTYPE html>
            <html lang="cs">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
              <title>Plugsy - Potvrzení zprávy</title>
            </head>
            <body style="font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
              <div style="background: linear-gradient(135deg, hsl(135, 76%, 65%), hsl(135, 76%, 75%)); padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
                <img src="https://lov-elz-8uq.lovableproject.com/lovable-uploads/0c597499-3242-4920-8644-dad091cfc410.png" alt="Plugsy" style="height: 60px; width: auto;" />
                <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 16px;">✅ Váš dotaz byl úspěšně přijat</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: hsl(135, 76%, 65%); margin-top: 0; font-size: 24px;">Děkujeme za vaši zprávu, ${contactData.name}! ✉️</h2>
                
                <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #0c5460; font-weight: bold;">✅ Vaše zpráva byla úspěšně doručena a zpracována!</p>
                </div>
                
                <p style="font-size: 16px; margin: 20px 0;">Přijali jsme váš kontakt a náš tým se vám ozve co nejdříve s odpovědí na váš dotaz.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid hsl(135, 76%, 65%); margin: 25px 0;">
                  <h3 style="color: hsl(135, 76%, 65%); margin-top: 0; font-size: 18px;">📋 Shrnutí vaší zprávy:</h3>
                  
                  <div style="margin: 15px 0;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #495057;">📝 Předmět:</p>
                    <p style="margin: 0 0 15px 0; padding: 10px; background: white; border-radius: 5px; border: 1px solid #dee2e6;">${contactData.subject}</p>
                    
                    <p style="margin: 15px 0 5px 0; font-weight: bold; color: #495057;">💬 Vaše zpráva:</p>
                    <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #dee2e6; white-space: pre-wrap;">${contactData.message}</div>
                  </div>
                  
                  <div style="margin: 20px 0 0 0;">
                    <h4 style="color: hsl(135, 76%, 65%); margin: 0 0 10px 0; font-size: 16px;">👤 Vaše kontaktní údaje:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                      <li style="padding: 5px 0; border-bottom: 1px solid #e9ecef;"><strong>Jméno:</strong> ${contactData.name}</li>
                      <li style="padding: 5px 0; border-bottom: 1px solid #e9ecef;"><strong>Email:</strong> ${contactData.email}</li>
                      ${contactData.phone ? `<li style="padding: 5px 0;"><strong>Telefon:</strong> ${contactData.phone}</li>` : ''}
                    </ul>
                  </div>
                </div>
                
                <div style="background: linear-gradient(135deg, hsl(135, 76%, 65%), hsl(135, 76%, 55%)); padding: 20px; border-radius: 8px; color: white; margin: 25px 0; text-align: center;">
                  <h3 style="margin: 0 0 10px 0; font-size: 18px;">⏰ Doba odpovědi</h3>
                  <p style="margin: 0; font-size: 15px;">Odpovíme vám obvykle do <strong>24-48 hodin</strong> v pracovních dnech.</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p style="font-size: 14px; color: #6c757d; margin: 0;">Potřebujete rychlejší odpověď?</p>
                  <p style="font-size: 16px; margin: 10px 0;"><strong>📧 info@plugsy.cz</strong> | <strong>📱 +420 XXX XXX XXX</strong></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6c757d; font-size: 14px;">
                <p style="margin: 0;">Děkujeme za váš zájem o služby Plugsy! 🌱</p>
                <p style="margin: 10px 0 0 0;"><strong>Tým Plugsy</strong></p>
              </div>
            </body>
            </html>
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

Plugsy Admin Dashboard - ${new Date().toLocaleString('cs-CZ')}
ID zprávy: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
          `,
          html: `
            <!DOCTYPE html>
            <html lang="cs">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
              <title>Nová zpráva - Plugsy Admin</title>
            </head>
            <body style="font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #2c3e50;">
              <div style="background: linear-gradient(135deg, hsl(135, 76%, 55%), hsl(135, 76%, 45%)); padding: 25px; border-radius: 10px; margin-bottom: 25px; text-align: center;">
                <img src="https://lov-elz-8uq.lovableproject.com/lovable-uploads/0c597499-3242-4920-8644-dad091cfc410.png" alt="Plugsy" style="height: 50px; width: auto; filter: brightness(0) invert(1);" />
                <p style="color: white; margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">💬 NOVÁ ZPRÁVA - Kontaktní formulář</p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: hsl(135, 76%, 55%); margin-top: 0; font-size: 22px;">📨 Zpráva z kontaktního formuláře</h2>
                
                <div style="background: #e2e3f1; border: 1px solid #d1d5db; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #374151; font-weight: bold;">⏰ Doporučená doba odpovědi: do 24 hodin</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid hsl(135, 76%, 55%); margin: 20px 0;">
                  <h3 style="color: hsl(135, 76%, 55%); margin-top: 0; font-size: 18px;">👤 Odesílatel:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold; width: 25%;">Jméno:</td>
                      <td style="padding: 10px;">${contactData.name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold;">Email:</td>
                      <td style="padding: 10px;"><a href="mailto:${contactData.email}" style="color: hsl(135, 76%, 65%); text-decoration: none;">${contactData.email}</a></td>
                    </tr>
                    ${contactData.phone ? `
                    <tr>
                      <td style="padding: 10px; font-weight: bold;">Telefon:</td>
                      <td style="padding: 10px;"><a href="tel:${contactData.phone}" style="color: hsl(135, 76%, 65%); text-decoration: none;">${contactData.phone}</a></td>
                    </tr>
                    ` : ''}
                  </table>
                </div>
                
                <div style="margin: 25px 0;">
                  <h3 style="color: hsl(135, 76%, 55%); margin: 0 0 15px 0; font-size: 18px;">📝 Předmět zprávy:</h3>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; font-weight: bold; font-size: 16px;">${contactData.subject}</div>
                </div>
                
                <div style="margin: 25px 0;">
                  <h3 style="color: hsl(135, 76%, 55%); margin: 0 0 15px 0; font-size: 18px;">💬 Obsah zprávy:</h3>
                  <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e9ecef; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${contactData.message}</div>
                </div>
                
                <div style="background: linear-gradient(135deg, hsl(135, 76%, 65%), hsl(135, 76%, 55%)); padding: 20px; border-radius: 8px; color: white; text-align: center; margin: 25px 0;">
                  <h3 style="margin: 0 0 15px 0; font-size: 18px;">🎯 Rychlé akce:</h3>
                  <div>
                    <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}&body=Dobrý den ${contactData.name},%0D%0A%0D%0ADěkujeme za váš dotaz..." style="background: rgba(255,255,255,0.2); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 5px; border: 1px solid rgba(255,255,255,0.3);">📧 Odpovědět</a>
                    ${contactData.phone ? `<a href="tel:${contactData.phone}" style="background: rgba(255,255,255,0.2); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 5px; border: 1px solid rgba(255,255,255,0.3);">📱 Zavolat</a>` : ''}
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 25px; padding: 15px; color: #6c757d; font-size: 12px;">
                <p style="margin: 0;">Plugsy Admin Dashboard - ${new Date().toLocaleString('cs-CZ')}</p>
                <p style="margin: 5px 0 0 0;">ID zprávy: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </body>
            </html>
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