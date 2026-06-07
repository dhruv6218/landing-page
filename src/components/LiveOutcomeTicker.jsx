import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

const outcomes = [
  { signal: "Churn Risk: High", decision: "Build Usage Analytics", verdict: "Solved", impact: "+12% ARR" },
  { signal: "Sales Gap: Enterprise", decision: "SSO Integration", verdict: "Solved", impact: "3 New Logos" },
  { signal: "Support Noise: High", decision: "Fix Auth Flow", verdict: "Solved", impact: "-40% Tickets" },
  { signal: "Feature Request: API", decision: "Public API v1", verdict: "Solved", impact: "12 Integrations" },
];

export default function LiveOutcomeTicker() {
  return (
    <div className="w-full py-10 border-y border-white/5 bg-brand-midnight/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-midnight to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-midnight to-transparent z-10" />
      
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 whitespace-nowrap items-center"
      >
        {[...outcomes, ...outcomes].map((item, i) => (
          <div key={i} className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2 text-zinc-500">
              <AlertCircle className="w-3 h-3" />
              <span>{item.signal}</span>
            </div>
            <ArrowRight className="w-3 h-3 text-zinc-700" />
            <div className="flex items-center gap-2 text-brand-blue">
              <TrendingUp className="w-3 h-3" />
              <span>{item.decision}</span>
            </div>
            <ArrowRight className="w-3 h-3 text-zinc-700" />
            <div className="flex items-center gap-2 text-brand-cyan">
              <CheckCircle2 className="w-3 h-3" />
              <span>{item.impact}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
