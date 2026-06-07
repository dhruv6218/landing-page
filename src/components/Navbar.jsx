import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const logoUrl = "https://images.dualite.app/2b015d31-734d-4289-b2bb-6448987e322e/saas-40f1e673-c290-4ee2-809e-39d90f42b0e0.webp";

  const navLinks = [
    { href: "#problem", label: "The Pain" },
    { href: "#engine", label: "The Engine" },
    { href: "#pricing", label: "Access" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
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
              {navLinks.map(link => (
                <MagneticButton key={link.href} href={link.href} className="hover:text-brand-cyan transition-colors">
                  {link.label}
                </MagneticButton>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="hidden md:inline-flex bg-brand-blue text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-cyan transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]"
              >
                Reserve Spot
              </motion.a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-brand-midnight/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-12"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-4xl font-black tracking-tighter text-zinc-300 hover:text-brand-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={handleNavClick}
              className="mt-8 bg-brand-orange text-brand-midnight px-10 py-5 rounded-full font-black text-xl orange-glow"
            >
              Reserve Founding Access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
