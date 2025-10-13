import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, message, website } = body || {};

  if (website) return Response.json({ ok: true }, { status: 200 });

  if (!name || !email || !phone) {
    return Response.json({ ok: false, error: "Hiányzó kötelező mező." }, { status: 400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO;
  const FROM = process.env.CONTACT_FROM;

  if (!RESEND_API_KEY || !TO || !FROM) {
    return Response.json({ ok: false, error: "Hiányzó szerver beállítás." }, { status: 500 });
  }

  // Logo beolvasása a public mappából
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString("base64");

  const subject = `Új üzenet – ${name}`;
  
  // Preheader text - ez jelenik meg a tárgysor mellett mobilon
  const preheader = `${name} üzenetet küldött | ${email} | ${phone}`;
  
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
  
  <!-- Preheader text - rejtett, csak az értesítésben látszik -->
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" class="container card" style="max-width:600px;width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding:50px 40px 40px 40px;background:#ffffff;border-radius:12px 12px 0 0;border-bottom:4px solid #ff8c00;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td align="center">
                    <img src="cid:logo" alt="ReStart Physio Logo" class="logo" style="max-width:350px;width:100%;height:auto;display:block;border:0;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding:40px 40px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                
                <!-- Name Field -->
                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">NÉV</p>
                    <p class="text-primary" style="margin:0;font-size:16px;color:#1a1a1a;font-weight:500;">${escapeHtml(name)}</p>
                  </td>
                </tr>

                <!-- Spacer -->
                <tr><td style="height:16px;"></td></tr>

                <!-- Email Field -->
                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">E-MAIL CÍM</p>
                    <p class="text-primary" style="margin:0;font-size:16px;color:#1a1a1a;font-weight:500;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#004a6d;text-decoration:none;">${escapeHtml(email)}</a>
                    </p>
                  </td>
                </tr>

                <!-- Spacer -->
                <tr><td style="height:16px;"></td></tr>

                <!-- Phone Field -->
                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">TELEFONSZÁM</p>
                    <p class="text-primary" style="margin:0;font-size:16px;color:#1a1a1a;font-weight:500;">
                      <a href="tel:${escapeHtml(phone)}" style="color:#004a6d;text-decoration:none;">${escapeHtml(phone)}</a>
                    </p>
                  </td>
                </tr>

                <!-- Spacer -->
                <tr><td style="height:16px;"></td></tr>

                <!-- Message Field -->
                <tr>
                  <td class="field field-box" style="padding:20px;background-color:#f8f9fa;border-left:4px solid #ff8c00;border-radius:8px;">
                    <p style="margin:0 0 12px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">ÜZENET</p>
                    <p class="text-primary" style="margin:0;font-size:15px;line-height:1.6;color:#1a1a1a;word-wrap:break-word;">${escapeHtml(message || "Nincs üzenet megadva").replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>

                <!-- Spacer -->
                <tr><td style="height:24px;"></td></tr>

                <!-- Reply Button -->
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

          <!-- Footer -->
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
      attachments: [
        {
          filename: "logo.png",
          content: logoBase64,
          content_id: "logo",
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error("Resend HTTP error:", res.status, err);
    return Response.json({ ok: false, error: "Küldési hiba." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}

function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
