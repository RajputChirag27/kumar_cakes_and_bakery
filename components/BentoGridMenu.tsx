"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Flame,
  Crown,
  Heart,
  Gift,
  ArrowUpRight,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";

interface BentoItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  price: string;
  rating: number;
  reviews: string;
  highlights: string[];
  gridClass: string;
  bgGradient: string;
  badge: string;
  badgeColor: string;
  accentGlow: string;
}

const bentoItems: BentoItem[] = [
  {
    id: "signature-truffle",
    category: "Masterpiece",
    title: "Signature Truffle",
    subtitle:
      "Our most celebrated indulgence. 54% dark Belgian chocolate ganache folded with roasted hazelnut butter and adorned with 24K edible gold leaf.",
    price: "₹650 / lb",
    rating: 4.9,
    reviews: "1.2k+ reviews",
    highlights: ["Pure Belgian Callebaut", "100% Eggless", "Melt-In-Mouth Texture"],
    gridClass: "lg:col-span-8 lg:row-span-2",
    bgGradient: "from-[#27170f] via-[#1a100a] to-[#120a06]",
    badge: "Bestseller #1",
    badgeColor: "bg-[#d4a359]/20 text-[#f5cb88] border-[#d4a359]/40",
    accentGlow: "group-hover:border-[#d4a359]/60",
  },
  {
    id: "custom-3d-cakes",
    category: "Bespoke Art",
    title: "Custom 3D Cakes",
    subtitle:
      "Hand-sculpted fondant centerpieces, multi-tiered royal wedding marvels, and themed birthday creations tailored to your wildest imaginations.",
    price: "From ₹1,200",
    rating: 5.0,
    reviews: "850+ orders",
    highlights: ["Custom Theme Sculpting", "Multi-Tier Structural Rig", "Free Design Consult"],
    gridClass: "lg:col-span-4 lg:row-span-3",
    bgGradient: "from-[#2f1c13] via-[#1c110b] to-[#100906]",
    badge: "Showstopper",
    badgeColor: "bg-[#c68642]/20 text-[#f3d79b] border-[#c68642]/40",
    accentGlow: "group-hover:border-[#c68642]/70",
  },
  {
    id: "pastries-desserts",
    category: "Gourmet Bites",
    title: "Pastries & Desserts",
    subtitle:
      "French style eclairs, layered opera slices, molten chocolate lava cups, and fresh fruit tarts baked fresh every morning in Hathras.",
    price: "From ₹85 / pc",
    rating: 4.8,
    reviews: "3.4k+ bites",
    highlights: ["Freshly Whipped Mousses", "Zero Trans-Fat", "Daily Morning Batches"],
    gridClass: "lg:col-span-4 lg:row-span-2",
    bgGradient: "from-[#23150d] via-[#160d08] to-[#0e0704]",
    badge: "Daily Fresh",
    badgeColor: "bg-white/10 text-[#ebdccb] border-white/20",
    accentGlow: "group-hover:border-[#e5ba73]/50",
  },
  {
    id: "birthday-combos",
    category: "Celebration Pack",
    title: "Birthday Combos",
    subtitle:
      "Complete joy delivered: Choice of 1kg cake, matching luxury balloon bouquet, glowing sparklers, and handcrafted celebration greeting card.",
    price: "Combo ₹999",
    rating: 4.9,
    reviews: "2.1k+ delivered",
    highlights: ["Cake + Blooms + Props", "Express Hathras Delivery", "Midnight Surprise"],
    gridClass: "lg:col-span-4 lg:row-span-2",
    bgGradient: "from-[#2c180e] via-[#190e09] to-[#0f0805]",
    badge: "Ready-To-Party",
    badgeColor: "bg-[#d4a359]/25 text-[#fff9f2] border-[#d4a359]/50",
    accentGlow: "group-hover:border-[#d4a359]/70",
  },
];

export default function BentoGridMenu() {
  const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null);

  return (
    <section id="bento-menu" className="relative py-24 sm:py-32 bg-[#0c0806]">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a359]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#c68642]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a359]/30 bg-[#1a110c] backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#f5cb88] uppercase">
              CURATED MENU COLLECTIONS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream-glow">
            Artisanal Confections,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#e5ba73] to-[#c68642]">
              Infinite Delight
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#ebdccb]/75 font-light">
            Every creation is 100% eggless, prepared with imported Belgian
            chocolate, farm-fresh cream, and master precision.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {bentoItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#d4a359]/15 bg-gradient-to-br ${item.bgGradient} backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.015] ${item.accentGlow} ${item.gridClass}`}
            >
              {/* Subtle top caramel glow on hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#d4a359]/15 via-[#c68642]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Header Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-wider uppercase ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#ebdccb]/80 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
                    <Star className="w-3.5 h-3.5 text-[#d4a359] fill-[#d4a359]" />
                    <span className="font-semibold text-white">{item.rating}</span>
                    <span className="text-[10px] text-white/50">({item.reviews})</span>
                  </div>
                </div>

                <div className="text-[11px] font-medium tracking-widest text-[#d4a359] uppercase mb-1">
                  {item.category}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fff9f2] group-hover:text-[#f5cb88] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#ebdccb]/80 mt-3 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Highlight Checkmarks */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#faf6f0]/90 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#d4a359]" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer & Order Action */}
              <div className="pt-8 mt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#d4a359]/80 block">
                    Starting At
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#f5cb88]">
                    {item.price}
                  </span>
                </div>

                <a
                  href={`https://wa.me/919837000000?text=Hello%20Kumar's%20Cakes,%20I'm%20interested%20in%20ordering%20the%20${encodeURIComponent(
                    item.title
                  )}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a359]/40 bg-[#251811] text-xs font-semibold text-[#ebdccb] group-hover:border-[#d4a359] group-hover:bg-[#d4a359] group-hover:text-[#0c0806] transition-all duration-300 shadow-md"
                >
                  <span>Order Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dietary Guarantee banner below Bento */}
        <div className="mt-12 rounded-2xl border border-[#d4a359]/20 bg-[#160e0a]/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2a1b14] border border-[#d4a359]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#d4a359]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#fff9f2]">
                100% Pure Vegetarian & Eggless Kitchen
              </h4>
              <p className="text-xs text-[#ebdccb]/70 mt-0.5">
                Separate sterile prep lines, zero gelatine, certified highest hygienic standards in Hathras.
              </p>
            </div>
          </div>
          <a
            href="#3d-studio"
            className="shrink-0 px-6 py-2.5 rounded-full btn-gold-gradient text-xs uppercase tracking-wider font-bold"
          >
            Try 3D Customizer
          </a>
        </div>
      </div>
    </section>
  );
}
