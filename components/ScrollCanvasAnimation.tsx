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

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Progressive preloading of all frames with prioritized initial frame
  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/cake_video/frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!active) return;
        loadedCount++;
        // Display immediately when first frame is ready
        if (loadedCount >= 1) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        img.src = `/cake_video/ezgif-frame-${frameNum}.png`;
        img.onload = () => {
          if (!active) return;
          loadedCount++;
          if (loadedCount >= 1) {
            setIsLoaded(true);
          }
        };
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, []);

  // True Fullscreen Object-Cover Render
  const renderImageCover = useCallback(
    (
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

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    },
    []
  );

  // Draw current frame to canvas
  const drawFrame = useCallback(
    (frameIdx: number) => {
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
        // Fall back to closest loaded frame
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
    },
    [renderImageCover]
  );

  // Resize canvas responsively without creating horizontal scrollbars
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Use documentElement.clientWidth to strictly prevent scrollbar overflow on Windows
    const w = document.documentElement.clientWidth || window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
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
    window.addEventListener("orientationchange", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("orientationchange", resizeCanvas);
    };
  }, [resizeCanvas]);

  // Scroll listener tracking container progress
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerH = container.offsetHeight - window.innerHeight;

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
        currentFrameRef.current += diff * 0.12;
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
      className="relative h-[280vh] sm:h-[300vh] bg-[#0c0908] w-full"
    >
      {/* Sticky Fullscreen Canvas Viewport: MUST NOT have overflow-hidden on parent to allow sticky to work */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer z-0: HTML5 Video Canvas occupying 100% fullscreen */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Layer z-10: Cinematic Vignette & Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0908]/85 via-[#0c0908]/20 to-[#0c0908] pointer-events-none z-10 w-full" />

        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0c0908]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin mb-3" />
            <span className="font-serif text-xs sm:text-sm tracking-widest text-[#f5cb88] uppercase font-semibold">
              Preparing Culinary Canvas...
            </span>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* Layer z-20: Responsive Floating Hero Text            */}
        {/* ---------------------------------------------------- */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between pt-16 sm:pt-24 pb-2 sm:pb-6 px-4 sm:px-8 max-w-5xl mx-auto w-full transition-all duration-500 pointer-events-none ${
            scrollProgress < 0.22
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6 pointer-events-none"
          }`}
        >
          {/* Top Hero Content Container */}
          <div className="flex flex-col items-center text-center pointer-events-auto relative px-2 max-w-xl mx-auto w-full">
            {/* Soft Warm Gold radial glow behind text */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-lg h-56 rounded-full pointer-events-none -z-10 blur-xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(212,163,89,0.22) 0%, rgba(198,134,66,0.08) 45%, transparent 75%)",
              }}
            />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border border-[#d4a359]/40 bg-[#1b120c]/90 backdrop-blur-md shadow-md mb-2.5 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4a359] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.25em] font-semibold text-[#f5cb88] uppercase whitespace-nowrap">
                HATHRAS PREMIER BAKERY
              </span>
              <span className="w-1 h-1 rounded-full bg-[#d4a359]" />
              <span className="text-[10px] sm:text-xs text-[#dcd7ce]/85 font-normal whitespace-nowrap">
                100% Eggless
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal text-[#fffbf5] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fffbf5] via-[#faede0] to-[#d4a359]">
                Handcrafted
              </span>{" "}
              <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#f5cb88] to-[#c68642]">
                Celebration Cakes
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#e5dfd5] font-light leading-relaxed max-w-md mx-auto">
              Bespoke multi-tiered wedding cakes, Belgian chocolate truffles, and
              handcrafted celebration centerpieces created with love in Hathras.
            </p>

            {/* CTA Buttons */}
            <div className="mt-3.5 sm:mt-5 flex items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <a
                href="#3d-studio"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full btn-gold-gradient text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-xl flex items-center gap-1.5 group cursor-pointer"
              >
                <span>Order Custom Cake</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#bento-menu"
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full btn-dark-minimal text-[11px] sm:text-xs uppercase tracking-wider font-medium shadow-md"
              >
                <span>Discover Menu</span>
              </a>
            </div>
          </div>

          {/* Bottom Brand Anchor "KUMAR'S" */}
          <div className="w-full text-center pointer-events-auto relative mt-auto pb-1 sm:pb-2">
            <div
              className="absolute left-0 right-0 -bottom-2 h-24 sm:h-32 rounded-t-3xl pointer-events-none -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at bottom center, rgba(12,9,8,0.95) 0%, rgba(12,9,8,0.6) 60%, transparent 95%)",
              }}
            />

            <span className="font-serif font-extrabold tracking-tight select-none text-[15vw] sm:text-[14vw] md:text-[13vw] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-[#fffbf5] via-[#faede0] to-[#bca07e] drop-shadow-[0_6px_25px_rgba(212,163,89,0.35)] block w-full text-center">
              KUMAR&apos;S
            </span>
            <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-4 pt-0.5 sm:pt-1 text-[8px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#d4a359]/90 font-medium">
              <span>Fine Confectionery</span>
              <span>•</span>
              <span>Hathras, UP</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 sm:gap-1">
                Scroll <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-bounce" />
              </span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MILESTONE STORY OVERLAYS                             */}
        {/* ---------------------------------------------------- */}

        {/* Frame Tracker HUD */}
        <div
          className={`absolute top-16 sm:top-20 right-3 sm:right-10 z-20 pointer-events-none transition-opacity duration-300 ${
            scrollProgress > 0.22 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#1b120c]/90 backdrop-blur-md border border-[#d4a359]/35 shadow-lg flex items-center gap-1.5 text-[10px] sm:text-xs text-[#f5f5f0]">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4a359]" />
            <span className="font-mono font-semibold text-[#f5cb88]">
              {Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current + 1))} / {TOTAL_FRAMES}
            </span>
          </div>
        </div>

        {/* Milestone 1: 25% - 55% */}
        <div
          className={`absolute bottom-8 sm:bottom-16 left-4 right-4 sm:right-auto sm:left-14 z-20 max-w-md transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.25 && scrollProgress < 0.55
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-4 sm:p-6 rounded-2xl glass-dark shadow-2xl">
            <div className="flex items-center gap-1.5 text-[#d4a359] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 01 • Cloud Sponge Alchemy</span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl text-[#fffbf5] font-bold">
              Slow-Baked Sponge
            </h3>
            <p className="text-xs sm:text-sm text-[#e0dad0] mt-1 leading-relaxed font-light">
              Infused with pure Madagascar vanilla and organic cocoa, whipped to
              airy perfection for a melt-in-the-mouth texture.
            </p>
          </div>
        </div>

        {/* Milestone 2: 55% - 82% */}
        <div
          className={`absolute bottom-8 sm:bottom-16 left-4 right-4 sm:left-auto sm:right-14 z-20 max-w-md transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.55 && scrollProgress < 0.82
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-4 sm:p-6 rounded-2xl glass-dark shadow-2xl">
            <div className="flex items-center gap-1.5 text-[#d4a359] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Phase 02 • Belgian Truffle Ganache</span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl text-[#fffbf5] font-bold">
              54% Dark Chocolate Core
            </h3>
            <p className="text-xs sm:text-sm text-[#e0dad0] mt-1 leading-relaxed font-light">
              Silky ganache folded with toasted hazelnut crunch and warm caramel
              ribbons for deep, luxurious chocolate intensity.
            </p>
          </div>
        </div>

        {/* Milestone 3: 82% - 100% */}
        <div
          className={`absolute bottom-8 sm:bottom-16 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-20 w-auto sm:w-[90%] sm:max-w-lg transition-all duration-500 pointer-events-none text-left sm:text-center ${
            scrollProgress >= 0.82
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-4 sm:p-6 rounded-2xl glass-dark shadow-2xl sm:mx-auto">
            <div className="inline-flex items-center gap-1.5 text-[#d4a359] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Phase 03 • Crown Jewel Finish</span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl text-[#fffbf5] font-bold">
              24K Gold Leaf & Edible Florals
            </h3>
            <p className="text-xs sm:text-sm text-[#e0dad0] mt-1 leading-relaxed font-light">
              Every detail sculpted by master confectioners in Hathras. Your
              celebration deserves nothing less than royal magnificence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
