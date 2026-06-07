import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What is ASTRIX AI?",
    a: "A decision and accountability platform that connects scattered customer feedback (signals) to actual launch outcomes (verdicts). It's the missing layer between 'we heard customers' and 'we proved it worked'."
  },
  {
    q: "Who is it for?",
    a: "Heads of Product, PMs, and Founders of B2B SaaS companies who struggle with noisy prioritization and can't prove whether what they shipped actually moved the needle."
  },
  {
    q: "Is the product live?",
    a: "We are in private beta. Founding Access members get priority entry as we roll out modules. Your early feedback directly shapes what gets built."
  },
  {
    q: "What do I get with Founding Access?",
    a: "A guaranteed spot in the beta, a lifetime 20% discount on future pricing, a founding member badge, and access to an exclusive WhatsApp community with the founder."
  },
  {
    q: "What happens after I pay?",
    a: "You'll be redirected to a confirmation page and added to the exclusive WhatsApp group. When beta opens, you get first access. Your $1 reserves your spot forever."
  },
  {
    q: "What is the Design Partner option?",
    a: "For serious product leaders who want a direct 1-on-1 call with the founder, custom feature requests, and a Slack channel for real-time input. Limited slots available."
  }
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="border-b border-white/5"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-8 text-left group"
      >
        <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-brand-cyan transition-colors pr-8">{faq.q}</span>
        <ChevronDown className={`w-6 h-6 text-zinc-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-brand-cyan' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 text-lg leading-relaxed pb-8 font-medium">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-60 relative bg-brand-midnight">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
          >
            Questions & Answers
          </motion.div>
          <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8]">
            FAQ
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
