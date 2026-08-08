'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Fine-tuned parallax calculations for the hero title
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

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
    </div>
  );
}
