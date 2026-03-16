"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Rabbit } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Explicitly typing as Variants fixes the index signature error
  const bunnyVariants: Variants = {
    jump: (i: number) => ({
      y: [0, -8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut", // TS now recognizes this as a valid Easing literal
        delay: i * 0.2,
      },
    }),
  };

  return (
    <footer 
      className="relative bg-[#b35e5e] py-6 border-t-[3px] border-[#8b5a2b] flex flex-col items-center justify-center gap-3 overflow-hidden"
      style={{ 
        backgroundImage: 'radial-gradient(#d66d6d 2px, transparent 2px)', 
        backgroundSize: '12px 12px' 
      }}
    >
      {/* Animated Bunny Row */}
      <div className="flex gap-8 mb-1">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bunnyVariants}
            animate="jump" // Changed name to match the variant key
            className="text-[#fffdf5] opacity-80"
          >
            <Rabbit size={18} strokeWidth={2.5} />
          </motion.div>
        ))}
      </div>

      {/* Main Text Content */}
      <div className="flex flex-col items-center gap-1 z-10">
        <div className="text-[10px] font-[1000] text-white tracking-[0.4em] uppercase italic">
          Made with Art // Nyra Lab
        </div>
        
        <div className="text-[9px] font-bold text-white/99 tracking-widest uppercase">
          © {currentYear} St4rLigh7 Architecture. All Rights Reserved.
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 w-full h-1 bg-white/10 blur-sm" />
    </footer>
  );
}