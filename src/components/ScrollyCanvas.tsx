'use client';

import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 75;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // React-controlled dimensions to prevent layout resetting on re-render
  const [dims, setDims] = useState({ width: 1920, height: 1080 });
  const [frameIndex, setFrameIndex] = useState(0);
  const activeFrameRef = useRef(0);

  // Preload images
  useEffect(() => {
    let firstLoaded = false;
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let localSuccess = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(2, '0');

      img.onload = () => {
        localSuccess++;
        if (!firstLoaded && i === 0) {
          firstLoaded = true;
          setImagesLoaded(true);
        }
        if (localSuccess >= 10) {
          setImagesLoaded(true);
        }

        // Draw immediately if this image finishes loading and is the active one!
        if (i === activeFrameRef.current) {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const imgWidth = img.naturalWidth || img.width || 1920;
              const imgHeight = img.naturalHeight || img.height || 1080;
              if (imgWidth > 0) {
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

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, ox, oy, dw, dh);
                console.log("[ScrollyCanvas] Frame drawn on load:", i, "src:", img.src);
              }
            }
          }
        }
      };

      img.src = `/sequence/frame_${indexStr}_delay-0.066s.jpg`;
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;
    setImages(loadedImages);

    const timeout = setTimeout(() => setImagesLoaded(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Handle scroll and resize event registration
  useEffect(() => {
    const handleScroll = () => {
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
      activeFrameRef.current = index;
      setFrameIndex(index);
    };

    const handleResize = () => {
      setDims({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  // Effect-driven canvas drawing - Runs every time the frameIndex, dimensions, or images load status changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imagesArray = imagesRef.current.length > 0 ? imagesRef.current : images;
    const img = imagesArray[frameIndex];

    console.log("[ScrollyCanvas] Draw attempt: index =", frameIndex, "img exists =", !!img, "complete =", img ? img.complete : false);

    if (img && img.complete) {
      const imgWidth = img.naturalWidth || img.width || 1920;
      const imgHeight = img.naturalHeight || img.height || 1080;

      if (imgWidth > 0) {
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, ox, oy, dw, dh);
        console.log("[ScrollyCanvas] Frame drawn on scroll:", frameIndex);
      }
    }
  }, [frameIndex, dims, imagesLoaded, images]);

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src="/sequence/frame_00_delay-0.066s.jpg"
          alt="Visual background"
          suppressHydrationWarning
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          // @ts-ignore
          fetchPriority="high"
        />

        <canvas
          ref={canvasRef}
          width={dims.width}
          height={dims.height}
          suppressHydrationWarning
          className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
        />
      </div>
    </div>
  );
}
