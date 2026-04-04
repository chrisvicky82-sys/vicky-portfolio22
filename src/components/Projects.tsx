'use client';

import { useState, useEffect } from 'react';
import { Play, X, MessageCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// --- DATA ARRAYS ---

const adCreatives = [
  { videoUrl: "/reels/AdCreative1.mp4", title: "Ad Creative 1" },
  { videoUrl: "/reels/AdCreative2.mp4", title: "Ad Creative 2" },
  { videoUrl: "/reels/AdCreative3.mp4", title: "Ad Creative 3" },
  { videoUrl: "/reels/AdCreative4.mp4", title: "Ad Creative 4" },
  { videoUrl: "/reels/AdCreative5.mp4", title: "Ad Creative 5" }
];

const clientWork = [
  { targetUrl: "https://www.instagram.com/reel/DRjvgCoD4S6/", videoUrl: "/reels/ClientProject1.mp4", title: "Client Project 1" },
  { targetUrl: "https://www.instagram.com/reel/DQwMiAVEiMR/", videoUrl: "/reels/ClientProject2.mp4", title: "Client Project 2" },
  { targetUrl: "https://www.instagram.com/reel/DITm6V6ipev/", videoUrl: "/reels/ClientProject3.mp4", title: "Client Project 3" },
  { targetUrl: "https://www.instagram.com/reel/DSKi_cbEtbK/", videoUrl: "/reels/ClientProject4.mp4", title: "Client Project 4" },
  { targetUrl: "https://www.instagram.com/reel/DR12-2tk8jG/", videoUrl: "/reels/ClientProject5.mp4", title: "Client Project 5" }
];

const podcastReels = [
  { targetUrl: "https://www.instagram.com/reel/DOGW5qpgfDI/", videoUrl: "/reels/DOGW5qpgfDI.mp4", title: "Podcast Reel 1" },
  { targetUrl: "https://www.instagram.com/reel/DUvK1QQkncV/", videoUrl: "/reels/DUvK1QQkncV.mp4", title: "Podcast Reel 2" },
  { targetUrl: "https://www.instagram.com/reel/DPoI8bUAZ6r/", videoUrl: "/reels/DPoI8bUAZ6r.mp4", title: "Podcast Reel 3" },
  { targetUrl: "https://www.instagram.com/reel/DWWKSi5AZtr/", videoUrl: "/reels/DWWKSi5AZtr.mp4", title: "Podcast Reel 4" },
  { targetUrl: "https://www.instagram.com/reel/DJ4B0gHJIJX/", videoUrl: "/reels/DJ4B0gHJIJX.mp4", title: "Podcast Reel 5" }
];

const youtubeEdits = [
  { videoUrl: "https://www.youtube.com/embed/nGV715T0Jos", title: "YouTube Podcast 1", ytid: "nGV715T0Jos" },
  { videoUrl: "https://www.youtube.com/embed/DlgBadG_msg", title: "YouTube Podcast 2", ytid: "DlgBadG_msg" },
  { videoUrl: "https://www.youtube.com/embed/OP4VtEeu6t8", title: "YouTube Podcast 3", ytid: "OP4VtEeu6t8" }
];

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 60, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: isMobile ? 0.5 : 0.7, ease: "easeOut" } }
  };

  const titleVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative z-20 bg-[#121212] min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-32">

        {/* 1. Ad Creative Edits */}
        <div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={titleVariant} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
              Ad Creative Edits
              <div className="h-[2px] bg-white/10 flex-1 ml-6 rounded-full" />
            </h2>
            <p className="text-gray-400 mt-4 text-lg font-light tracking-wide">
              High-impact ad creatives optimized for engagement and results
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
          >
            {adCreatives.map((ad, idx) => (
              <motion.div
                key={idx} variants={cardVariant} onClick={() => setActiveVideo({ src: ad.videoUrl, title: ad.title })}
                className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-xl aspect-[9/16] block cursor-pointer transition-all duration-[350ms] ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30"
              >
                <video src={ad.videoUrl} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.03] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-[350ms] ease-out pointer-events-none" />
                <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] ease-out z-10 p-4 bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
                   <Play className="text-white w-5 h-5 fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 p-6 lg:p-5 xl:p-6 opacity-80 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] ease-out z-10 w-full pointer-events-none">
                  <h3 className="text-xl md:text-xl lg:text-lg xl:text-xl font-bold text-white drop-shadow-md leading-tight">{ad.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 2. Recent Client Work */}
        <div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={titleVariant} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
              Client Projects
              <div className="h-[2px] bg-white/10 flex-1 ml-6 rounded-full" />
            </h2>
            <p className="text-gray-400 mt-4 text-lg font-light tracking-wide">
              Edits delivered for real brands and creators
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
          >
            {clientWork.map((work, idx) => (
              <motion.a
                key={idx} href={work.targetUrl} target="_blank" rel="noopener noreferrer" variants={cardVariant}
                className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-xl aspect-[9/16] block cursor-pointer transition-all duration-[350ms] ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30"
              >
                <video src={work.videoUrl} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.03] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-[350ms] ease-out pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-6 lg:p-5 xl:p-6 opacity-80 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] ease-out z-10 w-full pointer-events-none">
                  <h3 className="text-xl md:text-xl lg:text-lg xl:text-xl font-bold text-white drop-shadow-md leading-tight">{work.title}</h3>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* 3. Podcast Reel Edits */}
        <div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={titleVariant} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
              Podcast Reels
              <div className="h-[2px] bg-white/10 flex-1 ml-6 rounded-full" />
            </h2>
            <p className="text-gray-400 mt-4 text-lg font-light tracking-wide">
              Short-form vertical edits crafted for engagement and retention
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
          >
            {podcastReels.map((reel, idx) => (
              <motion.a
                key={idx} href={reel.targetUrl} target="_blank" rel="noopener noreferrer" variants={cardVariant}
                className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-xl aspect-[9/16] block cursor-pointer transition-all duration-[350ms] ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30"
              >
                <video src={reel.videoUrl} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.03] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-[350ms] ease-out pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-6 lg:p-5 xl:p-6 opacity-80 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] ease-out z-10 w-full pointer-events-none">
                  <h3 className="text-xl md:text-xl lg:text-lg xl:text-xl font-bold text-white drop-shadow-md leading-tight">{reel.title}</h3>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* 4. YouTube Podcast Edits */}
        <div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={titleVariant} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
              YouTube Podcast Edits
              <div className="h-[2px] bg-white/10 flex-1 ml-6 rounded-full" />
            </h2>
            <p className="text-gray-400 mt-4 text-lg font-light tracking-wide">
              Long-form podcast edits optimized for clarity and storytelling
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {youtubeEdits.map((yt, idx) => (
              <motion.div
                key={idx} variants={cardVariant} onClick={() => setActiveVideo({ src: yt.videoUrl, title: yt.title })}
                className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-xl aspect-video cursor-pointer transition-all duration-[350ms] ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30"
              >
                <iframe src={`${yt.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${yt.ytid}&controls=0&showinfo=0&rel=0&modestbranding=1`} className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.03] pointer-events-none opacity-80" allow="autoplay; encrypted-media" frameBorder="0" tabIndex={-1} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-[350ms] ease-out pointer-events-none" />
                <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] ease-out z-10 p-4 bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
                   <Play className="text-white w-5 h-5 fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 p-6 lg:p-5 xl:p-6 opacity-80 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] ease-out z-10 w-full pointer-events-none">
                  <h3 className="text-xl md:text-xl lg:text-lg xl:text-xl font-bold text-white drop-shadow-md leading-tight">{yt.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 5. Let's Work Together (Contact) */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="flex flex-col items-center justify-center text-center mt-12 mb-24 bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90 pointer-events-none" />
          
          <motion.h2 variants={staggerItem} className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg relative z-10 w-full">
            Let’s Work Together
          </motion.h2>

          <motion.div variants={staggerItem} className="w-24 h-[2px] bg-white/20 rounded-full mb-16 relative z-10" />
          
          <motion.div variants={staggerItem} className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 w-full max-w-4xl px-4 relative z-10">
            <motion.a 
              href="https://www.instagram.com/wikki22vignesh/" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-10 py-5 bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] hover:brightness-110 text-white rounded-full font-semibold text-lg tracking-wide shadow-[0_0_30px_rgba(253,29,29,0.3)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-white">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Instagram
            </motion.a>
            <motion.a 
              href="https://wa.me/919787357501" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-10 py-5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full font-semibold text-lg tracking-wide shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-colors flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              WhatsApp
            </motion.a>
          </motion.div>

          <motion.p variants={staggerItem} className="text-gray-400 mt-16 text-lg md:text-xl font-light tracking-wide relative z-10">
            or email at <a href="mailto:vickyonreel@gmail.com" className="text-white hover:text-white/80 hover:underline transition-all">vickyonreel@gmail.com</a>
          </motion.p>
          <motion.p variants={staggerItem} className="text-gray-500 mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-6 relative z-10">
            Thank you for reviewing my portfolio. I look forward to collaborating with you and bringing your ideas to life through engaging video edits.
          </motion.p>
        </motion.div>

      </div>

      {/* Modal Full Video Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl transition-opacity animate-in fade-in duration-300">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideo(null)} aria-label="Close modal" />
          <div className="relative w-full max-w-6xl aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10 animate-in zoom-in-95 duration-300">
             <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 z-20 p-3 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all cursor-pointer" aria-label="Close">
               <X className="w-5 h-5" />
             </button>
             <div className="absolute top-6 left-6 z-20 px-5 py-2.5 bg-black/50 text-white text-sm font-medium tracking-wide rounded-full backdrop-blur-md">
               {activeVideo.title}
             </div>
             {activeVideo.src.includes("youtube.com") ? (
               <iframe src={`${activeVideo.src}?autoplay=1`} className="w-full h-full" allow="autoplay; fullscreen" />
             ) : (
               <video src={activeVideo.src} controls autoPlay className="w-full h-full object-contain" />
             )}
          </div>
        </div>
      )}
    </section>
  );
}
