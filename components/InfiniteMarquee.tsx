"use client";

import React from "react";
import {
  Sparkles,
  Award,
  Crown,
  Heart,
  ShieldCheck,
  Flame,
  Clock,
  MapPin,
  Smile,
} from "lucide-react";

export default function InfiniteMarquee() {
  const topRowItems = [
    { text: "100% Eggless", icon: ShieldCheck },
    { text: "Custom Wedding Cakes", icon: Crown },
    { text: "Fresh Daily", icon: Clock },
    { text: "Premium Ingredients", icon: Sparkles },
    { text: "Hathras Local Favorite", icon: MapPin },
    { text: "Artisanal Confectionery", icon: Award },
    { text: "Melt-in-Mouth Truffles", icon: Flame },
    { text: "Bespoke Celebrations", icon: Heart },
  ];

  const bottomRowItems = [
    { text: "Pure Belgian Chocolate", icon: Flame },
    { text: "Midnight Hathras Delivery", icon: Clock },
    { text: "Hand-Sculpted 3D Fondant", icon: Crown },
    { text: "Zero Added Preservatives", icon: ShieldCheck },
    { text: "Over 15,000 Happy Smiles", icon: Smile },
    { text: "Gourmet Dessert Cups", icon: Sparkles },
    { text: "Bespoke Anniversary Tiers", icon: Heart },
    { text: "Certified Quality Standards", icon: Award },
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-[#0c0806] via-[#140d0a] to-[#0c0806] overflow-hidden border-y border-[#d4a359]/15">
      {/* Edge-fade masks for seamless infinite feel */}
      <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-48 z-10 pointer-events-none bg-gradient-to-r from-[#0c0806] to-transparent" />
      <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-48 z-10 pointer-events-none bg-gradient-to-l from-[#0c0806] to-transparent" />

      {/* Row 1: Right to Left */}
      <div className="flex overflow-hidden select-none py-2">
        <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap">
          {topRowItems.concat(topRowItems).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`top-${idx}`}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#d4a359]/25 bg-[#1f140f]/70 backdrop-blur-sm text-sm font-medium text-[#faf6f0] hover:border-[#d4a359]/70 hover:bg-[#2a1a13] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#d4a359]" />
                <span className="tracking-wide">{item.text}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]/40 ml-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="flex overflow-hidden select-none py-2 mt-2">
        <div className="animate-marquee-right flex items-center gap-6 whitespace-nowrap">
          {bottomRowItems.concat(bottomRowItems).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`bottom-${idx}`}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-[#160f0b]/80 backdrop-blur-sm text-sm font-medium text-[#ebdccb] hover:border-[#d4a359]/50 hover:bg-[#221610] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#f5cb88]" />
                <span className="tracking-wide">{item.text}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c68642]/50 ml-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
