"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Cpu, Globe, ShieldCheck, Hammer, Activity, Heart, Sparkles 
} from "lucide-react";

const SkillShard = ({ name, level, index }: { name: string; level: string; index: number }) => {
  const [hovered, setHovered] = useState(false);

  // Theme Colors
  const themeColor = "#8b5a2b";   // Primary Brown
  const hoverColor = "#e5989b";   // Dusty Rose Pink (Solid)
  const softPinkBg = "#fff1f2";   // Soft Dusty Pink (Card Surface)

  const hoverTerms = ["Blooming...", "Flourishing...", "Nurturing...", "Sprouting..."];
  const currentTerm = hoverTerms[index % hoverTerms.length];

  const getLayout = (i: number) => {
    const layouts = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1"];
    return layouts[i % layouts.length];
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, rotate: index % 2 === 0 ? 1 : -1 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
      className={`${getLayout(index)} relative group overflow-hidden border-2 border-[#8b5a2b]/20 rounded-[2rem] shadow-lg`}
      style={{ backgroundColor: softPinkBg }} // Applied Soft Pink to Card BG
    >
      <div className="p-5 h-full flex flex-col justify-between min-h-[150px]">
        <Sparkles 
          size={14} 
          className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity" 
          style={{ color: themeColor }} 
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
             <Heart size={10} fill={themeColor} style={{ color: themeColor }} className="opacity-40" />
             <span className="text-[10px] font-bold text-[#8b5a2b]/60 uppercase tracking-widest">Skill_{index + 1}</span>
          </div>
          <h3 className="text-xl font-black text-[#5d3d1e] uppercase tracking-tighter leading-tight drop-shadow-sm">
            {name}
          </h3>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i} 
                animate={hovered ? { scale: [1, 1.2, 1] } : {}}
                transition={{ delay: i * 0.1 }}
                className="w-2.5 h-2.5 rounded-full shadow-inner" 
                style={{ backgroundColor: i < 4 ? themeColor : '#ffffff90', border: `1px solid ${themeColor}40` }} 
              />
            ))}
          </div>
          <span className="text-[10px] font-black italic text-[#8b5a2b]">{level}</span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 p-5 flex flex-col justify-center items-center text-center backdrop-blur-md"
              style={{ backgroundColor: `${hoverColor}f0` }} // Full Pink Hover
            >
              <div className="bg-white/20 p-3 rounded-full mb-2">
                <Activity size={24} className="text-white" />
              </div>
              <p className="text-[9px] tracking-[0.3em] font-bold text-white/80 uppercase">{currentTerm}</p>
              <p className="text-lg font-black text-white uppercase">{name}</p>
              <div className="mt-3 w-12 h-1 bg-white/40 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }} 
                  animate={{ x: "0%" }} 
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-full bg-white" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function SkillsPage() {
  const categories = [
    { 
      title: "Frontend Meadow", 
      icon: <Globe />, 
      skills: [
        { name: "TypeScript", level: "Expert" }, 
        { name: "JavaScript", level: "Expert" }, 
        { name: "React", level: "Expert" }, 
        { name: "Next.js", level: "Advanced" }, 
        { name: "Vite", level: "Advanced" }
      ] 
    },
    { 
      title: "Backend Garden", 
      icon: <ShieldCheck />, 
      skills: [
        { name: "MySQL", level: "Advanced" }, 
        { name: "Prisma", level: "Expert" }, 
        { name: "HeidiSQL", level: "Power User" }, 
        { name: "BetterAuth", level: "Specialist" }, 
        { name: "NextAuth", level: "Advanced" }, 
        { name: "Sequel Ace", level: "Advanced" }, 
        { name: "NeonDB", level: "Proficient" }
      ] 
    },
    { 
      title: "Tool Shed", 
      icon: <Hammer />, 
      skills: [
        { name: "Framer Motion", level: "Expert" }, 
        { name: "Vercel", level: "Expert" }, 
        { name: "Daisy UI", level: "Expert" }, 
        { name: "GitHub", level: "Advanced" }
      ] 
    }
  ];

  return (
    <div className="selection:bg-[#ffb4a2] selection:text-white pb-20">
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <header className="mb-20 border-b-4 border-dashed border-[#8b5a2b]/20 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 bg-[#ffd166]/20 w-fit px-3 py-1 rounded-full border border-[#ffd166]/40">
                <Sparkles size={12} className="text-[#8b5a2b]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8b5a2b] uppercase">Archive_Collection_2026</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-[#5d3d1e] uppercase italic leading-[0.8] tracking-tighter">
                Skill<br />
                <span className="text-[#8b5a2b] drop-shadow-[4px_4px_0px_rgba(139,90,43,0.1)]">Meadow</span>
              </h1>
            </div>
            <div className="bg-[#f2ead3] p-4 rounded-2xl border-2 border-[#8b5a2b]/10 font-serif italic text-sm text-[#8b5a2b]/80 max-w-xs">
              "A collection of digital seeds planted and grown with care."
            </div>
          </div>
        </header>

        <div className="space-y-32">
          {categories.map((cat) => (
            <section key={cat.title}>
              <div className="flex items-center gap-4 mb-10 group">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  className="p-3 rounded-2xl shadow-sm border-2 border-[#8b5a2b]/10 bg-white" 
                  style={{ color: "#8b5a2b" }}
                >
                   {React.cloneElement(cat.icon as React.ReactElement, { size: 24 })}
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-[#5d3d1e]">
                  {cat.title}
                </h2>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#8b5a2b]/20 to-transparent" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {cat.skills.map((skill, idx) => (
                  <SkillShard 
                    key={skill.name} 
                    {...skill} 
                    index={idx} 
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 pt-10 flex flex-col items-center gap-6">
          <div className="flex gap-4">
             <div className="w-3 h-3 rounded-full bg-[#8b5a2b]/40" />
             <div className="w-3 h-3 rounded-full bg-[#e5989b]/40" />
             <div className="w-3 h-3 rounded-full bg-[#b5838d]/40" />
          </div>
          <div className="flex items-center gap-3 opacity-60">
            <Cpu size={20} className="text-[#5d3d1e]" />
            <span className="text-[10px] font-black text-[#5d3d1e] tracking-[0.3em] uppercase">
              End of Transmission // Hand-forged with love
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}