"use client";
import "./globals.css";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import SparkleTrail from './components/SparkleTrail'; 
import { X, Music, Play, Pause, SkipForward, SkipBack, Disc, ListMusic, Heart } from 'lucide-react';
import Lenis from 'lenis';

const tracks = [
  { id: 1, title: "Touch", artist: "KATSEYE", src: "/musics/touch.mp4" },
  { id: 2, title: "Soda Pop", artist: "Saja Boys", src: "/musics/soda-pop.mp4" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'More Projects', path: '/projects' },
    { name: 'Contact Me', path: '/contact' },
    { name: 'Skill Archive', path: '/skills' },
  ];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLibrary, setShowLibrary] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const libraryRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentTrack = tracks[trackIndex];

  // Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current, 
      content: scrollContainerRef.current.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Scroll Animations
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const waveEffect = useTransform(smoothY, [0, 1], [0, -20]);

  // Close Library on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (libraryRef.current && !libraryRef.current.contains(event.target as Node)) {
        setShowLibrary(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Audio Logic
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <html lang="en">
      <head>
        <style>{`
          body, html { overflow: hidden !important; height: 100% !important; margin: 0; padding: 0; position: fixed; width: 100%; }
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(139,90,43,0.05); }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #8b5a2b; border-radius: 4px; border: 2px solid #fffdf5; }
          .lenis-container { touch-action: pan-y; -webkit-overflow-scrolling: touch; }
          .nav-link-fix { position: relative; z-index: 9999 !important; pointer-events: auto !important; }
        `}</style>
      </head>
      <body className="h-full bg-[#fdfcf0] flex items-center justify-center font-serif selection:bg-[#ff9a9e] text-[#83B2DE] relative">
        
        <SparkleTrail />

        {/* EXTERNAL DESK BACKGROUND (The Dots) */}
        <div className="fixed inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundColor: '#fdfcf0',
            backgroundImage: `radial-gradient(#90be6d 4px, transparent 4px)`,
            backgroundSize: '50px 50px' 
          }} 
        />
        
        {/* MAIN WINDOW */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: waveEffect }}
          className="relative z-30 w-[95%] md:w-full max-w-5xl h-[88vh] border-[3px] border-[#8b5a2b] rounded-[1.5rem] md:rounded-[2rem] shadow-[0px_10px_0px_0px_rgba(139,90,43,0.1)] bg-[#fffdf5] flex flex-col overflow-hidden"
        >
          {/* INTERNAL CONTENT BACKGROUND (Clean - No Dots) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="w-full h-full" 
              style={{ 
                backgroundImage: "url('/img/body2.jpg')", 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
              }} 
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>

          <div className="relative z-10 flex flex-col w-full h-full overflow-hidden">
            <Header />

            {/* TAB NAVIGATION */}
            <nav className="relative z-[60] hidden md:flex bg-[#f2ead3]/80 backdrop-blur-md px-6 gap-1 pt-2 border-b-[3px] border-[#8b5a2b] shrink-0">
              {tabs.map((tab) => (
                <Link key={tab.path} href={tab.path} className="nav-link-fix">
                  <div className={`px-6 py-2 rounded-t-xl border-t-2 border-x-2 border-[#8b5a2b] transition-all text-xs font-bold flex items-center gap-3 ${
                    pathname === tab.path ? 'bg-[#fffdf5] -mb-[3px] z-10 text-[#5d3d1e]' : 'bg-[#e8dec0] opacity-70 hover:opacity-100 text-[#8b5a2b]'
                  }`}>
                    {tab.name} <X size={10} className="opacity-30" />
                  </div>
                </Link>
              ))}
            </nav>

            {/* SCROLLABLE AREA */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar relative z-20 lenis-container">
                <div className="relative z-10 min-h-full">
                  {children}
                  <Footer />
                </div>
            </div>
          </div>
        </motion.div>

        {/* MUSIC PLAYER */}
        <div ref={libraryRef} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end gap-3 scale-75 md:scale-100 origin-bottom-right">
          <audio 
            ref={audioRef} 
            key={currentTrack.id}
            src={currentTrack.src} 
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setTrackIndex((prev) => (prev + 1) % tracks.length)}
          />

          <AnimatePresence>
            {showLibrary && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="bg-[#fffdf5] border-[3px] border-[#8b5a2b] rounded-2xl p-4 shadow-[6px_6px_0px_0px_#8b5a2b] w-64 md:w-72 mb-2"
              >
                <div className="flex items-center justify-between mb-3 border-b-2 border-[#8b5a2b]/10 pb-2">
                  <h3 className="text-[10px] font-black text-[#8b5a2b] uppercase tracking-widest flex items-center gap-2">
                    <Music size={12} /> Music Library
                  </h3>
                  <button onClick={() => setShowLibrary(false)} className="text-[#8b5a2b]"><X size={14} /></button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {tracks.map((track, index) => (
                    <button 
                      key={track.id}
                      onClick={() => { setTrackIndex(index); setIsPlaying(true); }}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between ${
                        trackIndex === index ? "bg-[#90be6d] text-white" : "text-[#5d3d1e] hover:bg-[#90be6d]/10"
                      }`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold truncate">{track.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="bg-[#fffdf5] border-[3px] border-[#8b5a2b] rounded-2xl p-3 shadow-[6px_6px_0px_0px_#8b5a2b] flex items-center gap-4 relative">
            <button 
              onClick={() => setShowLibrary(!showLibrary)}
              className={`absolute -top-3 -left-3 p-2.5 rounded-full border-[3px] border-[#8b5a2b] shadow-md transition-all ${showLibrary ? 'bg-[#c45a5a] text-white' : 'bg-[#ffd166] text-[#8b5a2b]'}`}
            >
              <ListMusic size={16} strokeWidth={3} />
            </button>

            <div className={`w-10 h-10 bg-[#8b5a2b] rounded-full flex items-center justify-center border-2 border-[#fffdf5] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: '3s' }}>
              <Disc size={20} className="text-white/40" />
            </div>

            <div className="flex flex-col min-w-[130px]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#5d3d1e] truncate">{currentTrack.title}</span>
                {isPlaying && <Heart size={8} fill="#c45a5a" className="text-[#c45a5a]" />}
              </div>
              <span className="text-[9px] font-bold text-[#8b5a2b]">{currentTrack.artist}</span>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)}><SkipBack size={14} fill="currentColor" /></button>
                <button onClick={togglePlay}>{isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
                <button onClick={() => setTrackIndex((prev) => (prev + 1) % tracks.length)}><SkipForward size={14} fill="currentColor" /></button>
              </div>
            </div>

            <div className="w-1.5 h-10 bg-[#8b5a2b]/10 rounded-full overflow-hidden flex flex-col-reverse">
              <motion.div animate={{ height: `${progress}%` }} className="w-full bg-[#90be6d]" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}