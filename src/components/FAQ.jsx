import React from 'react';

const faqs = [
  {
    q: "What is ASTRIX AI?",
    a: "It's a decision and accountability platform that connects customer feedback (signals) to actual launch outcomes (verdicts)."
  },
  {
    q: "Who is it for?",
    a: "Heads of Product, PMs, and Founders of B2B SaaS companies who struggle with noisy prioritization."
  },
  {
    q: "Is the product live?",
    a: "We are in private beta. Founding Access members get priority entry as we roll out modules."
  },
  {
    q: "What do I get with Founding Access?",
    a: "A guaranteed spot in the beta, a lifetime discount, and direct influence over the feature roadmap."
  }
];

export default function FAQ() {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
