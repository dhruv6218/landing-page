import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "ASTRIX AI <noreply@astrixai.app>";

const FOUNDING_WA = "https://chat.whatsapp.com/IikC8WZERUn3VWtt0MFX4q";
const PARTNER_WA = "https://chat.whatsapp.com/HlnclUyto1JBHCCqWat4A8";

function getWaitlistHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0">
        <tr><td style="background:#0a0f1e;border:1px solid rgba(0,209,255,0.2);border-radius:32px;padding:48px;">
          <h1 style="color:#fff;font-size:28px;font-weight:900;margin:0 0 8px;">You're on the list.</h1>
          <p style="color:rgba(0,209,255,0.8);font-size:12px;text-transform:uppercase;letter-spacing:4px;margin:0 0 32px;">Free Waitlist Confirmed</p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;margin-bottom:32px;">
            <p style="color:rgba(0,209,255,1);font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 16px;font-weight:900;">What happens next</p>
            <p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.8;margin:0;">
              1. We'll email you when beta slots open<br/>
              2. You get early access before the public<br/>
              3. You can always upgrade to Founding Access later
            </p>
          </div>
          <p style="color:rgba(255,255,255,0.3);font-size:14px;text-align:center;margin:0;">Want instant access + exclusive community? <a href="https://astrixai.app/#pricing" style="color:#FF9900;text-decoration:none;font-weight:700;">Upgrade to Founding Access for $1</a></p>
        </td></tr>
        <tr><td style="padding:32px 0;text-align:center;">
          <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI. Built for elite product teams.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function getPaidHtml(tier: string): string {
  const isPartner = tier === "founder_call";
  const waLink = isPartner ? PARTNER_WA : FOUNDING_WA;
  const tierName = isPartner ? "Design Partner" : "Founding Access";
  const waLabel = isPartner ? "VVIP Partner" : "Exclusive Founding Member";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0">
        <tr><td style="background:#0a0f1e;border:1px solid rgba(255,153,0,0.3);border-radius:32px;padding:48px;">
          <h1 style="color:#fff;font-size:28px;font-weight:900;margin:0 0 8px;">Welcome to the Inner Circle.</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;letter-spacing:4px;margin:0 0 32px;">${tierName} Confirmed</p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;margin-bottom:32px;">
            <p style="color:rgba(255,153,0,1);font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 16px;font-weight:900;">Founder's Message</p>
            <p style="color:rgba(255,255,255,0.7);font-size:18px;line-height:1.6;margin:0;font-style:italic;">
              ${isPartner
                ? "You are a VVIP design partner! You'll shape this product with your experience and needs. Join the partner group below — this is where the real decisions happen."
                : "You are an exclusive founding member! Join the group below for all updates. This is where the founding community lives. You'll get first access to everything."
              }
            </p>
          </div>
          <a href="${waLink}" style="display:block;background:#25D366;color:#fff;text-decoration:none;text-align:center;padding:20px;border-radius:24px;font-size:20px;font-weight:900;margin-bottom:24px;">
            Join ${waLabel} WhatsApp Group &rarr;
          </a>
          <p style="color:rgba(255,255,255,0.3);font-size:13px;text-align:center;margin:0;">This group is exclusively for paid members only.</p>
        </td></tr>
        <tr><td style="padding:32px 0;text-align:center;">
          <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI. Built for elite product teams.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return { sent: false, error: "No API key" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return { sent: false, error: err };
  }

  const data = await res.json();
  console.log("Email sent:", data.id);
  return { sent: true };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { email, tier } = body;

    if (!email || !tier) {
      return new Response(JSON.stringify({ error: "Missing email or tier" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    let subject: string;
    let html: string;

    if (tier === "waitlist") {
      subject = "You're on the ASTRIX AI waitlist.";
      html = getWaitlistHtml();
    } else if (tier === "founder_call") {
      subject = "You're in. Welcome to ASTRIX AI Design Partner.";
      html = getPaidHtml("founder_call");
    } else {
      subject = "You're in. Welcome to ASTRIX AI Founding Access.";
      html = getPaidHtml("founding_access");
    }

    const result = await sendEmail(email, subject, html);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: result.sent ? 200 : 500,
    });
  } catch (error) {
    console.error("send-email error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
