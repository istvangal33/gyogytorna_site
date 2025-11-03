import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // FormData feldolgozása
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const website = formData.get('website') as string;
    const documents = formData.getAll('documents') as File[];

    // Honeypot ellenőrzés
    if (website) return Response.json({ ok: true }, { status: 200 });

    // Kötelező mezők ellenőrzése
    if (!name || !email || !phone) {
      return Response.json({ ok: false, error: "Hiányzó kötelező mező." }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO;
    const FROM = process.env.CONTACT_FROM;

    if (!RESEND_API_KEY || !TO || !FROM) {
      return Response.json({ ok: false, error: "Hiányzó szerver beállítás." }, { status: 500 });
    }

    // Logo beolvasása (ha létezik)
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    let logoBase64: string | null = null;
    
    try {
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        logoBase64 = logoBuffer.toString("base64");
      }
    } catch {
      console.warn("Logo file not found or could not be read, continuing without logo");
    }

    // Fájlok feldolgozása emailhez
    const emailAttachments: Array<{
      filename: string;
      content: string;
      content_id?: string;
    }> = [];
    
    // Logo hozzáadása, ha sikerült beolvasni
    if (logoBase64) {
      emailAttachments.push({
        filename: "logo.png",
        content: logoBase64,
        content_id: "logo",
      });
    }

    // Feltöltött dokumentumok hozzáadása
    for (const file of documents) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Content = buffer.toString("base64");
        
        emailAttachments.push({
          filename: file.name,
          content: base64Content,
        });
      }
    }

    const subject = `Új üzenet – ${name}`;
    const preheader = `${name} üzenetet küldött | ${email} | ${phone}`;
    
    // Dokumentumok lista a HTML emailhez
    const documentsHtml = documents.length > 0 
      ? `
        <!-- Spacer -->
        <tr><td style="height:16px;"></td></tr>
        
        <!-- Attachments Field -->
        <tr>
          <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
            <p style="margin:0 0 12px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">CSATOLT DOKUMENTUMOK</p>
            <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;color:#1a1a1a;">
              ${documents.map(file => `<li>${escapeHtml(file.name)} (${formatFileSize(file.size)})</li>`).join('')}
            </ul>
          </td>
        </tr>
      `
      : '';

    const html = `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
      .logo { max-width: 280px !important; height: auto !important; }
      .field { padding: 16px !important; }
    }
    @media (prefers-color-scheme: dark) {
      .card { background-color: #1e1e1e !important; }
      .field-box { background-color: #2a2a2a !important; }
      .text-primary { color: #e0e0e0 !important; }
      .text-secondary { color: #b0b0b0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" class="container card" style="max-width:600px;width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="padding:50px 40px 40px 40px;background:#ffffff;border-radius:12px 12px 0 0;border-bottom:4px solid #ff8c00;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td align="center">
                    ${logoBase64 ? `<img src="cid:logo" alt="ReStart Physio Logo" class="logo" style="max-width:350px;width:100%;height:auto;display:block;border:0;">` : `<div style="padding:20px;"><h1 style="color:#004a6d;margin:0;font-size:2rem;">ReStart Physio</h1></div>`}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="content" style="padding:40px 40px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                
                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">NÉV</p>
                    <p class="text-primary" style="margin:0;font-size:16px;color:#1a1a1a;font-weight:500;">${escapeHtml(name)}</p>
                  </td>
                </tr>

                <tr><td style="height:16px;"></td></tr>

                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">E-MAIL CÍM</p>
                    <p class="text-primary" style="margin:0;font-size:16px;color:#1a1a1a;font-weight:500;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#004a6d;text-decoration:none;">${escapeHtml(email)}</a>
                    </p>
                  </td>
                </tr>

                <tr><td style="height:16px;"></td></tr>

                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">TELEFONSZÁM</p>
                    <p class="text-primary" style="margin:0;font-size:16px;color:#1a1a1a;font-weight:500;">
                      <a href="tel:${escapeHtml(phone)}" style="color:#004a6d;text-decoration:none;">${escapeHtml(phone)}</a>
                    </p>
                  </td>
                </tr>

                <tr><td style="height:16px;"></td></tr>

                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 12px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">ÜZENET</p>
                    <p class="text-primary" style="margin:0;font-size:15px;line-height:1.6;color:#1a1a1a;word-wrap:break-word;">${escapeHtml(message || "Nincs üzenet megadva").replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>

                ${documentsHtml}

                <tr><td style="height:24px;"></td></tr>

                <tr>
                  <td align="center">
                    <table role="presentation" style="border-collapse:collapse;">
                      <tr>
                        <td style="border-radius:8px;background:linear-gradient(135deg,#004a6d 0%,#003652 100%);">
                          <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:16px 40px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;border-radius:8px;">Válasz küldése</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 40px;background-color:#f8f9fa;border-radius:0 0 12px 12px;border-top:1px solid #e9ecef;">
              <p class="text-secondary" style="margin:0;font-size:13px;line-height:1.6;color:#999999;text-align:center;">
                Ez egy automatikus értesítés a weboldal kapcsolatfelvételi űrlapjából.<br>
                <strong style="color:#004a6d;">ReStart Physio</strong> • ${new Date().toLocaleDateString('hu-HU')}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        html,
        attachments: emailAttachments,
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "");
      console.error("Resend HTTP error:", res.status, err);
      return Response.json({ ok: false, error: "Küldési hiba." }, { status: 500 });
    }

    return Response.json({ ok: true }, { status: 200 });
    
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ 
      ok: false, 
      error: "Szerverhiba történt." 
    }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
