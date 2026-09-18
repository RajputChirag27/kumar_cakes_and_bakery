"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Layers, ShieldCheck, Flame } from "lucide-react";

const TOTAL_FRAMES = 50;

export default function ScrollCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Preload images progressively
  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      // Use frame-xxx.jpg with fallback handling to ezgif-frame-xxx.png
      img.src = `/cake_video/frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!active) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= 5) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Fallback to png
        img.src = `/cake_video/ezgif-frame-${frameNum}.png`;
        img.onload = () => {
          if (!active) return;
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= 5) setIsLoaded(true);
        };
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, []);

  // Draw current frame to canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const roundedIdx = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(frameIdx))
    );
    const img = imagesRef.current[roundedIdx];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find closest loaded frame if current isn't ready
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[roundedIdx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          renderImageCentered(ctx, canvas, prev);
          return;
        }
        const next = imagesRef.current[roundedIdx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          renderImageCentered(ctx, canvas, next);
          return;
        }
      }
      return;
    }

    renderImageCentered(ctx, canvas, img);
  }, []);

  // Helper to render image cover/contain with luxury backdrop
  const renderImageCentered = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Deep espresso gradient backdrop inside canvas
    const bgGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width * 0.1,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.8
    );
    bgGrad.addColorStop(0, "#1d120d");
    bgGrad.addColorStop(0.5, "#140c08");
    bgGrad.addColorStop(1, "#0c0806");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Fit image maintain aspect ratio (contain with 88% scale for breathing room)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawW: number;
    let drawH: number;

    if (canvasAspect > imgAspect) {
      drawH = height * 0.86;
      drawW = drawH * imgAspect;
    } else {
      drawW = width * 0.88;
      drawH = drawW / imgAspect;
    }

    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    // Draw cake frame
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Soft vignette around edges for seamless integration
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.35,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.75
    );
    vignette.addColorStop(0, "rgba(12, 8, 6, 0)");
    vignette.addColorStop(0.7, "rgba(12, 8, 6, 0.3)");
    vignette.addColorStop(1, "rgba(12, 8, 6, 0.95)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  // Resize canvas with devicePixelRatio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Scroll listener to compute target frame
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerH = container.scrollHeight - window.innerHeight;

      if (containerH <= 0) return;

      // Progress from 0 to 1 as container scrolls through viewport
      const rawProgress = -rect.top / containerH;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clamped);
      targetFrameRef.current = clamped * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth lerp loop with requestAnimationFrame
  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // Smooth interpolation (lerp factor ~0.09 for buttery responsiveness)
      const diff = target - current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.09;
        drawFrame(currentFrameRef.current);
      } else if (Math.abs(diff) > 0) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Initial draw once first frame loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  return (
    <div
      id="scroll-craft"
      ref={containerRef}
      className="relative h-[290vh] bg-[#0c0806]"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover"
        />

        {/* Loading overlay if buffering */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0c0806]">
            <div className="w-16 h-16 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin mb-4" />
            <p className="font-serif text-lg text-[#f5cb88] tracking-wider">
              Preparing The Culinary Story...
            </p>
            <p className="text-xs text-[#ebdccb]/60 mt-1">
              Loading frames: {loadedCount} / {TOTAL_FRAMES}
            </p>
          </div>
        )}

        {/* Header HUD overlay */}
        <div className="absolute top-20 left-6 sm:left-12 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4a359]/30 bg-[#160e0a]/80 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#f5cb88] uppercase">
              CINEMATIC SCROLL REVEAL
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-cream-100 font-bold mt-2 drop-shadow-md">
            The Anatomy of Perfection
          </h2>
          <p className="text-xs sm:text-sm text-[#ebdccb]/70 max-w-sm mt-1">
            Scroll gently to witness every artisanal layer come to life.
          </p>
        </div>

        {/* Progress scrub pill indicator */}
        <div className="absolute top-20 right-6 sm:right-12 z-20 pointer-events-none hidden sm:flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] tracking-widest text-[#d4a359] uppercase block font-semibold">
              Frame Sequence
            </span>
            <span className="text-xs font-mono text-[#ebdccb]/80">
              {Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current + 1))} / {TOTAL_FRAMES}
            </span>
          </div>
          <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4a359] to-[#c68642] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Milestone Story Overlays appearing dynamically based on scroll progress */}
        {/* Milestone 1: 5% - 30% */}
        <div
          className={`absolute bottom-24 left-6 sm:left-16 z-20 max-w-md transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.05 && scrollProgress < 0.32
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-5 sm:p-6 rounded-2xl glass-panel shadow-2xl">
            <div className="flex items-center gap-2 text-[#d4a359] text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Phase I • Sponge & Essence</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#fff9f2] font-bold">
              Slow-Baked Cloud Sponge
            </h3>
            <p className="text-xs sm:text-sm text-[#ebdccb]/80 mt-1.5 leading-relaxed">
              Infused with pure Madagascar vanilla and organic cacao, whipped to
              delicate airy perfection for a melt-in-the-mouth texture.
            </p>
          </div>
        </div>

        {/* Milestone 2: 35% - 65% */}
        <div
          className={`absolute bottom-24 right-6 sm:right-16 z-20 max-w-md transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.35 && scrollProgress < 0.65
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-5 sm:p-6 rounded-2xl glass-panel shadow-2xl">
            <div className="flex items-center gap-2 text-[#d4a359] text-xs font-semibold tracking-wider uppercase mb-1">
              <Flame className="w-4 h-4" />
              <span>Phase II • The Rich Ganache</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#fff9f2] font-bold">
              54% Dark Belgian Truffle
            </h3>
            <p className="text-xs sm:text-sm text-[#ebdccb]/80 mt-1.5 leading-relaxed">
              Cascading silky ganache layered with toasted hazelnut crunch and
              warm caramel ribboning between velvety crumbs.
            </p>
          </div>
        </div>

        {/* Milestone 3: 68% - 98% */}
        <div
          className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl transition-all duration-500 pointer-events-none text-center ${
            scrollProgress >= 0.68
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-5 sm:p-6 rounded-2xl glass-panel shadow-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#d4a359] text-xs font-semibold tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Phase III • Crown Jewel Finish</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#fff9f2] font-bold">
              24K Gold Leaf & Edible Florals
            </h3>
            <p className="text-xs sm:text-sm text-[#ebdccb]/80 mt-1.5 leading-relaxed">
              Every detail sculpted by master confectioners in Hathras. Your
              celebration deserves nothing less than regal magnificence.
            </p>
          </div>
        </div>

        {/* Bottom subtle scroll prompt */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center transition-opacity duration-300 pointer-events-none ${
            scrollProgress > 0.92 ? "opacity-0" : "opacity-75"
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4a359] font-medium">
            Scroll down to continue tour
          </span>
        </div>
      </div>
    </div>
  );
}
