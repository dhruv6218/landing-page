import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import FounderNote from './components/FounderNote';
import FAQ from './components/FAQ';
import EliteBackground from './components/EliteBackground';
import LiveOutcomeTicker from './components/LiveOutcomeTicker';
import { Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './components/MagneticButton';

export default function App() {
  const logoUrl = "https://images.dualite.app/2b015d31-734d-4289-b2bb-6448987e322e/saas-40f1e673-c290-4ee2-809e-39d90f42b0e0.webp";

  return (
    <div className="min-h-screen bg-brand-midnight selection:bg-brand-orange selection:text-brand-midnight relative">
      <EliteBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <LiveOutcomeTicker />
        
        {/* The Pain Section */}
        <section id="problem" className="py-60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="inline-block px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                  The Broken Loop
                </div>
                <h2 className="text-6xl md:text-[8.5rem] font-black tracking-tighter mb-10 leading-[0.85]">
                  Shipping <br />
                  <span className="text-zinc-700">is blind.</span>
                </h2>
                <p className="text-2xl md:text-3xl text-zinc-400 mb-16 leading-relaxed font-medium">
                  Most teams celebrate the launch but <span className="text-white">ignore the verdict</span>. 42% of features have zero impact because they're built on noise, not evidence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: 'Scattered Feedback', icon: '01' },
                    { label: 'Noisy Prioritization', icon: '02' },
                    { label: 'Zero Accountability', icon: '03' },
                    { label: 'Wasted Engineering', icon: '04' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 text-2xl font-black group">
                      <span className="text-zinc-800 group-hover:text-brand-orange transition-colors">{item.icon}</span>
                      <span className="text-zinc-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <div className="relative">
                <div className="absolute -inset-20 bg-brand-blue/10 blur-[150px] rounded-full" />
                <div className="relative z-10 space-y-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-12 rounded-[3rem] border-red-500/20 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl" />
                    <div className="text-red-500 font-black mb-4 uppercase tracking-[0.4em] text-[10px]">The Chaos</div>
                    <div className="text-7xl font-black tracking-tighter mb-2">42%</div>
                    <p className="text-zinc-500 text-lg font-bold">Features shipped have zero measurable impact.</p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-12 rounded-[3rem] border-brand-cyan/20 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-3xl" />
                    <div className="text-brand-cyan font-black mb-4 uppercase tracking-[0.4em] text-[10px]">The Solution</div>
                    <div className="text-7xl font-black tracking-tighter mb-2">100%</div>
                    <p className="text-zinc-500 text-lg font-bold">Decisions backed by verifiable ARR evidence.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        
        {/* Elite Benefits Section */}
        <section className="py-60 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-40">
              <h2 className="text-6xl md:text-[13rem] font-black tracking-tighter leading-[0.75] mb-10">
                Focus on <br />
                <span className="text-gradient-cyan">Outcomes.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-500 font-medium">Stop measuring velocity. Start measuring proof.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -15 }}
                className="glass-card p-16 rounded-[4rem] border-white/5 relative group overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-cyan/5 blur-[100px] group-hover:bg-brand-cyan/10 transition-colors" />
                <h3 className="text-4xl font-black mb-8 text-brand-cyan tracking-tight">Prioritize with ARR Impact</h3>
                <p className="text-zinc-400 text-2xl leading-relaxed font-medium">ASTRIX automatically connects every customer signal to their contract value, giving you a real-time <span className="text-white">"Revenue Confidence Score"</span> for every roadmap item.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -15 }}
                className="glass-card p-16 rounded-[4rem] border-white/5 relative group overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/5 blur-[100px] group-hover:bg-brand-blue/10 transition-colors" />
                <h3 className="text-4xl font-black mb-8 text-brand-blue tracking-tight">The Immutable Decision Log</h3>
                <p className="text-zinc-400 text-2xl leading-relaxed font-medium">Never ask "Why did we build this?" again. Every feature is linked to an <span className="text-white">immutable record</span> of signals, stakeholder votes, and strategic intent.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <Pricing />
        <FounderNote />
        <FAQ />

        {/* Final CTA */}
        <section className="py-80 relative overflow-hidden bg-grain">
          <div className="hero-gradient absolute inset-0" />
          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-7xl md:text-[15rem] font-black tracking-tighter leading-[0.7] mb-24">
              Build with <br />
              <span className="text-brand-orange">Proof.</span>
            </h2>
            <MagneticButton 
              href="#pricing"
              className="inline-flex bg-brand-orange text-brand-midnight px-20 py-10 rounded-full font-black text-4xl orange-glow shimmer-btn shadow-[0_0_80px_rgba(255,153,0,0.4)] hover:scale-110 transition-transform"
            >
              Get Access Now
            </MagneticButton>
          </div>
        </section>
      </main>

      <footer className="py-32 border-t border-white/5 bg-brand-midnight relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="ASTRIX AI" className="w-12 h-12 object-contain" />
            <span className="text-3xl font-black tracking-tighter">ASTRIX AI</span>
          </div>
          
          <p className="text-zinc-600 font-bold text-sm uppercase tracking-[0.4em]">© 2026 Astrix AI. Built for elite product teams.</p>
          
          <div className="flex items-center gap-10">
            <a href="mailto:help.astrix@gmail.com" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]">
              <Mail className="w-5 h-5" />
              help.astrix@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/dhruv-yadav-80b843367" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-[#0077B5] hover:bg-white/10 transition-all"
            >
              <Linkedin className="w-6 h-6 fill-current" />
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-8 left-8 right-8 z-[100]">
        <MagneticButton 
          href="#pricing"
          className="flex items-center justify-center w-full py-7 bg-brand-orange text-brand-midnight rounded-3xl font-black text-xl orange-glow shadow-[0_20px_50px_rgba(255,153,0,0.4)]"
        >
          Reserve founding access — $1
        </MagneticButton>
      </div>
    </div>
  );
}
