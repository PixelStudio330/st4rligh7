"use client";
import "./globals.css";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import SparkleTrail from './components/SparkleTrail'; 
import { X, Music, Play, Pause, SkipForward, SkipBack, Disc, ListMusic, Volume2, Heart } from 'lucide-react';
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
    { name: 'Skill Archieve', path: '/skills' },
  ];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLibrary, setShowLibrary] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const libraryRef = useRef<HTMLDivElement>(null);

  const currentTrack = tracks[trackIndex];

  // --- MAC-STYLE SMOOTH SCROLL (LENIS) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // --- SCROLL ANIMATION LOGIC ---
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  // Subtle vertical "wave" shift for the main card
  const waveEffect = useTransform(smoothY, [0, 1], [0, -20]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (libraryRef.current && !libraryRef.current.contains(event.target as Node)) {
        setShowLibrary(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [libraryRef]);

  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new AudioContextClass();
      const gainNode = ctx.createGain();
      const source = ctx.createMediaElementSource(audioRef.current);
      gainNode.gain.value = 2.0; 
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      audioContextRef.current = ctx;
      gainNodeRef.current = gainNode;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioContextRef.current?.resume();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex]);

  const togglePlay = () => {
    if (audioRef.current && currentTrack.src) {
      audioContextRef.current?.resume();
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play interrupted"));
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
          /* Lenis Essential CSS */
          html.lenis { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto !important; }
          .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
          .lenis.lenis-stopped { overflow: hidden; }
          .lenis.lenis-scrolling iframe { pointer-events: none; }

          /* Scrollbar Styling */
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #8b5a2b; border-radius: 10px; }
          
          /* Ensuring pointer events work correctly */
          a, button, [role="button"] {
            pointer-events: auto !important;
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-[#fdfcf0] pt-6 md:pt-12 pb-24 px-2 md:px-8 font-serif selection:bg-[#ff9a9e] relative text-[#83B2DE] overflow-x-hidden">
        
        <SparkleTrail />

        <div className="fixed inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundColor: '#fdfcf0',
            backgroundImage: `radial-gradient(#90be6d 3px, transparent 3px)`,
            backgroundSize: '30px 30px' 
          }} 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: waveEffect }}
          className="relative z-10 w-full max-w-4xl mx-auto border-[3px] border-[#8b5a2b] rounded-[1.5rem] md:rounded-[2rem] shadow-[0px_10px_0px_0px_rgba(139,90,43,0.1)] bg-[#fffdf5] flex flex-col overflow-hidden h-fit mb-10"
        >
          <div className="absolute inset-0 z-0 pointer-events-none" 
               style={{ backgroundImage: "url('/img/body2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

          <div className="relative z-10 flex flex-col w-full h-full">
            <Header />

            <nav className="relative z-50 hidden md:flex bg-[#f2ead3] px-6 gap-1 pt-2 border-b-[3px] border-[#8b5a2b] shrink-0">
              {tabs.map((tab) => (
                <Link key={tab.path} href={tab.path} className="block">
                  <div className={`px-6 py-2 rounded-t-xl border-t-2 border-x-2 border-[#8b5a2b] transition-all text-xs font-bold flex items-center gap-3 ${
                    pathname === tab.path ? 'bg-[#fffdf5] -mb-[3px] z-10 text-[#5d3d1e]' : 'bg-[#e8dec0] opacity-70 hover:opacity-100 text-[#8b5a2b]'
                  }`}>
                    {tab.name} <X size={10} className="opacity-30" />
                  </div>
                </Link>
              ))}
            </nav>

            <div className="flex-1 min-h-[300px] relative z-20">{children}</div>
            <Footer />
          </div>
        </motion.div>

        {/* Music Player UI */}
        <div ref={libraryRef} className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 scale-90 md:scale-100 origin-bottom-right">
          <audio 
            ref={audioRef} 
            key={currentTrack.id}
            src={currentTrack.src} 
            crossOrigin="anonymous"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
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
                  <button onClick={() => setShowLibrary(false)} className="text-[#8b5a2b]">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {tracks.map((track, index) => (
                    <button 
                      key={track.id}
                      onClick={() => { setTrackIndex(index); setIsPlaying(true); }}
                      className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between group/item ${
                        trackIndex === index ? "bg-[#90be6d] text-white" : "text-[#5d3d1e] hover:bg-[#90be6d]/10"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] md:text-[11px] font-bold truncate">{track.title}</span>
                      </div>
                      {trackIndex === index && isPlaying && (
                        <div className="flex gap-0.5 items-end h-3 ml-2 shrink-0">
                          <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                          <motion.div animate={{ height: [10, 4, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="bg-[#fffdf5] border-[3px] border-[#8b5a2b] rounded-2xl p-3 shadow-[6px_6px_0px_0px_#8b5a2b] flex items-center gap-4 relative">
            <AnimatePresence>
              {!showLibrary && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                    rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-16 left-[-18px] flex flex-col items-center pointer-events-none z-30"
                >
                  <div className="bg-[#ffd166] text-[#8b5a2b] text-[10px] font-black px-3 py-1.5 rounded-lg border-[3px] border-[#8b5a2b] shadow-sm whitespace-nowrap rotate-[-10deg]">
                    CLICK FOR PLAYLIST!
                  </div>
                  <div className="w-3 h-3 bg-[#ffd166] border-r-[3px] border-b-[3px] border-[#8b5a2b] rotate-45 -mt-1 mr-1" />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
                onClick={() => setShowLibrary(!showLibrary)}
                className={`absolute -top-3 -left-3 p-2.5 rounded-full border-[3px] border-[#8b5a2b] shadow-md z-20 transition-all hover:scale-110 active:scale-95 pointer-events-auto ${showLibrary ? 'bg-[#c45a5a] text-white' : 'bg-[#ffd166] text-[#8b5a2b]'}`}
              >
                <ListMusic size={16} strokeWidth={3} />
                {!showLibrary && (
                  <span className="absolute inset-0 rounded-full bg-[#ffd166] animate-ping opacity-30" />
                )}
            </button>

            <div className="absolute -bottom-2 -right-2 bg-[#90be6d] text-white p-1 rounded-full border-2 border-[#fffdf5] shadow-sm">
              <Volume2 size={10} />
            </div>

            <div className={`relative flex-shrink-0 w-10 h-10 bg-[#8b5a2b] rounded-full flex items-center justify-center border-2 border-[#fffdf5] shadow-sm ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: '3s' }}>
              <Disc size={20} className="text-white/40" />
              <div className="absolute w-2 h-2 bg-[#fffdf5] rounded-full" />
            </div>

            <div className="flex flex-col min-w-[130px] max-w-[150px]">
              <div className="flex flex-col leading-tight">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#5d3d1e] truncate">{currentTrack.title}</span>
                    {isPlaying && (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>
                        <Heart size={8} fill="#c45a5a" className="text-[#c45a5a]" />
                      </motion.div>
                    )}
                 </div>
                 <span className="text-[9px] font-bold text-[#8b5a2b] opacity-80 truncate">
                   {currentTrack.artist}
                 </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)} className="text-[#8b5a2b] hover:text-[#c45a5a] transition-colors">
                  <SkipBack size={14} fill="currentColor" />
                </button>
                <button onClick={togglePlay} className="text-[#c45a5a] hover:scale-110 transition-transform">
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                <button onClick={() => setTrackIndex((prev) => (prev + 1) % tracks.length)} className="text-[#8b5a2b] hover:text-[#c45a5a] transition-colors">
                  <SkipForward size={14} fill="currentColor" />
                </button>
              </div>
            </div>

            <div className="w-1.5 h-10 bg-[#8b5a2b]/10 rounded-full overflow-hidden flex flex-col-reverse ml-1">
              <motion.div animate={{ height: `${progress}%` }} className="w-full bg-[#90be6d]" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}