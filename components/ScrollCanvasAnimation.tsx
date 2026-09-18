"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Sparkles,
  Layers,
  ChevronDown,
  ArrowRight,
  Flame,
  Award,
} from "lucide-react";

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

  // Preload frames progressively
  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/cake_video/frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!active) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= 4) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        img.src = `/cake_video/ezgif-frame-${frameNum}.png`;
        img.onload = () => {
          if (!active) return;
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= 4) setIsLoaded(true);
        };
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, []);

  // Fullscreen Cover render on HTML5 Canvas
  const renderImageCover = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawW: number;
    let drawH: number;

    // Fullscreen cover fit: occupies entire screen with no letterboxing
    if (canvasAspect > imgAspect) {
      drawW = width;
      drawH = width / imgAspect;
    } else {
      drawH = height;
      drawW = height * imgAspect;
    }

    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    // Draw the image edge-to-edge
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    ctx.restore();
  };

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
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[roundedIdx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          renderImageCover(ctx, canvas, prev);
          return;
        }
        const next = imagesRef.current[roundedIdx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          renderImageCover(ctx, canvas, next);
          return;
        }
      }
      return;
    }

    renderImageCover(ctx, canvas, img);
  }, []);

  // Resize canvas
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

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerH = container.scrollHeight - window.innerHeight;

      if (containerH <= 0) return;

      const rawProgress = -rect.top / containerH;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clamped);
      targetFrameRef.current = clamped * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth lerp loop
  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

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

  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  return (
    <div
      id="scroll-craft"
      ref={containerRef}
      className="relative h-[300vh] bg-[#0c0908]"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer z-0: HTML5 Video Canvas occupying 100% fullscreen */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover z-0"
        />

        {/* Layer z-10: Cinematic Vignette & Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0908]/80 via-transparent to-[#0c0908] pointer-events-none z-10" />

        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0c0908]">
            <div className="w-14 h-14 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin mb-3" />
            <span className="font-serif text-sm tracking-widest text-[#f5cb88] uppercase font-semibold">
              Preparing Culinary Canvas...
            </span>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* Layer z-20: Floating Hero Text with Warm Gold Glow   */}
        {/* ---------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between pt-24 pb-4 sm:pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full transition-all duration-700 pointer-events-none ${
            scrollProgress < 0.28
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          {/* Top Hero Text */}
          <div className="flex flex-col items-center text-center mt-2 sm:mt-6 pointer-events-auto relative">
            {/* Soft Warm Gold radial glow behind text */}
            <div
              className="absolute -inset-x-24 -inset-y-16 rounded-full pointer-events-none -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(212,163,89,0.22) 0%, rgba(198,134,66,0.08) 45%, transparent 75%)",
              }}
            />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a359]/35 bg-[#1b120c]/85 backdrop-blur-md shadow-lg shadow-black/40 mb-5 group hover:border-[#d4a359] transition-all">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359] animate-pulse" />
              <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#f5cb88] uppercase">
                HATHRAS PREMIER BAKERY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]" />
              <span className="text-[10px] sm:text-xs text-[#dcd7ce]/80 font-normal">
                100% Eggless
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream-glow leading-[1.08] max-w-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fffbf5] via-[#faede0] to-[#d4a359]">
                Handcrafted
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#e5ba73] to-[#c68642]">
                Celebration Cakes
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#dcd7ce] max-w-xl font-light leading-relaxed">
              Bespoke multi-tiered wedding cakes, Belgian chocolate truffles, and
              handcrafted celebration centerpieces created with love in Hathras.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center gap-3.5">
              <a
                href="#3d-studio"
                className="px-8 py-3.5 rounded-full btn-gold-gradient text-xs uppercase tracking-wider font-bold shadow-xl flex items-center gap-2 group cursor-pointer"
              >
                <span>Order Custom Cake</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#bento-menu"
                className="px-6 py-3.5 rounded-full btn-dark-minimal text-xs uppercase tracking-wider font-medium shadow-md"
              >
                <span>Discover Menu</span>
              </a>
            </div>
          </div>

          {/* Bottom Brand Anchor "KUMAR'S" */}
          <div className="w-full text-center pointer-events-auto relative mt-auto">
            <div
              className="absolute -inset-x-12 -bottom-4 h-36 rounded-t-3xl pointer-events-none -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at bottom center, rgba(12,9,8,0.95) 0%, rgba(12,9,8,0.7) 60%, transparent 95%)",
              }}
            />

            <span className="font-serif font-extrabold tracking-[-0.03em] sm:tracking-[0.01em] select-none text-[18vw] sm:text-[16vw] md:text-[15vw] leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-[#fffbf5] via-[#faede0] to-[#bca07e] drop-shadow-[0_12px_45px_rgba(212,163,89,0.3)] block w-full text-center">
              KUMAR&apos;S
            </span>
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 pt-1 text-[9px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a359]/80 font-medium">
              <span>Bespoke Confectionery</span>
              <span>•</span>
              <span>Hathras, Uttar Pradesh</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Scroll to explore <ChevronDown className="w-3 h-3 animate-bounce" />
              </span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MILESTONE STORY OVERLAYS (Appear during scroll)       */}
        {/* ---------------------------------------------------- */}

        {/* Frame Tracker HUD */}
        <div
          className={`absolute top-20 right-6 sm:right-12 z-20 pointer-events-none transition-opacity duration-300 ${
            scrollProgress > 0.22 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="px-3.5 py-1.5 rounded-full bg-[#1b120c]/85 backdrop-blur-md border border-[#d4a359]/30 shadow-lg flex items-center gap-2.5 text-xs text-[#f5f5f0]">
            <Layers className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="font-mono text-[11px] font-semibold text-[#f5cb88]">
              Frame {Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current + 1))} / {TOTAL_FRAMES}
            </span>
          </div>
        </div>

        {/* Milestone 1: 28% - 55% */}
        <div
          className={`absolute bottom-20 left-6 sm:left-16 z-20 max-w-md transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.28 && scrollProgress < 0.58
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-6 rounded-3xl glass-dark shadow-2xl">
            <div className="flex items-center gap-2 text-[#d4a359] text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Phase 01 • Cloud Sponge Alchemy</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#f5f5f0] font-bold">
              Slow-Baked Sponge
            </h3>
            <p className="text-xs sm:text-sm text-[#dcd7ce] mt-1.5 leading-relaxed font-light">
              Infused with pure Madagascar vanilla and organic cocoa, whipped to
              airy perfection for a melt-in-the-mouth texture.
            </p>
          </div>
        </div>

        {/* Milestone 2: 58% - 85% */}
        <div
          className={`absolute bottom-20 right-6 sm:right-16 z-20 max-w-md transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.58 && scrollProgress < 0.85
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-6 rounded-3xl glass-dark shadow-2xl">
            <div className="flex items-center gap-2 text-[#d4a359] text-xs font-semibold tracking-wider uppercase mb-1">
              <Flame className="w-4 h-4" />
              <span>Phase 02 • Belgian Truffle Ganache</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#f5f5f0] font-bold">
              54% Dark Chocolate Core
            </h3>
            <p className="text-xs sm:text-sm text-[#dcd7ce] mt-1.5 leading-relaxed font-light">
              Silky ganache folded with toasted hazelnut crunch and warm caramel
              ribbons for deep, luxurious chocolate intensity.
            </p>
          </div>
        </div>

        {/* Milestone 3: 85% - 100% */}
        <div
          className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-lg transition-all duration-500 pointer-events-none text-center ${
            scrollProgress >= 0.85
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-6 rounded-3xl glass-dark shadow-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#d4a359] text-xs font-semibold tracking-wider uppercase mb-1">
              <Award className="w-4 h-4" />
              <span>Phase 03 • Crown Jewel Finish</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#f5f5f0] font-bold">
              24K Gold Leaf & Edible Florals
            </h3>
            <p className="text-xs sm:text-sm text-[#dcd7ce] mt-1.5 leading-relaxed font-light">
              Every detail sculpted by master confectioners in Hathras. Your
              celebration deserves nothing less than royal magnificence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
