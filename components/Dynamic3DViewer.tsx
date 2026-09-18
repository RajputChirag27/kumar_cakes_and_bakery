"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Box } from "lucide-react";

const CakeViewer3D = dynamic(() => import("./CakeViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="py-24 sm:py-32 bg-[#0c0908] flex items-center justify-center min-h-[600px] text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin" />
        <span className="font-serif text-xs text-[#f5cb88] font-semibold tracking-widest uppercase">
          Initializing 3D Cake Studio...
        </span>
        <span className="text-[11px] text-[#dcd7ce]/60 font-light">Loading Three.js viewport</span>
      </div>
    </div>
  ),
});

export default function Dynamic3DViewer() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        // Start loading 500px before the user reaches the section
        rootMargin: "500px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <CakeViewer3D />
      ) : (
        <section className="relative py-16 sm:py-24 lg:py-32 bg-[#0c0908] text-[#f5f5f0] min-h-[500px] flex items-center justify-center">
          <div className="divider-gold-gradient absolute top-0 left-0" />
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-[#1b120c] border border-[#d4a359]/30 flex items-center justify-center text-[#d4a359]">
              <Box className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#f5cb88] uppercase">
              Interactive 3D Cake Studio
            </span>
            <p className="text-xs text-[#dcd7ce]/60 max-w-sm">
              Scroll to sculpt and customize your handcrafted celebration cake in 360° studio lighting.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
