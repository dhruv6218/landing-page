import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { analytics } from '../lib/analytics';

export default function Hero() {
  return (
    <section className="relative pt-64 pb-32 overflow-hidden bg-grain min-h-screen flex items-center">
      <div className="hero-gradient absolute inset-0" />
      <div className="grid-overlay absolute inset-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-[0.4em] mb-12 animate-pulse-glow">
            <Zap className="w-3.5 h-3.5 fill-current" />
            The Accountability Layer for B2B SaaS
          </div>
          
          <h1 className="text-6xl md:text-[9.5rem] font-black tracking-tighter leading-[0.8] mb-16">
            Build with proof. <br />
            <span className="text-gradient-cyan">Ship with impact.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto mb-20 leading-relaxed font-medium">
            Stop shipping blind. Connect scattered customer signals to <span className="text-white font-bold">measurable ARR verdicts</span>. The first decision engine built for elite product teams.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <MagneticButton
              href="#pricing"
              onClick={() => analytics.heroCta('reserve_founding_access')}
              className="group bg-brand-orange text-brand-midnight px-14 py-7 rounded-full font-black text-2xl flex items-center gap-4 orange-glow shimmer-btn shadow-[0_0_50px_rgba(255,153,0,0.3)] hover:scale-105 transition-transform"
            >
              Reserve Founding Access — $1
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </MagneticButton>

            <MagneticButton
              href="#engine"
              onClick={() => analytics.heroCta('explore_engine')}
              className="px-14 py-7 rounded-full font-black text-2xl border border-white/10 hover:bg-white/5 transition-all backdrop-blur-md"
            >
              Explore the Engine
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 blur-[180px] rounded-full pointer-events-none" />
    </section>
  );
}
