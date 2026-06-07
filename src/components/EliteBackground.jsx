import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function EliteBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Optimization: Use transforms for GPU acceleration
  const y1 = useTransform(scrollY, [0, 2000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 150]);

  useEffect(() => {
    let frameId;
    const handleMouseMove = (e) => {
      frameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* High-Performance Spotlight */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 102, 255, 0.04), transparent 70%)`
        }}
      />

      {/* Floating Orbs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-blue/5 blur-[140px] rounded-full mix-blend-screen"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-brand-cyan/5 blur-[160px] rounded-full mix-blend-screen"
      />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Pulsing Circuit Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="elite-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#elite-grid)" />
      </svg>
    </div>
  );
}
