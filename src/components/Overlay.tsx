'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Fine-tuned parallax calculations for the hero title
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Icons parallax down and fade out on scroll
  const iconY = useTransform(scrollYProgress, [0, 0.2], [0, 180]);
  const iconOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 flex flex-col justify-center items-center">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatZoomLeft {
          0% { margin-top: 0px; transform: scale(1) rotate(0deg); }
          50% { margin-top: -45px; transform: scale(1.15) rotate(7deg); }
          100% { margin-top: 0px; transform: scale(1) rotate(0deg); }
        }
        @keyframes floatZoomRight {
          0% { margin-top: 0px; transform: scale(1) rotate(0deg); }
          50% { margin-top: 45px; transform: scale(1.15) rotate(-7deg); }
          100% { margin-top: 0px; transform: scale(1) rotate(0deg); }
        }
        .animate-wiggle-left {
          animation: floatZoomLeft 3.5s ease-in-out infinite;
        }
        .animate-wiggle-right {
          animation: floatZoomRight 3.8s ease-in-out infinite;
        }
      `}} />

      {/* Hero Section */}
      <motion.div 
        style={{ opacity: text1Opacity, y: text1Y }} 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
          Vicky
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white/70 font-light uppercase tracking-[0.3em] drop-shadow-md">
          Creative Video Editor
        </p>
      </motion.div>

      {/* Premiere Pro Icon (Left) */}
      <motion.div 
        style={{ opacity: iconOpacity, y: iconY }}
        className="absolute left-4 md:left-20 lg:left-32 top-[65%] md:top-[45%] -translate-y-1/2 z-20 pointer-events-auto"
      >
        <div className="w-18 h-18 md:w-26 md:h-26 bg-[#03001C] border border-[#9a9aff]/10 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(154,154,255,0.4),0_0_15px_rgba(154,154,255,0.2)] hover:shadow-[0_0_50px_rgba(154,154,255,0.6),0_0_20px_rgba(154,154,255,0.3)] hover:border-[#9a9aff]/30 transition-all duration-300 cursor-pointer animate-wiggle-left">
          <span className="text-[#9a9aff] text-3xl md:text-5xl font-semibold tracking-tighter font-sans select-none">
            Pr
          </span>
        </div>
      </motion.div>

      {/* After Effects Icon (Right) */}
      <motion.div 
        style={{ opacity: iconOpacity, y: iconY }}
        className="absolute right-4 md:right-20 lg:right-32 top-[65%] md:top-[45%] -translate-y-1/2 z-20 pointer-events-auto"
      >
        <div className="w-18 h-18 md:w-26 md:h-26 bg-[#03001C] border border-[#9a9aff]/10 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(154,154,255,0.4),0_0_15px_rgba(154,154,255,0.2)] hover:shadow-[0_0_50px_rgba(154,154,255,0.6),0_0_20px_rgba(154,154,255,0.3)] hover:border-[#9a9aff]/30 transition-all duration-300 cursor-pointer animate-wiggle-right">
          <span className="text-[#9a9aff] text-3xl md:text-5xl font-semibold tracking-tighter font-sans select-none">
            Ae
          </span>
        </div>
      </motion.div>
    </div>
  );
}
