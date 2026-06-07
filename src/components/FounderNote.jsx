import React from 'react';

export default function FounderNote() {
  return (
    <section className="py-32 bg-brand-midnight relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="glass-card p-12 md:p-20 rounded-[3rem] border-white/5 relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H6C8.20914 3 10 4.79086 10 7V15C10 18.3137 7.31371 21 4 21H1Z"/></svg>
          </div>
          
          <h2 className="text-3xl font-black mb-10">A note from the founder</h2>
          
          <div className="space-y-8 text-xl text-zinc-400 leading-relaxed italic font-medium">
            <p>"I've spent a decade building products, and the same problem keeps coming back: we ship features, but we don't ship outcomes. We celebrate the launch, but we rarely verify the verdict."</p>
            <p>ASTRIX AI is being built to fix the broken accountability loop in B2B SaaS. We're currently in the active build phase, and I'm looking for a handful of serious product leaders to help shape the roadmap.</p>
            <p>By joining today, you aren't just buying a tool—you're helping define a new standard for how product decisions are made.</p>
          </div>

          <div className="mt-16 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-orange orange-glow flex items-center justify-center text-brand-midnight font-black text-2xl">DY</div>
            <div>
              <p className="text-xl font-black">Dhruv Yadav</p>
              <p className="text-sm text-brand-orange font-bold uppercase tracking-widest">Founder, ASTRIX AI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
