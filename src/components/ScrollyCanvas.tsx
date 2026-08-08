'use client';

import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 75;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Debug counters
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);

  // Debug state
  const [debugInfo, setDebugInfo] = useState({
    progress: 0,
    index: 0,
    canvasSize: '0x0',
    imageComplete: false,
    imageSrc: '',
    imagesRefLen: 0,
    naturalSize: '0x0',
    drawCoords: 'w:0 h:0 x:0 y:0',
  });

  // Preload images
  useEffect(() => {
    let firstLoaded = false;
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    
    let localSuccess = 0;
    let localFailure = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(2, '0');
      
      img.onload = () => {
        localSuccess++;
        setSuccessCount(localSuccess);
        
        if (!firstLoaded && i === 0) {
          firstLoaded = true;
          setImagesLoaded(true);
        }

        if (localSuccess >= 10) {
          setImagesLoaded(true);
        }

        triggerRedraw();
      };

      img.onerror = (e) => {
        localFailure++;
        setFailureCount(localFailure);
        triggerRedraw();
      };

      img.src = `/sequence/frame_${indexStr}_delay-0.066s.jpg`;
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;
    setImages(loadedImages);

    const timeout = setTimeout(() => setImagesLoaded(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const lastDrawnIndex = useRef(-1);

  const drawImage = (index: number) => {
    if (lastDrawnIndex.current === index) return;
    const imagesArray = imagesRef.current.length > 0 ? imagesRef.current : images;
    if (!canvasRef.current || !imagesArray[index] || !imagesArray[index].complete) return;

    lastDrawnIndex.current = index;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesArray[index];
    const imgWidth = img.naturalWidth || img.width || 1920;
    const imgHeight = img.naturalHeight || img.height || 1080;
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = imgWidth / imgHeight;

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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const triggerRedraw = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalHeight = rect.height - window.innerHeight;
    
    let progress = 0;
    if (rect.top <= 0) {
      const scrolled = -rect.top;
      progress = scrolled / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
    }
    
    const index = Math.floor(progress * (FRAME_COUNT - 1));
    
    const imagesArray = imagesRef.current.length > 0 ? imagesRef.current : images;
    const img = imagesArray[index];
    
    let coordsStr = 'w:0 h:0 x:0 y:0';
    let natSizeStr = '0x0';
    if (img && canvasRef.current) {
      const imgWidth = img.naturalWidth || img.width || 1920;
      const imgHeight = img.naturalHeight || img.height || 1080;
      natSizeStr = `${imgWidth}x${imgHeight}`;
      
      const canvas = canvasRef.current;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = imgWidth / imgHeight;
      let dw, dh, ox, oy;
      if (canvasRatio > imgRatio) {
        dw = canvas.width;
        dh = canvas.width / imgRatio;
        ox = 0;
        oy = (canvas.height - dh) / 2;
      } else {
        dw = canvas.height * imgRatio;
        dh = canvas.height;
        ox = (canvas.width - dw) / 2;
        oy = 0;
      }
      coordsStr = `w:${dw.toFixed(0)} h:${dh.toFixed(0)} x:${ox.toFixed(0)} y:${oy.toFixed(0)}`;
    }

    setDebugInfo({
      progress,
      index,
      canvasSize: canvasRef.current ? `${canvasRef.current.width}x${canvasRef.current.height}` : 'no-canvas',
      imageComplete: img ? img.complete : false,
      imageSrc: img ? img.src.substring(img.src.lastIndexOf('/')) : 'no-img',
      imagesRefLen: imagesArray.length,
      naturalSize: natSizeStr,
      drawCoords: coordsStr,
    });

    drawImage(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      triggerRedraw();
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      triggerRedraw();
    };

    handleResize();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative bg-[#121212]">
      {/* Temporary Debug HUD */}
      <div id="debug-hud" suppressHydrationWarning className="fixed top-4 left-4 z-[999] bg-black/80 text-green-400 p-4 rounded-xl font-mono text-xs border border-green-500/30 flex flex-col gap-1 pointer-events-none">
        <div>Progress: {(debugInfo.progress * 100).toFixed(1)}%</div>
        <div>Frame Index: {debugInfo.index} / 74</div>
        <div>Successful Loads (onload): {successCount} / 75</div>
        <div>Failed Loads (onerror): {failureCount} / 75</div>
        <div>Images Array size: {debugInfo.imagesRefLen}</div>
        <div>Canvas Size: {debugInfo.canvasSize}</div>
        <div>Natural Size: {debugInfo.naturalSize}</div>
        <div>Draw Coords: {debugInfo.drawCoords}</div>
        <div>Active Frame Complete: {debugInfo.imageComplete ? 'YES' : 'NO'}</div>
        <div>Active Frame Src: {debugInfo.imageSrc}</div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img 
          src="/sequence/frame_00_delay-0.066s.jpg" 
          alt="Visual background"
          className="absolute inset-0 w-full h-full object-cover z-0" 
          style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          // @ts-ignore
          fetchPriority="high"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />
      </div>
    </div>
  );
}
