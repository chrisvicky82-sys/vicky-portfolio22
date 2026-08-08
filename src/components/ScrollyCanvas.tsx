'use client';

import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 75;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    let firstLoaded = false;
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(2, '0');
      
      // Crucial: Set onload BEFORE src to prevent missing the event for cached images
      img.onload = () => {
        loadedCount++;
        
        // Show sequence as soon as the first frame loads
        if (!firstLoaded && i === 0) {
          firstLoaded = true;
          setImagesLoaded(true);
        }

        // Once we have loaded a decent chunk of images or all, unblock
        if (loadedCount >= 10) {
          setImagesLoaded(true);
        }

        // If we are currently on this frame or waiting, trigger a redraw
        const latest = scrollYProgress.get();
        if (Math.floor(latest * (FRAME_COUNT - 1)) === i) {
          drawImage(i);
        }
      };

      img.src = `/sequence/frame_${indexStr}_delay-0.066s.jpg`;
      loadedImages[i] = img;
    }

    // Set ref instead of state so we don't cause React re-renders on every load
    imagesRef.current = loadedImages;
    setImages(loadedImages);

    // Fallback timeout to unblock if loading takes too long
    const timeout = setTimeout(() => setImagesLoaded(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const lastDrawnIndex = useRef(-1);

  const drawImage = (index: number) => {
    if (lastDrawnIndex.current === index) return; // Prevent redrawing the exact same frame repeatedly
    const imagesArray = imagesRef.current.length > 0 ? imagesRef.current : images;
    if (!canvasRef.current || !imagesArray[index] || !imagesArray[index].complete) return;

    lastDrawnIndex.current = index;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Object-fit: cover logic
    const img = imagesArray[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    // Draw synchronously for real-time responsiveness matching scroll
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Keep canvas size synced with window
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      const latest = scrollYProgress.get();
      drawImage(Math.floor(latest * (FRAME_COUNT - 1)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, scrollYProgress]);

  // Initial draw
  useEffect(() => {
    if (imagesLoaded) {
      const latest = scrollYProgress.get();
      drawImage(Math.floor(latest * (FRAME_COUNT - 1)));
    }
  }, [imagesLoaded]);

  // Scrub animation on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;
    const index = Math.floor(latest * (FRAME_COUNT - 1));
    drawImage(index);
  });

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Placeholder background frame (always rendered to avoid flashes of blank screen) */}
        <img 
          src="/sequence/frame_00_delay-0.066s.jpg" 
          alt="Visual background"
          className="absolute inset-0 w-full h-full object-cover z-0" 
          style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          // @ts-ignore
          fetchpriority="high"
        />

        {/* Canvas overlays on top of the placeholder frame */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />
      </div>
    </div>
  );
}
