"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Star, Heart, MousePointer2, Sparkles, Users, Apple, Cherry } from 'lucide-react';

// --- 1. DATA STRUCTURES ---
const PROJECTS = [
  {
    id: 1,
    title: "Honey Haze",
    description: "A cozy bakery management system and storefront. Built with a full-stack approach to handle delicious treats and orders with a sweet touch.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    link: "https://honey-haze.vercel.app/",
    accent: "#FFB347",
    manifest: [
      { label: "AI delivery man", status: "Order tracking" },
      { label: "Interactive cart", status: "Visually stunning UI" }
    ],
    emoji: "🍯",
    type: "Personal Project"
  },
  {
    id: 2,
    title: "PixelStudio",
    description: "Our official creative agency HQ. A collaboration with Nova (The respected CEO of PixelStudio) for building high-end, artsy digital solutions for global clients.",
    tags: ["Next.js", "TypeScript", "Tailwind", "React", "Vercel"],
    link: "https://pixel-studio-opal.vercel.app/",
    accent: "#729d4d",
    manifest: [
      { label: "Custom Web Design", status: "Inquire" },
      { label: "Full-Stack Dev", status: "Official" }
    ],
    emoji: "🎨",
    type: "Agency / Collaboration"
  }
];

// --- 2. ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 }
  }
};

// Seamless Infinite Shine
const shineVariants: Variants = {
  animate: { 
    x: ["-100%", "200%"], // Moves across and out of view
    transition: { 
      repeat: Infinity, 
      duration: 3,        // Adjust speed here (higher = slower)
      ease: "linear",     // Crucial for smoothness
    } 
  }
};

export default function ProjectsPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto"
    >
      {/* --- SECTION HEADER --- */}
      <motion.div 
        variants={cardVariants}
        className="flex items-center gap-4 border-b-[3px] border-dashed border-[#8b5a2b] pb-6"
      >
        <motion.div 
          animate={{ rotate: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="bg-[#c45a5a] text-white p-3 rounded-xl shadow-md"
        >
          <Star fill="currentColor" size={24} />
        </motion.div>
        <div>
          <h2 className="text-3xl font-[1000] text-[#5d3d1e] uppercase tracking-tighter italic">The Archive</h2>
          <p className="text-sm font-black text-[#4a632a] uppercase tracking-widest">Selected Works & Projects</p>
        </div>
      </motion.div>

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PROJECTS.map((project) => (
          <motion.div 
            key={project.id}
            variants={cardVariants}
            className="relative group h-full"
          >
            {/* Background Sticker Shadow */}
            <div className="absolute inset-0 bg-[#8b5a2b] rounded-[2.5rem] translate-x-3 translate-y-3 opacity-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300" />
            
            <div className="relative bg-white border-[4px] border-[#8b5a2b] rounded-[2.5rem] p-7 shadow-md overflow-hidden h-full flex flex-col">
              
              {/* LIVE FEED PREVIEW */}
              <motion.a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full aspect-video bg-[#fdfcf0] rounded-[1.5rem] border-[3px] border-dashed mb-6 overflow-hidden relative group/iframe shadow-inner"
                style={{ borderColor: project.accent }}
                whileHover={{ scale: 1.01 }}
              >
                <iframe 
                  src={project.link} 
                  title={`${project.title} Preview`}
                  className="absolute top-0 left-0 w-[1280px] h-[720px] origin-top-left scale-[0.25] md:scale-[0.3] border-none pointer-events-none opacity-90 group-hover/iframe:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                />

                {/* --- SEAMLESS GLASS SHINE --- */}
                <motion.div 
                  variants={shineVariants}
                  animate="animate"
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    width: '100%',
                    transform: 'skewX(-20deg)'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
                
                <div 
                  className="absolute bottom-3 right-3 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase shadow-lg flex items-center gap-2 z-20"
                  style={{ backgroundColor: project.accent }}
                >
                  <MousePointer2 size={10} /> Visit Site
                </div>
              </motion.a>

              {/* PROJECT INFO */}
              <div className="flex justify-between items-center mb-4">
                <div 
                  className="text-white px-4 py-1.5 rounded-full text-[10px] font-black border-[2.5px] border-[#8b5a2b] shadow-md uppercase flex items-center gap-2"
                  style={{ backgroundColor: project.accent }}
                >
                  {project.id === 2 ? <Users size={12} /> : <Sparkles size={12} />}
                  {project.type}
                </div>
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                    <Heart size={22} className="text-[#c45a5a]" fill="#c45a5a" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-[1000] text-[#5d3d1e] mb-2 uppercase tracking-tight">
                {project.title} {project.emoji}
              </h3>
              
              <p className="text-[15px] font-bold text-[#5d3d1e]/90 leading-snug mb-6 italic">
                {project.description}
              </p>

              {/* TECHNICAL MANIFEST */}
              <div className="bg-[#fdfcf0] border-[3px] border-[#8b5a2b] rounded-2xl p-5 mb-6 border-dashed bg-opacity-50">
                <span className="text-[11px] font-[1000] uppercase text-[#8b5a2b] block mb-3 tracking-widest">
                  📁 Technical Manifest:
                </span>
                <ul className="space-y-3">
                  {project.manifest.map((item, idx) => (
                    <li key={idx} className="text-[13px] font-black text-[#3d5223] flex justify-between items-center">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: project.accent }} />
                        {item.label}
                      </span>
                      <span className="text-[#c45a5a] bg-[#c45a5a]/10 px-2.5 py-1 rounded-md border-2 border-[#c45a5a]/20 text-[10px]">
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FOOTER */}
              <div className="mt-auto flex items-center justify-between pt-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-black bg-[#8b5a2b] text-white px-2.5 py-1 rounded shadow-sm uppercase border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-[#c45a5a] text-white rounded-2xl shadow-lg border-[3px] border-[#8b5a2b]"
                >
                  <ExternalLink size={20} strokeWidth={3} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- PAGE FOOTER --- */}
      <motion.footer 
        variants={cardVariants}
        className="flex flex-col items-center gap-6 pt-10"
      >
        <div className="flex gap-4">
           <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://github.com/PixelStudio330" target="_blank" className="p-3 bg-white border-2 border-[#8b5a2b] rounded-full text-[#c45a5a] shadow-md transition-shadow hover:shadow-lg"><Apple size={20}/></motion.a>
           <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://pixel-studio-opal.vercel.app/" target="_blank" className="p-3 bg-white border-2 border-[#8b5a2b] rounded-full text-[#ef476f] shadow-md transition-shadow hover:shadow-lg"><Cherry size={20}/></motion.a>
        </div>
        <div className="bg-[#f2ead3] px-10 py-4 rounded-2xl border-[3px] border-[#8b5a2b] text-sm font-[1000] text-[#8b5a2b] uppercase tracking-[0.3em] shadow-xl rotate-1">
          🌸 All Systems Operational 🌸
        </div>
      </motion.footer>
    </motion.div>
  );
}