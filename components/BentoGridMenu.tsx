"use client";

import React from "react";
import {
  Sparkles,
  Crown,
  CheckCircle2,
  ArrowUpRight,
  Star,
  ShieldCheck,
  Flame,
  Cake,
  Gift,
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
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentGradient: string;
}

const bentoItems: BentoItem[] = [
  {
    id: "signature-truffle",
    category: "Masterpiece Collection",
    title: "Signature Truffle",
    subtitle:
      "Our premier celebration cake. 54% dark Belgian Callebaut ganache layered with slow-whipped chocolate sponge, roasted hazelnut butter, and 24K edible gold flakes.",
    price: "₹650 / lb",
    rating: 4.9,
    reviews: "1,200+ reviews",
    highlights: ["Pure Belgian Callebaut", "100% Eggless", "Melt-In-Mouth Texture"],
    gridClass: "lg:col-span-8 lg:row-span-2",
    badge: "Most Loved in Hathras",
    icon: Flame,
    accentGradient: "from-[#d4a359]/20 via-[#c68642]/5 to-transparent",
  },
  {
    id: "custom-3d-cakes",
    category: "Bespoke Artistry",
    title: "Custom 3D Cakes",
    subtitle:
      "Hand-sculpted fondant showstoppers, architectural multi-tier wedding centerpieces, and themed birthday spectacles tailored precisely to your imagination.",
    price: "From ₹1,200",
    rating: 5.0,
    reviews: "850+ orders",
    highlights: ["Themed Sculpting", "Multi-Tier Rig", "Free Design Consult"],
    gridClass: "lg:col-span-4 lg:row-span-3",
    badge: "Architectural Tiers",
    icon: Crown,
    accentGradient: "from-[#c68642]/20 via-[#d4a359]/5 to-transparent",
  },
  {
    id: "pastries-desserts",
    category: "Daily Confections",
    title: "Pastries & Desserts",
    subtitle:
      "French-style choux eclairs, layered opera gateaux, molten dark lava cups, and fresh seasonal fruit tarts baked fresh every morning in Hathras.",
    price: "From ₹85 / pc",
    rating: 4.8,
    reviews: "3,400+ bites",
    highlights: ["Fresh Whipped Mousses", "Zero Trans-Fat", "Morning Batches"],
    gridClass: "lg:col-span-4 lg:row-span-2",
    badge: "Daily Baked",
    icon: Cake,
    accentGradient: "from-[#d4a359]/15 via-transparent to-transparent",
  },
  {
    id: "birthday-combos",
    category: "Complete Celebration",
    title: "Birthday Combos",
    subtitle:
      "The complete surprise: 1kg artisanal cake of choice, premium balloon bouquet, celebration sparklers, and a customized handwritten gold-foil card.",
    price: "Combo ₹999",
    rating: 4.9,
    reviews: "2,100+ delivered",
    highlights: ["Cake + Blooms + Sparklers", "Express Delivery", "Midnight Surprise"],
    gridClass: "lg:col-span-4 lg:row-span-2",
    badge: "Ready-To-Celebrate",
    icon: Gift,
    accentGradient: "from-[#c68642]/18 via-[#d4a359]/5 to-transparent",
  },
];

export default function BentoGridMenu() {
  return (
    <section id="bento-menu" className="relative py-16 sm:py-24 lg:py-32 bg-[#0c0908] text-[#f5f5f0] overflow-hidden">
      {/* 1px Gold Gradient Section Divider */}
      <div className="divider-gold-gradient absolute top-0 left-0" />

      {/* Ambient warm background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#d4a359]/6 blur-[140px] sm:blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#c68642]/6 blur-[120px] sm:blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#d4a359]/35 bg-[#1b120c]/90 backdrop-blur-md mb-4 sm:mb-5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#f5cb88] uppercase">
              CURATED MENU COLLECTIONS
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffbf5] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-[1.15] px-2">
            Artisanal Confections,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#f5cb88] to-[#d4a359]">
              Pure Delight
            </span>
          </h2>

          <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4a359]/60 to-transparent mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4" />

          <p className="text-xs sm:text-sm md:text-base text-[#e5dfd5] font-light max-w-xl mx-auto leading-relaxed px-2">
            100% vegetarian, crafted with imported Belgian chocolate, farm-fresh dairy,
            and master precision in Hathras.
          </p>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {bentoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-[#19110b]/75 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-350 hover:shadow-[0_0_35px_rgba(212,163,89,0.2)] hover:border-[#d4a359]/50 hover:-translate-y-1 ${item.gridClass}`}
              >
                {/* Subtle top caramel glow accent */}
                <div
                  className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-bl-full bg-gradient-to-bl ${item.accentGradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`}
                />

                {/* Card Top Info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#d4a359]/35 bg-[#251811] text-[9px] sm:text-[11px] font-semibold tracking-wider text-[#f5cb88] uppercase shadow-xs">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#fffbf5] bg-black/50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10">
                      <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#d4a359] fill-[#d4a359]" />
                      <span className="font-semibold">{item.rating}</span>
                      <span className="text-[10px] text-[#dcd7ce]/70">({item.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-[#2a1a12] border border-[#d4a359]/30 flex items-center justify-center shrink-0">
                      <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#d4a359]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#d4a359] uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#fffbf5] group-hover:text-[#f5cb88] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#e0dad0] mt-2 sm:mt-3 leading-relaxed font-light">
                    {item.subtitle}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-[#f5f5f0] bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#d4a359]" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 sm:pt-8 mt-4 sm:mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#d4a359] block font-medium">
                      Starting At
                    </span>
                    <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#f5cb88]">
                      {item.price}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/919837000000?text=Hello%20Kumar's%20Cakes,%20I'm%20interested%20in%20ordering%20the%20${encodeURIComponent(
                      item.title
                    )}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d4a359]/45 bg-[#251811] text-[11px] sm:text-xs font-semibold text-[#fffbf5] group-hover:border-[#d4a359] group-hover:bg-[#d4a359] group-hover:text-[#0c0908] transition-all duration-300 shadow-md"
                  >
                    <span>Order Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dietary Guarantee banner below Bento */}
        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#19110b]/75 backdrop-blur-xl p-5 sm:p-7 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 sm:gap-4 text-center sm:text-left">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#2a1a12] border border-[#d4a359]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-[#d4a359]" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#fffbf5]">
                100% Pure Vegetarian & Eggless Kitchen
              </h4>
              <p className="text-[11px] sm:text-xs text-[#e0dad0] mt-0.5 font-light">
                Separate sterile prep lines, zero gelatine, certified highest hygienic standards in Hathras.
              </p>
            </div>
          </div>
          <a
            href="#3d-studio"
            className="w-full sm:w-auto text-center shrink-0 px-5 sm:px-6 py-2.5 rounded-full btn-gold-gradient text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-md"
          >
            Launch 3D Customizer
          </a>
        </div>
      </div>
    </section>
  );
}
