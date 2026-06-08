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

function buildWaitlistHtml(): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>You're on the ASTRIX AI waitlist</title></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="background:#0a0f1e;border:1px solid rgba(0,209,255,0.2);border-radius:32px;padding:48px;">

          <div style="width:80px;height:80px;background:#00D1FF;border-radius:50%;margin:0 auto 32px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:80px;font-size:36px;">&#10003;</div>

          <h1 style="color:#fff;font-size:32px;font-weight:900;margin:0 0 8px;text-align:center;">You're on the list.</h1>
          <p style="color:#00D1FF;font-size:11px;text-transform:uppercase;letter-spacing:4px;margin:0 0 32px;text-align:center;font-weight:700;">Free Waitlist Confirmed</p>

          <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 32px;text-align:center;">
            You'll be among the first to know when ASTRIX AI opens up. Stay tuned.
          </p>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;margin-bottom:32px;">
            <p style="color:#00D1FF;font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 20px;font-weight:900;">What happens next</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.5;">
                <span style="color:#00D1FF;font-weight:900;">1.</span> We'll email you when beta slots open
              </td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.5;">
                <span style="color:#00D1FF;font-weight:900;">2.</span> You get early access before the public
              </td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.5;">
                <span style="color:#00D1FF;font-weight:900;">3.</span> You can always upgrade to Founding Access later
              </td></tr>
            </table>
          </div>

          <div style="text-align:center;">
            <a href="https://astrixai.app/#pricing" style="display:inline-block;background:rgba(255,153,0,0.15);border:1px solid rgba(255,153,0,0.4);color:#FF9900;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:900;letter-spacing:1px;">
              Upgrade to Founding Access — $1 &rarr;
            </a>
          </div>

        </td></tr>
        <tr><td style="padding:32px 0;text-align:center;">
          <p style="color:rgba(255,255,255,0.15);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI &bull; Built for elite product teams</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildPaidHtml(tier: string): string {
  const isPartner = tier === "founder_call";
  const waLink = isPartner ? PARTNER_WA : FOUNDING_WA;
  const tierName = isPartner ? "Design Partner" : "Founding Access";
  const waLabel = isPartner ? "VVIP Partner" : "Exclusive Founding Member";
  const accentColor = "#FF9900";
  const badgeText = isPartner ? "VVIP Design Partner" : "Founding Member";
  const founderMsg = isPartner
    ? "You are a VVIP design partner! You'll shape this product with your experience and needs. Join the partner group below — this is where the real decisions happen."
    : "You are an exclusive founding member! Join the group below for all updates. This is where the founding community lives. You'll get first access to every module, every feature, every decision. Stay ahead of the curve.";

  const perks = isPartner
    ? ["1-on-1 Founder call to discuss your needs", "Custom feature requests — you drive the roadmap", "Direct Slack channel with the team", "VVIP Partner WhatsApp group access"]
    : ["Guaranteed first access to beta", "Founding member badge forever", "Lifetime 20% discount on all plans", "Exclusive WhatsApp group access"];

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Welcome to ASTRIX AI ${tierName}</title></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="background:#0a0f1e;border:1px solid rgba(255,153,0,0.3);border-radius:32px;padding:48px;">

          <div style="text-align:center;margin-bottom:32px;">
            <div style="display:inline-block;background:rgba(255,153,0,0.15);border:1px solid rgba(255,153,0,0.4);border-radius:50px;padding:8px 20px;color:${accentColor};font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:900;">${badgeText}</div>
          </div>

          <h1 style="color:#fff;font-size:30px;font-weight:900;margin:0 0 8px;text-align:center;">Welcome to the Inner Circle.</h1>
          <p style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:4px;margin:0 0 36px;text-align:center;">${tierName} Confirmed &bull; Payment Received</p>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;margin-bottom:28px;">
            <p style="color:${accentColor};font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 16px;font-weight:900;">Founder's Message</p>
            <p style="color:rgba(255,255,255,0.75);font-size:17px;line-height:1.7;margin:0;font-style:italic;">${founderMsg}</p>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;margin-bottom:32px;">
            <p style="color:#00D1FF;font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 20px;font-weight:900;">What you get</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${perks.map(p => `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.5;">
                <span style="color:#00D1FF;font-weight:900;margin-right:10px;">&#10003;</span>${p}
              </td></tr>`).join("")}
            </table>
          </div>

          <a href="${waLink}" style="display:block;background:#25D366;color:#fff;text-decoration:none;text-align:center;padding:22px;border-radius:24px;font-size:18px;font-weight:900;margin-bottom:20px;letter-spacing:0.5px;">
            &#128172; Join ${waLabel} WhatsApp Group &rarr;
          </a>

          <p style="color:rgba(255,255,255,0.2);font-size:12px;text-align:center;margin:0;">This group is exclusively for paid members only.</p>

        </td></tr>
        <tr><td style="padding:32px 0;text-align:center;">
          <p style="color:rgba(255,255,255,0.15);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI &bull; Built for elite product teams</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendEmail(to: string, subject: string, html: string): Promise<{ sent: boolean; id?: string; error?: string }> {
  if (!RESEND_API_KEY) {
    console.error("[send-email] RESEND_API_KEY not set");
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  const body = await res.json();

  if (!res.ok) {
    console.error("[send-email] Resend API error:", JSON.stringify(body));
    return { sent: false, error: body?.message ?? "Unknown Resend error" };
  }

  console.log("[send-email] Email sent:", body.id, "to:", to);
  return { sent: true, id: body.id };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, tier } = await req.json();

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
      html = buildWaitlistHtml();
    } else if (tier === "founder_call") {
      subject = "You're in. Welcome to ASTRIX AI Design Partner.";
      html = buildPaidHtml("founder_call");
    } else {
      subject = "You're in. Welcome to ASTRIX AI Founding Access.";
      html = buildPaidHtml("founding_access");
    }

    const result = await sendEmail(email, subject, html);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: result.sent ? 200 : 500,
    });
  } catch (error) {
    console.error("[send-email] Unhandled error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
