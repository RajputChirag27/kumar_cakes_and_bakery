import React from "react";
import { Sparkles, ArrowDown, ChevronRight, Award, ShieldCheck, Heart } from "lucide-react";

interface HeroSectionProps {
  onOpenOrderModal?: () => void;
}

export default function HeroSection({ onOpenOrderModal }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#150e0a] via-[#100a07] to-[#0c0806]">
      {/* Cinematic subtle background illumination */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-[#d4a359]/12 via-[#c68642]/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#d4a359]/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#2d1b12]/40 blur-[100px] rounded-full" />
        {/* Subtle patterned texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff9f2 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top spacing for fixed Navbar */}
      <div className="pt-24 sm:pt-28" />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center mt-2 sm:mt-6">
        {/* Hathras Premier Bakery Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a359]/35 bg-[#1f140f]/80 backdrop-blur-md shadow-lg shadow-[#0c0806]/60 mb-6 group hover:border-[#d4a359]/70 transition-all duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a359] animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#f5cb88] uppercase">
            HATHRAS PREMIER BAKERY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]" />
          <span className="text-[10px] sm:text-xs text-[#ebdccb]/70 tracking-wider font-light">
            Since 2012
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream-glow leading-[1.08] max-w-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fffbf5] via-[#faede0] to-[#d4a359]">
            Handcrafted
          </span>{" "}
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#e5ba73] to-[#c68642]">
            Celebration Cakes
          </span>
        </h1>

        {/* Subtitle & Value Badges */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-[#ebdccb]/85 max-w-2xl font-light leading-relaxed">
          From multi-tiered royal wedding centerpieces to bespoke 3D birthday showstoppers,
          we craft memories with pure Belgian chocolate, 100% vegetarian love, and artisanal perfection in Hathras.
        </p>

        {/* Quick Trust Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#ebdccb]/75">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#d4a359]" /> 100% Eggless Pure Veg
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#d4a359]" /> 15,000+ Celebrations
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#d4a359]" /> Freshly Baked Daily
          </span>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#3d-studio"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-gold-gradient text-sm uppercase tracking-wider font-bold shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Order Custom Cake</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#scroll-craft"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#d4a359]/30 bg-[#160f0b]/60 backdrop-blur-sm text-sm text-[#ebdccb] hover:text-[#f5cb88] hover:border-[#d4a359]/70 hover:bg-[#20150f] transition-all flex items-center justify-center gap-2"
          >
            <ArrowDown className="w-4 h-4 text-[#d4a359] animate-bounce" />
            <span>Discover The Craft</span>
          </a>
        </div>
      </div>

      {/* Bottom Brand Anchor: "KUMAR'S" centered horizontally, ~90vw wide, near bottom */}
      <div className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-end pb-1 sm:pb-3">
        {/* Cinematic dark espresso shadow/gradient behind the text for perfect contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0806] via-[#0c0806]/90 to-transparent pointer-events-none h-full" />

        <div className="relative z-10 w-[90vw] mx-auto text-center flex flex-col items-center">
          <span className="font-serif font-extrabold tracking-[-0.03em] sm:tracking-[0.02em] select-none text-[17vw] sm:text-[15vw] md:text-[14vw] leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-[#fffbf2] via-[#faede0] to-[#bca07e] drop-shadow-[0_12px_45px_rgba(212,163,89,0.3)] block w-full text-center">
            KUMAR&apos;S
          </span>
          <div className="flex items-center justify-between w-full max-w-5xl px-2 sm:px-6 pt-1 text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-[#d4a359]/80 font-medium">
            <span>Fine Confectionery</span>
            <span className="hidden sm:inline">•</span>
            <span>Hathras, Uttar Pradesh</span>
            <span className="hidden sm:inline">•</span>
            <span>Bespoke Artistry</span>
          </div>
        </div>
      </div>
    </section>
  );
}
