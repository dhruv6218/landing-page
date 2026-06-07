import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareOff, BarChart3, ClipboardX, ZapOff } from 'lucide-react';

const pains = [
  {
    icon: MessageSquareOff,
    title: "Scattered Feedback",
    description: "Signals are lost in Slack, Intercom, and sales calls. You can't see the forest for the trees."
  },
  {
    icon: BarChart3,
    title: "Noisy Prioritization",
    description: "Roadmaps are built on 'gut feelings' or whoever shouts the loudest, not data-backed evidence."
  },
  {
    icon: ClipboardX,
    title: "Poor Decision Records",
    description: "Six months later, nobody remembers why a feature was built or what problem it was solving."
  },
  {
    icon: ZapOff,
    title: "No Post-Launch Proof",
    description: "Features ship and vanish. You have no systematic way to measure if they actually moved the needle."
  }
];

export default function Problem() {
  return (
    <section id="problem" className="py-40 relative overflow-hidden bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 text-gradient tracking-tighter"
          >
            Product management <br />
            <span className="text-brand-indigo">is currently broken.</span>
          </motion.h2>
          <p className="text-zinc-400 text-2xl font-medium max-w-2xl mx-auto">Most teams are shipping blind. Are you?</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pains.map((pain, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-brand-indigo/30 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-indigo/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <pain.icon className="w-8 h-8 text-brand-indigo" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{pain.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-lg font-medium group-hover:text-zinc-300 transition-colors">{pain.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
