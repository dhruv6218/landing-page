import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Loader2, Sparkles, MessageCircle, ExternalLink, Star, Zap, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import MagneticButton from './MagneticButton';

const DODO_CHECKOUT_BASE = "https://checkout.dodopayments.com/buy";

const tiers = [
  {
    id: 'waitlist',
    name: "Free Waitlist",
    price: "$0",
    desc: "For PMs staying ahead of the curve.",
    features: ["Early product updates", "Public roadmap access", "Beta notification"],
    cta: "Join Waitlist",
    type: "free"
  },
  {
    id: 'founding_access',
    name: "Founding Access",
    price: "$1",
    sub: "₹95 one-time",
    desc: "Reserve your spot. Join the community.",
    features: ["Guaranteed Beta access", "Founding member badge", "Lifetime 20% discount", "Exclusive WA Group"],
    cta: "Reserve Access",
    type: "paid",
    popular: true,
    productId: "pdt_0NgWHNpH1rTYnFQAPjRK7"
  },
  {
    id: 'founder_call',
    name: "Design Partner",
    price: "$5",
    sub: "Limited slots",
    desc: "Directly shape the product with Dhruv.",
    features: ["1-on-1 Founder call", "Custom feature requests", "Direct Slack channel", "Partner WA Group"],
    cta: "Become Partner",
    type: "paid",
    productId: "pdt_0NgWHyWPWElDnZF0LIdSU"
  }
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function PricingCard({ tier, loading, onSubmit, error }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [localError, setLocalError] = useState('');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email.trim()) {
      setLocalError('Work email is required');
      return;
    }
    if (!isValidEmail(email)) {
      setLocalError('Please enter a valid email address');
      return;
    }
    onSubmit(tier, email.trim(), role.trim());
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative p-12 md:p-16 rounded-[4rem] border flex flex-col transition-all duration-700 overflow-hidden group border-beam ${
        tier.popular ? 'bg-brand-blue/5 border-brand-orange/40 orange-glow' : 'glass-card border-white/10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 209, 255, 0.08), transparent 40%)`
        }}
      />

      {tier.popular && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-orange text-brand-midnight px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 z-10 shadow-2xl">
          <Sparkles className="w-3.5 h-3.5" /> Founding Tier
        </div>
      )}

      <div className="mb-12 relative z-10 text-left">
        <h3 className="text-4xl font-black mb-8 tracking-tight">{tier.name}</h3>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-7xl font-black tracking-tighter">{tier.price}</span>
          {tier.sub && <span className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em]">{tier.sub}</span>}
        </div>
        <p className="text-zinc-400 font-medium text-xl leading-relaxed">{tier.desc}</p>
      </div>

      <div className="space-y-7 mb-16 flex-grow relative z-10 text-left">
        {tier.features.map((f, i) => (
          <div key={i} className="flex items-center gap-5 text-zinc-300">
            <div className="w-6 h-6 rounded-full bg-brand-cyan/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-brand-cyan" strokeWidth={4} />
            </div>
            <span className="font-bold text-lg tracking-tight">{f}</span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 relative z-10"
        autoComplete="off"
      >
        <div className="relative">
          <input
            name={`email_${tier.id}`}
            type="email"
            placeholder="Work email"
            required
            className={`w-full px-8 py-6 rounded-3xl bg-brand-midnight/50 border outline-none transition-all text-lg font-bold text-white backdrop-blur-md ${
              localError ? 'border-red-500' : 'border-white/10 focus:border-brand-cyan'
            }`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setLocalError(''); }}
          />
        </div>
        <div className="relative">
          <input
            name={`role_${tier.id}`}
            type="text"
            placeholder="Role (e.g. Head of Product)"
            className="w-full px-8 py-6 rounded-3xl bg-brand-midnight/50 border border-white/10 focus:border-brand-cyan outline-none transition-all text-lg font-bold text-white backdrop-blur-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {(localError || error) && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm font-bold px-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {localError || error}
            </motion.div>
          )}
        </AnimatePresence>

        <MagneticButton
          type="submit"
          disabled={loading}
          className={`w-full py-7 rounded-3xl font-black text-2xl transition-all flex items-center justify-center gap-4 active:scale-95 shimmer-btn ${
            loading ? 'opacity-70 cursor-wait' : ''
          } ${tier.popular ? 'bg-brand-orange text-brand-midnight hover:bg-white' : 'bg-white text-brand-midnight hover:bg-brand-cyan'}`}
        >
          {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
            <>
              {tier.cta}
              {tier.type === 'paid' ? <Zap className="w-6 h-6 fill-current" /> : <ShieldCheck className="w-6 h-6" />}
            </>
          )}
        </MagneticButton>
      </form>
    </motion.div>
  );
}

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successTier, setSuccessTier] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
      const tierId = params.get('tier');
      const tier = tiers.find(t => t.id === tierId) || tiers[1];
      setSuccessTier(tier);
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleSubmit = async (tier, email, role) => {
    setError('');
    setLoading(true);

    try {
      // Always save to Supabase first
      if (supabase) {
        const { error: dbError } = await supabase.from('early_access_leads').insert([{
          email,
          role: role || null,
          selected_offer: tier.id,
          payment_status: tier.type === 'free' ? 'not_required' : 'pending'
        }]);

        if (dbError) {
          // Duplicate email is okay — still proceed to checkout
          if (!dbError.message?.includes('duplicate') && !dbError.code?.includes('23505')) {
            throw new Error('Failed to save your details. Please try again.');
          }
        }
      }

      if (tier.type === 'paid') {
        // Redirect to Dodo Payments checkout
        const domain = window.location.origin;
        const redirectUrl = encodeURIComponent(`${domain}/?status=success&tier=${tier.id}`);
        const checkoutUrl = `${DODO_CHECKOUT_BASE}/${tier.productId}?quantity=1&redirect_url=${redirectUrl}&email=${encodeURIComponent(email)}`;
        window.location.href = checkoutUrl;
        return; // Page will navigate away
      }

      // Free tier — show success immediately
      setSuccessTier(tier);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (successTier) {
    const isPartner = successTier.id === 'founder_call';
    const waLink = isPartner
      ? "https://chat.whatsapp.com/HlnclUyto1JBHCCqWat4A8"
      : "https://chat.whatsapp.com/IikC8WZERUn3VWtt0MFX4q";

    return (
      <section id="pricing" className="py-60 text-center relative overflow-hidden bg-brand-midnight">
        <div className="hero-gradient absolute inset-0 opacity-40" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-3xl mx-auto glass-card p-16 md:p-24 rounded-[4rem] border-brand-orange/30 relative z-10"
        >
          <div className="w-32 h-32 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-12 orange-glow">
            <Check className="w-16 h-16 text-brand-midnight" strokeWidth={5} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">Welcome to the Inner Circle.</h2>

          <div className="bg-white/[0.03] p-12 rounded-[2.5rem] mb-12 text-left border border-white/10">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-6 flex items-center gap-3">
              <Star className="w-4 h-4 fill-current" /> Founder's Message
            </p>
            <p className="text-2xl md:text-3xl text-zinc-300 italic leading-relaxed font-medium">
              {isPartner
                ? "You are an exclusive design partner! You'll help shape this product with your experience and needs. Join the partner group below."
                : "You are an exclusive founding member! Join the group below for all updates. This is where the founding access community lives."
              }
            </p>
          </div>

          <MagneticButton
            href={waLink}
            className="flex items-center justify-center gap-4 w-full py-8 bg-[#25D366] text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:shadow-[#25D366]/30 transition-all"
          >
            <MessageCircle className="w-8 h-8 fill-current" />
            Join WhatsApp Group
            <ExternalLink className="w-6 h-6 opacity-50" />
          </MagneticButton>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-60 relative bg-grain">
      <div className="grid-overlay absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-[0.4em] mb-10"
          >
            <Lock className="w-4 h-4" /> Secure Access Terminal
          </motion.div>
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-10 leading-none">Secure Access.</h2>
          <p className="text-2xl md:text-3xl text-zinc-400 max-w-4xl mx-auto font-medium">Join the elite product teams building the <span className="text-white font-bold">accountability layer</span> for B2B SaaS.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} loading={loading} onSubmit={handleSubmit} error={error} />
          ))}
        </div>
      </div>
    </section>
  );
}
