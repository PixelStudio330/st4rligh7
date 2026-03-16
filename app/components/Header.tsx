"use client";
import React, { useState } from 'react';
import { RotateCw, Search, X, Menu, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
    { name: 'Skills', path: '/skills' },
  ];

  return (
    <div className="z-[60] relative">
      {/* --- BROWSER HEADER --- */}
      <header 
        className="bg-[#FFE6ED] p-3 flex items-center justify-between border-b-[3px] border-[#8b5a2b]"
        style={{ 
          backgroundImage: 'radial-gradient(#F7CAD5 2px, transparent 2px)', 
          backgroundSize: '10px 10px' 
        }}
      >
        <div className="flex items-center gap-2 px-4 py-1 bg-white/60 rounded-full border-2 border-[#fffdf5] backdrop-blur-sm shadow-sm">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="w-5 h-5 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[10px]"
          >
            🌸
          </motion.div>
          <span className="text-[10px] md:text-xs font-[1000] tracking-tight text-[#CF7486] uppercase truncate max-w-[150px] md:max-w-none">
            https://st4rligh7.dev
          </span>
        </div>

        <div className="flex gap-2 items-center">
          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-[#fffdf5] border-[3px] border-[#8b5a2b] flex items-center justify-center text-[#c45a5a] shadow-[3px_3px_0px_0px_#8b5a2b] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            {isOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
          </button>

          {/* Window Controls */}
          <div className="hidden sm:flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/40 border-2 border-white/60 flex items-center justify-center text-[#CF7486] text-xs font-bold">-</div>
            <div className="w-7 h-7 rounded-lg bg-white/40 border-2 border-white/60 flex items-center justify-center text-[#CF7486] text-xs font-bold">□</div>
            <div className="w-7 h-7 rounded-lg bg-[#ff6b6b] border-2 border-[#8b5a2b] flex items-center justify-center text-white text-xs shadow-sm">
              <X size={14} strokeWidth={3}/>
            </div>
          </div>
        </div>
      </header>

      {/* --- URL BAR --- */}
      <div 
        className="bg-[#c45a5a] p-2 flex items-center gap-3 border-b-[3px] border-[#8b5a2b]"
        style={{ backgroundImage: 'radial-gradient(#d66d6d 2px, transparent 2px)', backgroundSize: '12px 12px' }}
      >
        <div className="hidden sm:flex gap-2 text-white/80 ml-2 hover:rotate-180 transition-transform duration-500">
          <RotateCw size={18} />
        </div>
        <div className="flex-1 bg-[#fffdf5] border-2 border-[#8b5a2b] rounded-md px-4 py-1.5 text-sm font-black text-[#8b5a2b] flex justify-between items-center shadow-inner group">
          <span className="truncate opacity-70 group-hover:opacity-100 transition-opacity">
            st4rligh7.world{pathname === "/" ? "" : pathname}
          </span>
          <Search size={16} className="opacity-50 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="md:hidden bg-[#fffdf5] border-b-[3px] border-[#8b5a2b] overflow-hidden shadow-xl"
          >
            <div className="p-4 space-y-2">
              {tabs.map((tab) => (
                <Link 
                  key={tab.path} 
                  href={tab.path}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-4 rounded-2xl text-sm font-[1000] uppercase tracking-wider flex items-center justify-between transition-all ${
                      pathname === tab.path 
                        ? 'bg-[#90be6d] text-white shadow-[4px_4px_0px_0px_#5a7d32] border-2 border-[#8b5a2b]' 
                        : 'text-[#8b5a2b] border-2 border-transparent hover:border-[#8b5a2b]/20'
                    }`}
                  >
                    {tab.name}
                    {pathname === tab.path && <Star size={14} fill="white" />}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}