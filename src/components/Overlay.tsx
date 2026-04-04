'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Fine-tuned parallax calculations
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const text2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const text2X = useTransform(scrollYProgress, [0.2, 0.5], [-100, 100]);

  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const text3X = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 flex flex-col justify-center items-center">
      {/* 0% Section */}
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

      {/* 30% Section */}
      <motion.div 
        style={{ opacity: text2Opacity, x: text2X }} 
        className="absolute inset-0 flex items-center justify-start p-10 md:p-32"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white max-w-2xl leading-tight drop-shadow-2xl">
          I craft cinematic visual stories.
        </h2>
      </motion.div>

      {/* 60% Section */}
      <motion.div 
        style={{ opacity: text3Opacity, x: text3X }} 
        className="absolute inset-0 flex items-center justify-end p-10 md:p-32 text-right"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white max-w-2xl leading-tight drop-shadow-2xl">
          Turning footage into emotion and impact.
        </h2>
      </motion.div>
    </div>
  );
}
