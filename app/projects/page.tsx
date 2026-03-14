"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion'; 
import { 
  ExternalLink, 
  Star, 
  Heart, 
  MousePointer2, 
  Sparkles, 
  Users, 
  PawPrint, 
  ChefHat 
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    }
  }
};

const tagVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1, 
    rotate: [0, -2, 2, 0], 
    transition: { duration: 0.2 } 
  }
};

export default function ProjectsPage() {
  /**
   * HOW TO ADD A NEW PROJECT:
   * 1. Add a new object {} to the 'projects' array below.
   * 2. 'id': Ensure it's unique.
   * 3. 'items': Use the "Title - Status" format. The code splits them at the " - " 
   * to style the right side (Status) with a red border and the left side (Title) with a dot.
   * 4. 'accent': Choose a hex color that matches the project's branding.
   */
  const projects = [
    {
      id: 5,
      title: "Chirp Heavens",
      description: "A professional bird shop template featuring a corporate-clean aesthetic. Built for high-conversion with a sophisticated product algorithm.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      link: "https://chirp-heaven.vercel.app/",
      accent: "#4A90E2", // Sky Blue accent
      items: ["Bird Discovery - Product Algorithm", "Order Logistics - Live Tracking", "Functional Nest - Smart Cart"],
      emoji: "🐦",
      type: "Bird Shop Template"
    },
    {
      id: 4,
      title: "The Dum Pot",
      description: "A premium Biryani delivery experience. Featuring a complex state-managed ordering system, persistent cart logic, and a slow-cooked aesthetic.",
      tags: ["Next.js", "Framer Motion", "Tailwind", "Lucide"],
      link: "https://the-dum-pot.vercel.app/",
      accent: "#FF9933",
      items: ["Smart Order Blocker - Live State", "Dynamic Menu - Interactive", "Persistent Feast - Cart Logic"],
      emoji: "🍲",
      type: "E-commerce Experience"
    },
    {
      id: 1,
      title: "Honey Haze",
      description: "A cozy bakery management system and storefront. Built with a full-stack approach to handle delicious treats and orders with a sweet touch.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      link: "https://honey-haze.vercel.app/",
      accent: "#FFB347",
      items: ["AI delivery man - Order tracker", "Interactive cart - Stunning UI"],
      emoji: "🍯",
      type: "Experimental Full-Stack Project"
    },
    {
      id: 2,
      title: "Pawsky Wawsky",
      description: "A documentary-style pet sanctuary template designed for emotional storytelling. Features high-end performance with a scrapbook aesthetic.",
      tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
      link: "https://pawsky-wawsky.vercel.app/",
      accent: "#76A8D6",
      items: ["Pet Profiles - Live Demo", "Modern Architecture - Optimized"],
      emoji: "🐾",
      type: "Pet Shop Template"
    },
    {
      id: 3,
      title: "PixelStudio",
      description: "Our official creative agency HQ. A collaboration with Nova for building high-end, artsy digital solutions for global clients.",
      tags: ["Next.js", "TypeScript", "Tailwind", "React", "Vercel"],
      link: "https://pixel-studio-opal.vercel.app/",
      accent: "#729d4d",
      items: ["Custom Web Design - Inquire", "Full-Stack Dev - Official"],
      emoji: "🎨",
      type: "Agency / Collaboration"
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-10 space-y-12"
    >
      {/* SECTION HEADER */}
      <motion.div 
        variants={cardVariants}
        className="flex items-center gap-4 border-b-[3px] border-dashed border-[#8b5a2b] pb-6"
      >
        <motion.div 
          animate={{ rotate: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="bg-[#c45a5a] text-white p-3 rounded-xl shadow-md"
        >
          <Star fill="currentColor" size={24} />
        </motion.div>
        <div>
          <h2 className="text-3xl font-[900] text-[#5d3d1e] uppercase tracking-tighter italic">The Archive</h2>
          <p className="text-sm font-black text-[#4a632a] uppercase tracking-widest">Hand-crafted code & design</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            variants={cardVariants}
            whileHover="hover"
            className="relative group col-span-1"
          >
            {/* Background Sticker Shadow */}
            <div className="absolute inset-0 bg-[#8b5a2b] rounded-[2.5rem] translate-x-3 translate-y-3 opacity-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
            
            <div className="relative bg-white border-[4px] border-[#8b5a2b] rounded-[2.5rem] p-7 shadow-md overflow-hidden h-full flex flex-col">
              
              {/* LIVE FEED PREVIEW */}
              <motion.a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full aspect-video bg-[#fdfcf0] rounded-[1.5rem] border-[3px] border-dashed mb-6 overflow-hidden relative group/iframe shadow-inner"
                style={{ borderColor: project.accent }}
                whileHover={{ scale: 1.02 }}
              >
                <iframe 
                  src={project.link} 
                  title={`${project.title} Live Preview`}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[1280px] h-[720px] origin-top scale-[0.25] md:scale-[0.3] border-none pointer-events-none transition-opacity duration-500 group-hover/iframe:opacity-80"
                  loading="lazy"
                />
                
                {/* Overlay Shimmer */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none skew-x-12"
                />

                <div 
                  className="absolute bottom-3 right-3 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: project.accent }}
                >
                  <MousePointer2 size={10} /> Visit Live Site
                </div>
              </motion.a>

              {/* PROJECT TYPE TAG */}
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-white px-4 py-1.5 rounded-full text-[10px] font-black border-[2.5px] border-[#8b5a2b] -rotate-1 shadow-md uppercase flex items-center gap-2"
                  style={{ backgroundColor: project.accent }}
                >
                  {/* Dynamic Icon selection based on ID or Type */}
                  {project.id === 3 ? <Users size={12} /> : (project.id === 2 || project.id === 5) ? <PawPrint size={12} /> : project.id === 4 ? <ChefHat size={12} /> : <Sparkles size={12} />}
                  {project.type}
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart size={22} className="text-[#c45a5a]" fill="#c45a5a" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-[1000] text-[#5d3d1e] mb-2 uppercase tracking-tight">
                {project.title} {project.emoji}
              </h3>
              
              <p className="text-[15px] font-bold text-[#5d3d1e]/90 leading-snug mb-6 italic">
                {project.description}
              </p>

              {/* PROJECT MANIFEST */}
              <div className="bg-[#fdfcf0] border-[3px] border-[#8b5a2b] rounded-2xl p-5 mb-6 border-dashed bg-opacity-50">
                <span className="text-[11px] font-[1000] uppercase text-[#8b5a2b] block mb-3 tracking-[0.1em]">
                  📁 Project Manifest / Status:
                </span>
                <ul className="space-y-3">
                  {project.items?.map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      whileHover={{ x: 5 }}
                      className="text-[13px] font-black text-[#3d5223] flex justify-between items-center"
                    >
                      <span className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: project.accent }} />
                        {item.split(' - ')[0]}
                      </span>
                      <span className="text-[#c45a5a] bg-[#c45a5a]/10 px-2.5 py-1 rounded-md border-2 border-[#c45a5a]/20">
                        {item.split(' - ')[1]}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* TECH STACK & LINK */}
              <div className="mt-auto flex items-center justify-between pt-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <motion.span 
                      key={tag} 
                      variants={tagVariants}
                      whileHover="hover"
                      className="text-[10px] font-black bg-[#8b5a2b] text-white px-2.5 py-1 rounded shadow-sm uppercase"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-[#c45a5a] text-white rounded-2xl shadow-lg border-[3px] border-[#8b5a2b]"
                >
                  <ExternalLink size={20} strokeWidth={3} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER DECORATION */}
      <motion.div 
        variants={cardVariants}
        className="flex justify-center py-10"
      >
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="bg-[#f2ead3] px-10 py-4 rounded-2xl border-[3px] border-[#8b5a2b] text-sm font-[1000] text-[#8b5a2b] uppercase tracking-[0.3em] shadow-xl rotate-1"
        >
          🌸 All Systems Operational 🌸
        </motion.div>
      </motion.div>
    </motion.div>
  );
}