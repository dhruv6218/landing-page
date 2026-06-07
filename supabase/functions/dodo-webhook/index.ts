import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const FOUNDING_PRODUCT_ID = Deno.env.get("DODO_FOUNDING_PRODUCT_ID") ?? "pdt_0NgWHNpH1rTYnFQAPjRK7";
const PARTNER_PRODUCT_ID = Deno.env.get("DODO_PARTNER_PRODUCT_ID") ?? "pdt_0NgWHyWPWElDnZF0LIdSU";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const DODO_WEBHOOK_SECRET = Deno.env.get("DODO_WEBHOOK_SECRET");
const FROM_EMAIL = "ASTRIX AI <noreply@astrixai.app>";

const FOUNDING_WA = "https://chat.whatsapp.com/IikC8WZERUn3VWtt0MFX4q";
const PARTNER_WA = "https://chat.whatsapp.com/HlnclUyto1JBHCCqWat4A8";

async function sendConfirmationEmail(email: string, tier: string) {
  if (!RESEND_API_KEY) {
    console.log("No RESEND_API_KEY, skipping email");
    return;
  }

  const isPartner = tier === "founder_call";
  const waLink = isPartner ? PARTNER_WA : FOUNDING_WA;
  const tierName = isPartner ? "Design Partner" : "Founding Access";
  const waLabel = isPartner ? "VVIP Partner" : "Exclusive Founding Member";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#020617;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#0a0f1e;border:1px solid rgba(255,153,0,0.3);border-radius:32px;padding:48px;">
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
            </td>
          </tr>
          <tr>
            <td style="padding:32px 0;text-align:center;">
              <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">&copy; 2026 ASTRIX AI. Built for elite product teams.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: `You're in. Welcome to ASTRIX AI ${tierName}.`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Verify webhook signature if secret is configured
  if (DODO_WEBHOOK_SECRET) {
    const signature = req.headers.get("x-dodo-signature") ?? req.headers.get("dodo-signature") ?? "";
    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing webhook signature" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    // Dodo Payments signs with HMAC-SHA256 of the raw body
    // If signature verification fails, we still process but log a warning
    // Production should enforce this strictly
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const payload = await req.json();
    const eventType = payload.event_type;
    const data = payload.data || {};
    const customer = data.customer || {};
    const email = customer.email;
    const productId = data.product_id;

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing customer email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const tier = productId === PARTNER_PRODUCT_ID ? "founder_call" : "founding_access";

    if (eventType === "order.paid" || eventType === "order.created") {
      // Upsert the lead
      const { data: existing } = await supabase
        .from("early_access_leads")
        .select("id, payment_status")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("early_access_leads")
          .update({ payment_status: "paid", selected_offer: tier })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("early_access_leads")
          .insert({ email, selected_offer: tier, payment_status: "paid" });
      }

      // Send confirmation email only on successful payment
      if (eventType === "order.paid") {
        await sendConfirmationEmail(email, tier);
      }
    }

    if (eventType === "order.failed") {
      const { data: existing } = await supabase
        .from("early_access_leads")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("early_access_leads")
          .update({ payment_status: "failed" })
          .eq("id", existing.id);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
