import React from 'react';
import { Target, TrendingUp, FileText, Activity } from 'lucide-react';

const benefits = [
  {
    title: "Prioritize with Evidence",
    description: "Move beyond 'gut feelings'. Every item on your roadmap is linked back to specific customer signals and frequency counts.",
    icon: Target
  },
  {
    title: "Connect Pain to ARR",
    description: "Quantify the cost of inaction. See exactly how much revenue is tied to specific problems and unaddressed opportunities.",
    icon: TrendingUp
  },
  {
    title: "Document the 'Why'",
    description: "Create an immutable record of every product decision. Onboard new team members with the full context of why things were built.",
    icon: FileText
  },
  {
    title: "Track Launch Verdicts",
    description: "Did it work? ASTRIX automatically prompts for post-launch evidence to close the loop on every feature you ship.",
    icon: Activity
  }
];

export default function Benefits() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Focus on outcomes, <br />
              <span className="text-primary">not just feature output.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              ASTRIX AI isn't just another project management tool. It's the system of record for your product strategy, ensuring every sprint moves the needle on your core business metrics.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/10 overflow-hidden p-8">
              <div className="w-full h-full rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-6 flex flex-col gap-4">
                <div className="h-8 w-1/3 bg-zinc-800 rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-zinc-800/50 rounded-md" />
                  <div className="h-4 w-5/6 bg-zinc-800/50 rounded-md" />
                </div>
                <div className="mt-auto grid grid-cols-2 gap-4">
                  <div className="h-24 bg-primary/20 border border-primary/30 rounded-xl flex flex-col items-center justify-center p-4">
                    <span className="text-xs text-primary font-bold uppercase">ARR Impact</span>
                    <span className="text-2xl font-bold text-white">$142k</span>
                  </div>
                  <div className="h-24 bg-accent/20 border border-accent/30 rounded-xl flex flex-col items-center justify-center p-4">
                    <span className="text-xs text-accent font-bold uppercase">Confidence</span>
                    <span className="text-2xl font-bold text-white">89%</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
