import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const payload = await req.json();

    // Dodo Payments webhook structure
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

    // Map product IDs to offer tiers
    const FOUNDING_PRODUCT_ID = Deno.env.get("DODO_FOUNDING_PRODUCT_ID") ?? "pdt_0NgWHNpH1rTYnFQAPjRK7";
    const PARTNER_PRODUCT_ID = Deno.env.get("DODO_PARTNER_PRODUCT_ID") ?? "pdt_0NgWHyWPWElDnZF0LIdSU";

    let selectedOffer = "founding_access";
    if (productId === PARTNER_PRODUCT_ID) {
      selectedOffer = "founder_call";
    }

    if (eventType === "order.created" || eventType === "order.paid") {
      // Check if lead already exists
      const { data: existing } = await supabase
        .from("early_access_leads")
        .select("id, payment_status")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        // Update existing lead to paid
        const { error } = await supabase
          .from("early_access_leads")
          .update({
            payment_status: "paid",
            selected_offer: selectedOffer,
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        // Insert new lead as paid (Dodo checkout might not have gone through our form first)
        const { error } = await supabase
          .from("early_access_leads")
          .insert({
            email,
            selected_offer: selectedOffer,
            payment_status: "paid",
          });

        if (error) throw error;
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
