import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "Dhruv from ASTRIX AI <dhruv@astrixai.app>";
const REPLY_TO = "dhruv@astrixai.app";
const FOUNDING_WA = "https://chat.whatsapp.com/IikC8WZERUn3VWtt0MFX4q";
const PARTNER_WA = "https://chat.whatsapp.com/HlnclUyto1JBHCCqWat4A8";

function buildWaitlistText(email: string): string {
  return `Hey,

Thanks for joining the ASTRIX AI waitlist. You're in.

You'll be among the first to know when we open beta slots.

What happens next:
1. I'll email you personally when access opens
2. You get early access before the public
3. You can upgrade to Founding Access ($1) any time

Want to jump the queue? Grab Founding Access here: https://astrixai.app/#pricing

— Dhruv
Founder, ASTRIX AI

P.S. Just reply to this email if you have any questions.`;
}

function buildPaidText(tier: string): string {
  const isPartner = tier === "founder_call";
  const waLink = isPartner ? PARTNER_WA : FOUNDING_WA;

  if (isPartner) {
    return `Hey,

You're a VVIP Design Partner. Payment confirmed.

This is the real deal — you'll directly shape ASTRIX AI with your experience and needs.

Join the VVIP Partner WhatsApp group: ${waLink}

This group is exclusively for paid design partners. All product decisions happen here.

Your perks:
- 1-on-1 Founder call to discuss your needs
- Custom feature requests — you drive the roadmap
- Direct Slack channel with the team
- VVIP Partner WhatsApp group access

Just reply to this email to schedule your 1-on-1 call.

— Dhruv
Founder, ASTRIX AI`;
  }

  return `Hey,

You're a Founding Member. Payment confirmed.

You'll get first access to everything — before anyone else.

Join the Exclusive Founding Members WhatsApp group: ${waLink}

This group is exclusively for paid founding members. You'll get first access to every module, every feature, every decision.

Your perks:
- Guaranteed first access to beta
- Founding member badge forever
- Lifetime 20% discount on all plans
- Exclusive WhatsApp group access

— Dhruv
Founder, ASTRIX AI

P.S. Just reply to this email if you have any questions.`;
}

function buildWaitlistHtml(email: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>You're on the ASTRIX AI waitlist</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#020617;padding:32px 48px;text-align:center;">
          <p style="color:#00D1FF;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin:0;">ASTRIX AI</p>
        </td></tr>
        <tr><td style="padding:48px;">
          <h1 style="color:#111;font-size:28px;font-weight:800;margin:0 0 16px;">You're on the waitlist.</h1>
          <p style="color:#555;font-size:16px;line-height:1.7;margin:0 0 24px;">
            Hey, I'm Dhruv — founder of ASTRIX AI. Thanks for signing up. You'll be among the first to know when we open beta access.
          </p>
          <p style="color:#555;font-size:16px;line-height:1.7;margin:0 0 32px;">
            I'll email you personally when slots open. Until then, you can reply to this email if you have any questions.
          </p>
          <div style="background:#f9fafb;border-radius:8px;padding:24px;margin-bottom:32px;">
            <p style="color:#111;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">What happens next</p>
            <p style="color:#555;font-size:15px;line-height:1.8;margin:0;">
              1. I'll email you when beta opens<br/>
              2. You get early access before the public<br/>
              3. You can upgrade to Founding Access ($1) any time
            </p>
          </div>
          <a href="https://astrixai.app/#pricing" style="display:inline-block;background:#020617;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;">
            Upgrade to Founding Access &rarr;
          </a>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:24px 48px;border-top:1px solid #e5e7eb;">
          <p style="color:#999;font-size:12px;margin:0;">You're receiving this because you signed up at astrixai.app. Reply to unsubscribe.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildPaidHtml(tier: string): string {
  const isPartner = tier === "founder_call";
  const waLink = isPartner ? PARTNER_WA : FOUNDING_WA;
  const badge = isPartner ? "VVIP Design Partner" : "Founding Member";
  const headline = isPartner ? "You're a VVIP Design Partner." : "You're a Founding Member.";
  const msg = isPartner
    ? "You'll directly shape ASTRIX AI with your experience and needs. Tell me what you want — I build based on partner input. Join the VVIP group below — this is where the real decisions happen."
    : "You'll get first access to everything — before anyone else. Join the founding group below for all updates, features, and decisions.";
  const waLabel = isPartner ? "VVIP Partner WhatsApp Group" : "Exclusive Founding Members Group";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Welcome to ASTRIX AI — ${badge}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#020617;padding:32px 48px;text-align:center;">
          <p style="color:#FF9900;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin:0 0 4px;">ASTRIX AI</p>
          <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0;letter-spacing:2px;text-transform:uppercase;">${badge}</p>
        </td></tr>
        <tr><td style="padding:48px;">
          <h1 style="color:#111;font-size:28px;font-weight:800;margin:0 0 16px;">${headline}</h1>
          <p style="color:#555;font-size:16px;line-height:1.7;margin:0 0 24px;">
            Hey, I'm Dhruv — founder of ASTRIX AI. ${msg}
          </p>
          <div style="background:#f9fafb;border-radius:8px;padding:24px;margin-bottom:32px;">
            <p style="color:#111;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Payment Confirmed</p>
            <p style="color:#16a34a;font-size:15px;font-weight:700;margin:0;">&#10003; You're in.</p>
          </div>
          <a href="${waLink}" style="display:block;background:#25D366;color:#fff;text-decoration:none;text-align:center;padding:18px;border-radius:8px;font-size:16px;font-weight:700;margin-bottom:24px;">
            &#128172; Join ${waLabel} &rarr;
          </a>
          <p style="color:#999;font-size:13px;line-height:1.6;margin:0;">
            Just reply to this email to schedule your 1-on-1 call with me, or if you have any questions.
          </p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:24px 48px;border-top:1px solid #e5e7eb;">
          <p style="color:#999;font-size:12px;margin:0;">You're receiving this because you signed up at astrixai.app. Reply to unsubscribe.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req: Request) => {
  console.log("[send-email] Request received:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("[send-email] RESEND_API_KEY not set");
      return new Response(JSON.stringify({ sent: false, error: "RESEND_API_KEY not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const body = await req.json();
    const { email, tier } = body;

    if (!email || !tier) {
      return new Response(JSON.stringify({ sent: false, error: "Missing email or tier" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log("[send-email] Sending to:", email, "tier:", tier);

    let subject: string;
    let html: string;
    let text: string;

    if (tier === "waitlist") {
      subject = "You're on the ASTRIX AI waitlist";
      html = buildWaitlistHtml(email);
      text = buildWaitlistText(email);
    } else if (tier === "founder_call") {
      subject = "You're in — ASTRIX AI VVIP Design Partner";
      html = buildPaidHtml("founder_call");
      text = buildPaidText("founder_call");
    } else {
      subject = "You're in — ASTRIX AI Founding Member";
      html = buildPaidHtml("founding_access");
      text = buildPaidText("founding_access");
    }

    const payload = {
      from: FROM_EMAIL,
      reply_to: REPLY_TO,
      to: email,
      subject,
      html,
      text,
      headers: {
        "X-Entity-Ref-ID": `astrixai-${tier}-${Date.now()}`,
      },
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await res.json();
    console.log("[send-email] Resend status:", res.status, JSON.stringify(responseBody));

    if (!res.ok) {
      const errorMsg = responseBody?.message || `Resend error ${res.status}`;
      return new Response(JSON.stringify({ sent: false, error: errorMsg }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ sent: true, id: responseBody.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[send-email] Error:", error.message);
    return new Response(JSON.stringify({ sent: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
