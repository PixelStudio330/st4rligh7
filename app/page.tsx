"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link"; 
import {
  Heart,
  Star,
  Cherry,
  Apple,
  ExternalLink,
  Sparkles,
  Cloud,
  Sun,
} from "lucide-react";

export default function Dashboard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const floating: Variants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, -10, 0],
      rotate: [-1, 1, -1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const wobbleHover: Variants = {
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -2, 0],
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 sm:px-6 md:px-10 py-8 md:py-10 space-y-12 md:space-y-16 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Background Elements */}
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

      {/* TOP SECTION: BIO, HERO, LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
        {/* BIO */}
        <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="flex items-center gap-3 cursor-default w-fit"
            >
              <span className="bg-[#90be6d] text-white px-4 py-1.5 rounded-lg font-[1000] text-base uppercase shadow-[4px_4px_0px_0px_#5a7d32] border-2 border-white/20">
                Nyra
              </span>
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xl sm:text-2xl"
              >
                🍎
              </motion.span>
            </motion.div>

            <motion.div
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="bg-[#c45a5a] text-white text-[10px] px-3 py-1 inline-block font-[1000] rounded-md tracking-[0.2em] uppercase border-2 border-white/30 shadow-sm"
            >
              Artsy | Front-end Dev
            </motion.div>
          </div>

          <div className="text-sm sm:text-[15px] leading-relaxed font-[1000] text-[#5d3d1e] space-y-4">
            <div className="flex items-center gap-2">
              <motion.span
                whileHover={{ scale: 1.5, rotate: 20 }}
                className="text-lg sm:text-xl cursor-pointer"
              >
                🥪
              </motion.span>
              <span>
                Site by{" "}
                <span className="underline decoration-[#90be6d] decoration-[3px] underline-offset-4">
                  Nyra
                </span>
                !
              </span>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#fffdf5]/90 p-5 sm:p-6 rounded-[2rem] border-[3px] border-[#90be6d]/40 shadow-xl italic text-[#3d5223] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#90be6d]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <p className="relative z-10">
                I’m a 14-year-old front-end developer based in Bangladesh. I
                love adding artsy touch to my projects and exploring new design
                trends.
              </p>
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -bottom-1 -right-1"
              >
                <Sparkles size={26} className="text-[#ffd166]" fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex justify-center">
          <motion.div
            variants={floating}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="relative group w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] cursor-pointer"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-10 bg-[#ffd166]/80 -rotate-3 z-30 shadow-sm mix-blend-multiply border-x-2 border-[#8b5a2b]/10" />
            <div className="absolute inset-0 bg-[#8b5a2b] rounded-[3rem] translate-x-4 translate-y-4 opacity-20" />
            <div className="relative aspect-square bg-[#fffdf5] border-[6px] border-[#8b5a2b] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="/img/id.png"
                alt="Nyra"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <motion.div
                whileHover={{ scale: 1.2, rotate: 45 }}
                className="absolute top-4 right-4 bg-[#90be6d] text-white p-2.5 rounded-full border-[3px] border-[#8b5a2b] shadow-lg"
              >
                <Star size={20} fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* LINKS */}
        <motion.div variants={itemVariants} className="md:col-span-4 space-y-8">
          <motion.div
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="bg-[#90be6d] text-white px-6 py-4 rounded-2xl text-center font-[1000] border-b-[6px] border-[#5a7d32] uppercase tracking-widest shadow-lg"
          >
            Find Me Here~
          </motion.div>

          <ul className="space-y-6 px-2 sm:px-4">
            {[
              { icon: <Apple size={24} />, label: "GitHub", color: "#c45a5a", url: "https://github.com/PixelStudio330" },
              { icon: <Cherry size={24} />, label: "PixelStudio", color: "#ef476f", url: "https://pixel-studio-opal.vercel.app/" },
              { icon: <Heart size={24} />, label: "Instagram", color: "#ff6b6b", url: "https://www.instagram.com/certi.fried_dora/" },
            ].map((link, i) => (
              <motion.li key={i} variants={wobbleHover} whileHover="hover" whileTap="tap">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 text-base sm:text-lg font-[1000] group"
                >
                  <motion.span
                    style={{ color: link.color }}
                    className="p-3 bg-white rounded-2xl shadow-md border-2 border-[#8b5a2b]/10 group-hover:shadow-pink-200/50 transition-all"
                  >
                    {link.icon}
                  </motion.span>
                  <span className="text-[#5d3d1e] border-b-2 border-dashed border-[#8b5a2b]/30 group-hover:text-[#c45a5a] group-hover:border-[#c45a5a] transition-colors">
                    {link.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* PROJECT PREVIEW SECTION */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center pt-6 md:pt-8">
        {/* LIVE IFRAME CARD */}
        <motion.a
          href="https://pixel-studio-opal.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -10, scale: 1.01 }}
          className="md:col-span-7 relative block group"
        >
          <div className="absolute inset-0 bg-[#8b5a2b] rounded-[3rem] translate-x-4 translate-y-4 opacity-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-all" />
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-white border-[5px] border-[#8b5a2b] rounded-[3rem] p-4 sm:p-5 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-[#fdfcf0] rounded-[2rem] border-[4px] border-[#90be6d] border-dashed overflow-hidden relative group-hover:border-solid transition-all">
              <iframe
                src="https://pixel-studio-opal.vercel.app/"
                className="w-[200%] h-[200%] origin-top-left scale-[0.5] border-none pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-[#e29494] text-white text-[10px] sm:text-[12px] px-4 py-2 sm:px-8 sm:py-4 rounded-2xl sm:rounded-3xl font-[1000] border-[3px] sm:border-[4px] border-[#a65d5d] uppercase italic tracking-wider shadow-[0_4px_0_0_#a65d5d] sm:shadow-[0_6px_0_0_#a65d5d] flex items-center gap-2 cursor-pointer z-20 transition-all active:translate-y-1 active:shadow-none">
                Visit Studio <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
              </div>
            </div>
          </div>
        </motion.a>

        {/* PROJECT INFO + POLISHED BUTTON */}
        <motion.div variants={floating} initial="initial" animate="animate" className="md:col-span-5">
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="bg-[#fffdf5] border-[5px] border-[#8b5a2b] p-6 sm:p-8 md:p-10 rounded-[3rem] shadow-[12px_12px_0px_0px_#8b5a2b] -rotate-2 relative overflow-hidden flex flex-col gap-6"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#90be6d]/10 rounded-bl-full" />
            
            <div>
              <h4 className="text-2xl sm:text-3xl font-[1000] text-[#5d3d1e] uppercase mb-5 italic flex items-center gap-3">
                PixelStudio <Cherry className="text-[#ef476f]" />
              </h4>
              <p className="text-sm sm:text-[15px] font-[1000] text-[#5d3d1e]/80 leading-relaxed">
                My first website testing backend skills and deploying a full-stack
                project! Built with my fellow friend Nova!
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Next.js", "Tailwind", "React"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -3, backgroundColor: "#90be6d", color: "#fff" }}
                  className="text-[10px] font-black text-[#5a7d32] bg-[#90be6d]/20 px-4 py-2 rounded-xl border-2 border-[#90be6d]/40 cursor-default transition-all"
                >
                  #{tag.toUpperCase()}
                </motion.span>
              ))}
            </div>

            {/* UPDATED: Cleaned up Link syntax - no more error! */}
            <Link 
              href="/projects" 
              className="relative flex items-center justify-center gap-3 w-full"
            >
              <motion.div
                variants={wobbleHover}
                whileHover="hover"
                whileTap="tap"
                className="relative flex items-center justify-center gap-3 w-full bg-[#e29494] text-white py-3 rounded-[1.2rem] font-[1000] border-[4px] border-[#f4c2c2] uppercase italic tracking-[0.15em] overflow-hidden group/btn transition-all duration-300 shadow-[0_6px_0_0_#a65d5d] hover:shadow-[0_2px_0_0_#a65d5d] hover:translate-y-[4px]"
              >
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] group-hover/btn:left-[200%] transition-all duration-1000 ease-in-out" />
                </div>

                <span className="relative z-10 flex items-center justify-center gap-2 text-center text-[13px] sm:text-sm drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)]">
                  View More Projects? 
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    <Sparkles size={18} className="text-[#f4c2c2]" fill="currentColor" />
                  </motion.div>
                </span>

                <div className="absolute inset-[2px] rounded-[1rem] border border-white/20 pointer-events-none z-0" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}