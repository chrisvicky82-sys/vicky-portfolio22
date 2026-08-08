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
        className="absolute left-4 md:left-16 lg:left-24 top-[45%] -translate-y-1/2 z-20 pointer-events-auto"
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 2.5, -2.5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-14 h-14 md:w-20 md:h-20 bg-[#00003b] border border-[#9a9aff]/30 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,59,0.5),0_0_20px_rgba(154,154,255,0.1)] hover:border-[#9a9aff] transition-colors duration-300 cursor-pointer"
        >
          <span className="text-[#9a9aff] text-2xl md:text-4xl font-semibold tracking-tighter font-sans select-none">
            Pr
          </span>
        </motion.div>
      </motion.div>

      {/* After Effects Icon (Right) */}
      <motion.div 
        style={{ opacity: iconOpacity, y: iconY }}
        className="absolute right-4 md:right-16 lg:right-24 top-[45%] -translate-y-1/2 z-20 pointer-events-auto"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [0, -2.5, 2.5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
          className="w-14 h-14 md:w-20 md:h-20 bg-[#00003b] border border-[#9a9aff]/30 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,59,0.5),0_0_20px_rgba(154,154,255,0.1)] hover:border-[#9a9aff] transition-colors duration-300 cursor-pointer"
        >
          <span className="text-[#9a9aff] text-2xl md:text-4xl font-semibold tracking-tighter font-sans select-none">
            Ae
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
