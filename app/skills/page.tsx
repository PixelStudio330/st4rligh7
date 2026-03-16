"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, Variants } from "framer-motion";
import { Star, Sparkles, Cpu, Layout, Database, Wrench, Cloud, Sun } from "lucide-react";

const SkillItem = ({ name, level, color, index }: { name: string; level: number; color: string; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 60 }}
      className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-[#8b5a2b]/10 group relative"
    >
      <div className="flex items-center gap-3 relative z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-2.5 h-2.5 rounded-full" 
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }} 
        />
        <h3 className="text-lg md:text-xl font-[1000] text-[#5d3d1e] uppercase italic tracking-tighter group-hover:tracking-wider group-hover:text-[#c45a5a] transition-all duration-300">
          {name}
        </h3>
      </div>

      <div className="relative w-full md:w-64 h-7 mt-3 md:mt-0 flex items-center bg-white border-2 border-[#8b5a2b] rounded-lg px-3 overflow-hidden shadow-[4px_4px_0px_0px_#8b5a2b] group-hover:shadow-[6px_6px_0px_0px_#8b5a2b] transition-all">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
          viewport={{ once: true }}
          className="absolute left-0 top-0 h-full opacity-90"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 30px ${color}`,
          }}
        />
        
        <div className="relative z-10 flex gap-1 w-full justify-between items-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            >
              <Star 
                size={12} 
                fill={(i + 1) * 20 <= level ? "#fff" : "none"} 
                stroke={(i + 1) * 20 <= level ? "#fff" : "#8b5a2b"}
                strokeWidth={3}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SkillSection = ({ title, icon, skills, color }: { title: string, icon: React.ReactNode, skills: any[], color: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <motion.div 
        whileHover={{ y: -5, x: 2 }}
        className="inline-flex items-center gap-3 bg-[#8b5a2b] text-white px-5 py-2 rounded-t-xl font-[1000] text-[10px] uppercase tracking-[0.2em] shadow-[4px_-4px_0px_0px_#ffd166]"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        {icon}
        {title}
      </motion.div>
      
      <div className="bg-white/40 backdrop-blur-md border-t-2 border-[#8b5a2b] p-6 md:p-8 rounded-b-[2rem] rounded-tr-[2rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-1000 scale-150">
           {icon}
        </div>
        {skills.map((skill, idx) => (
          <SkillItem key={skill.name} {...skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default function SkillsPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / 20);
      mouseY.set(e.clientY / 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const categories = [
    {
      title: "Frontend Artistry",
      icon: <Layout size={16} />,
      color: "#90be6d",
      skills: [
        { name: "React.js", level: 95, color: "#90be6d" },
        { name: "Next.js", level: 90, color: "#90be6d" },
        { name: "TypeScript", level: 85, color: "#90be6d" },
        { name: "Tailwind CSS", level: 100, color: "#90be6d" },
        { name: "Framer Motion", level: 95, color: "#90be6d" },
      ]
    },
    {
      title: "Backend & Logic",
      icon: <Database size={16} />,
      color: "#c45a5a",
      skills: [
        { name: "Prisma", level: 80, color: "#c45a5a" },
        { name: "NeonDB", level: 75, color: "#c45a5a" },
        { name: "Auth Systems", level: 85, color: "#c45a5a" },
        { name: "API Architecture", level: 90, color: "#c45a5a" },
      ]
    },
    {
      title: "Studio & Tools",
      icon: <Wrench size={16} />,
      color: "#ffd166",
      skills: [
        { name: "Figma", level: 95, color: "#ffd166" },
        { name: "GitHub / CI CD", level: 85, color: "#ffd166" },
        { name: "Vercel", level: 90, color: "#ffd166" },
        { name: "Responsive Design", level: 100, color: "#ffd166" },
      ]
    }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-8 md:py-20 relative overflow-hidden selection:bg-[#90be6d] selection:text-white">
      
      {/* --- REFINED BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        {/* Adjusted Background Image: Smaller scale and softer blur */}
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-no-repeat transition-all duration-700 blur-[1.5px]"
          style={{ 
            backgroundImage: "url('/images/body2.jpg')",
            backgroundSize: '110% auto' // Makes the image feel less "zoomed in"
          }}
        />
        
        {/* Signature Dot Grid Layer - Lowered opacity to prevent fading out content */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
          style={{ 
            backgroundImage: `radial-gradient(#8b5a2b 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px' 
          }}
        />

        {/* Adjusted Gradient: Removed heavy bottom weight to prevent footer fading */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
      </div>

      {/* BACKGROUND ELEMENTS FROM DASHBOARD */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-10 left-10 opacity-20 text-[#90be6d] hidden lg:block pointer-events-none -z-10"
      >
        <Cloud size={60} />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute bottom-20 right-10 opacity-20 text-[#ffd166] hidden lg:block pointer-events-none -z-10"
      >
        <Sun size={80} />
      </motion.div>

      {/* ANIMATED PARALLAX BACKGROUND BLOBS */}
      <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-[#90be6d]/10 blur-[120px] rounded-full"
        />
        <motion.div 
          style={{ x: springY, y: springX }}
          className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-[#c45a5a]/10 blur-[100px] rounded-full"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,#ffd166_0%,transparent_70%)] opacity-[0.05]" />
      </div>

      {/* GRAIN OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-[1000] text-[#5d3d1e] uppercase italic tracking-tighter leading-none mb-4">
              Technical <br /> 
              <span className="text-[#90be6d] drop-shadow-[4px_4px_0px_#8b5a2b]">Manifesto</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-[#8b5a2b] font-[1000] uppercase text-[9px] tracking-[0.5em] opacity-50">
              <Sparkles size={10} /> Precision Engineering System
            </div>
          </motion.div>
        </header>

        <div className="space-y-6">
          {categories.map((cat) => (
            <SkillSection 
              key={cat.title} 
              title={cat.title}
              icon={cat.icon}
              skills={cat.skills}
              color={cat.color}
            />
          ))}
        </div>

        <footer className="mt-20 py-10 flex flex-col items-center gap-4 border-t border-[#8b5a2b]/20 relative z-20">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           >
             <Cpu size={20} className="text-[#8b5a2b] opacity-60" />
           </motion.div>
           <div className="font-black uppercase text-[9px] tracking-[0.3em] text-[#5d3d1e] opacity-60">Currently working forward to learn and master more tools and languages!</div>
        </footer>
      </div>
    </div>
  );
}