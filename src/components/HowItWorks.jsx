import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Target, Lightbulb, CheckCircle2, Rocket, BarChart2, ChevronRight, ArrowRight } from 'lucide-react';

const steps = [
  { label: "Signals", icon: Radio, color: "text-blue-400", desc: "Aggregate raw feedback from Slack, Sales, and Intercom." },
  { label: "Problems", icon: Target, color: "text-red-400", desc: "Extract structured pain points from unstructured noise." },
  { label: "Opportunities", icon: Lightbulb, color: "text-amber-400", desc: "Rank by ARR impact and strategic confidence." },
  { label: "Decisions", icon: CheckCircle2, color: "text-brand-cyan", desc: "Document the 'Why' with immutable evidence links." },
  { label: "Launches", icon: Rocket, color: "text-purple-400", desc: "Ship features tied to predefined success metrics." },
  { label: "Verdicts", icon: BarChart2, color: "text-emerald-400", desc: "Close the loop. Did it actually work? Prove it." }
];

export default function HowItWorks() {
  return (
    <section id="engine" className="py-48 relative bg-brand-midnight overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-10">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              The Decision Architecture
            </motion.div>
            <h2 className="text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.8]">
              The <span className="text-gradient-cyan">Engine.</span>
            </h2>
          </div>
          <div className="max-w-md text-left">
            <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed mb-6">
              A six-step automated loop that transforms messy customer noise into high-confidence product outcomes.
            </p>
            <div className="flex items-center gap-2 text-brand-cyan font-black text-[10px] uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-brand-cyan/30"></span>
              Scroll to visualize the loop
            </div>
          </div>
        </div>

        {/* Visual Loop Connector */}
        <div className="hidden lg:block absolute left-1/2 top-[60%] -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent z-0" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -8 }}
              className="glass-card p-12 rounded-[3.5rem] hover:border-brand-blue/40 transition-all group relative overflow-hidden border-beam"
            >
              <div className="absolute top-0 right-0 p-10 text-7xl font-black text-white/[0.02] group-hover:text-brand-blue/5 transition-colors">
                {i + 1}
              </div>
              
              {/* Step Icon with Pulse */}
              <div className="relative mb-10">
                <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity ${step.color.replace('text', 'bg')}`} />
                <div className={`w-24 h-24 rounded-[2rem] bg-white/[0.03] flex items-center justify-center relative z-10 border border-white/10 group-hover:scale-110 transition-transform shadow-2xl group-hover:border-brand-cyan/30`}>
                  <step.icon className={`w-12 h-12 ${step.color}`} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="text-4xl font-black mb-6 tracking-tight">{step.label}</h3>
              <p className="text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-200 transition-colors text-xl">{step.desc}</p>
              
              <div className="mt-10 flex items-center gap-3 text-brand-cyan text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all">
                {i < steps.length - 1 ? (
                  <>Next Phase <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>Loop Closed <CheckCircle2 className="w-4 h-4" /></>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
