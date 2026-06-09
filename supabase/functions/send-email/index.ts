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
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>You're on the ASTRIX AI waitlist</title></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="background:#0a0f1e;border:1px solid rgba(0,209,255,0.2);border-radius:32px;padding:48px;">
          <div style="width:80px;height:80px;background:#00D1FF;border-radius:50%;margin:0 auto 32px;text-align:center;line-height:80px;font-size:36px;">&#10003;</div>
          <h1 style="color:#fff;font-size:32px;font-weight:900;margin:0 0 8px;text-align:center;">You're on the list.</h1>
          <p style="color:#00D1FF;font-size:11px;text-transform:uppercase;letter-spacing:4px;margin:0 0 32px;text-align:center;font-weight:700;">Free Waitlist Confirmed</p>
          <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 32px;text-align:center;">You'll be among the first to know when ASTRIX AI opens up. Stay tuned.</p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:28px;margin-bottom:32px;">
            <p style="color:#00D1FF;font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 16px;font-weight:900;">What happens next</p>
            <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.8;margin:0;">1. We'll email you when beta slots open<br/>2. You get early access before the public<br/>3. You can always upgrade to Founding Access later</p>
          </div>
          <div style="text-align:center;"><a href="https://astrixai.app/#pricing" style="display:inline-block;background:rgba(255,153,0,0.15);border:1px solid rgba(255,153,0,0.4);color:#FF9900;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:900;">Upgrade to Founding Access — $1 &rarr;</a></div>
        </td></tr>
        <tr><td style="padding:32px 0;text-align:center;"><p style="color:rgba(255,255,255,0.15);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI &bull; Built for elite product teams</p></td></tr>
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
  const badge = isPartner ? "VVIP Design Partner" : "Founding Member";
  const msg = isPartner
    ? "You are a VVIP design partner! You'll shape this product with your experience and needs. Join the partner group below — this is where the real decisions happen."
    : "You are an exclusive founding member! Join the group below for all updates. This is where the founding community lives. You'll get first access to every module, every feature, every decision. Stay ahead of the curve.";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Welcome to ASTRIX AI ${tierName}</title></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="background:#0a0f1e;border:1px solid rgba(255,153,0,0.3);border-radius:32px;padding:48px;">
          <div style="text-align:center;margin-bottom:28px;"><div style="display:inline-block;background:rgba(255,153,0,0.15);border:1px solid rgba(255,153,0,0.4);border-radius:50px;padding:8px 20px;color:#FF9900;font-size:10px;text-transform:uppercase;letter-spacing:4px;font-weight:900;">${badge}</div></div>
          <h1 style="color:#fff;font-size:30px;font-weight:900;margin:0 0 8px;text-align:center;">Welcome to the Inner Circle.</h1>
          <p style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:4px;margin:0 0 32px;text-align:center;">${tierName} Confirmed</p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:28px;margin-bottom:28px;">
            <p style="color:#FF9900;font-size:10px;text-transform:uppercase;letter-spacing:4px;margin:0 0 14px;font-weight:900;">Founder's Message</p>
            <p style="color:rgba(255,255,255,0.75);font-size:17px;line-height:1.7;margin:0;font-style:italic;">${msg}</p>
          </div>
          <a href="${waLink}" style="display:block;background:#25D366;color:#fff;text-decoration:none;text-align:center;padding:20px;border-radius:24px;font-size:18px;font-weight:900;margin-bottom:16px;">&#128172; Join ${waLabel} WhatsApp Group &rarr;</a>
          <p style="color:rgba(255,255,255,0.2);font-size:12px;text-align:center;margin:0;">This group is exclusively for paid members only.</p>
        </td></tr>
        <tr><td style="padding:32px 0;text-align:center;"><p style="color:rgba(255,255,255,0.15);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI &bull; Built for elite product teams</p></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  console.log("[send-email] === Request received ===");

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Check API key first
    if (!RESEND_API_KEY) {
      console.error("[send-email] ERROR: RESEND_API_KEY is not set");
      return new Response(JSON.stringify({ sent: false, error: "RESEND_API_KEY not configured in edge function" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    console.log("[send-email] RESEND_API_KEY found, length:", RESEND_API_KEY.length);

    const body = await req.json();
    const { email, tier } = body;

    if (!email || !tier) {
      console.error("[send-email] Missing email or tier:", { email, tier });
      return new Response(JSON.stringify({ sent: false, error: "Missing email or tier" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    console.log("[send-email] Request:", { email, tier });

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

    console.log("[send-email] Sending email via Resend API...");
    console.log("[send-email] From:", FROM_EMAIL);
    console.log("[send-email] To:", email);
    console.log("[send-email] Subject:", subject);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: email, subject, html }),
    });

    const responseBody = await res.json();
    console.log("[send-email] Resend response status:", res.status);
    console.log("[send-email] Resend response body:", JSON.stringify(responseBody));

    if (!res.ok) {
      const errorMsg = responseBody?.message || responseBody?.error?.message || `Resend API error: ${res.status}`;
      console.error("[send-email] FAILED:", errorMsg);
      return new Response(JSON.stringify({ sent: false, error: errorMsg, details: responseBody }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("[send-email] SUCCESS! Email ID:", responseBody.id);
    return new Response(JSON.stringify({ sent: true, id: responseBody.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[send-email] UNHANDLED ERROR:", error.message);
    console.error("[send-email] Stack:", error.stack);
    return new Response(JSON.stringify({ sent: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
