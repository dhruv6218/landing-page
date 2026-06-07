import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = "https://images.dualite.app/2b015d31-734d-4289-b2bb-6448987e322e/saas-40f1e673-c290-4ee2-809e-39d90f42b0e0.webp";

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center px-8 py-4 rounded-2xl border transition-all duration-500 ${
          scrolled ? 'bg-brand-midnight/80 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'
        }`}>
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="ASTRIX AI" className="w-8 h-8 object-contain" />
            <span className="text-xl font-black tracking-tighter">ASTRIX AI</span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <MagneticButton href="#problem" className="hover:text-brand-cyan transition-colors">The Pain</MagneticButton>
            <MagneticButton href="#engine" className="hover:text-brand-cyan transition-colors">The Engine</MagneticButton>
            <MagneticButton href="#pricing" className="hover:text-brand-cyan transition-colors">Access</MagneticButton>
          </div>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#pricing"
            className="bg-brand-blue text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-cyan transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]"
          >
            Reserve Spot
          </motion.a>
        </div>
      </div>
    </nav>
  );
}
