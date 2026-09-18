import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  Award,
} from "lucide-react";

const reviews = [
  {
    name: "Dr. Alok Agrawal",
    occasion: "Daughter's 1st Birthday",
    location: "Kamla Nagar, Hathras",
    rating: 5,
    comment:
      "The 3D jungle theme cake by Kumar's was the talk of the evening! 100% eggless, supremely soft, and delivered right on time in pristine condition. Best bakery in Hathras by far.",
  },
  {
    name: "Pooja & Rohan Sharma",
    occasion: "Grand Wedding Reception",
    location: "Sadabad Gate, Hathras",
    rating: 5,
    comment:
      "Our 3-tier Belgian truffle wedding cake was pure royalty. The 24k gold leaf and fresh flowers looked stunning in photos. Every guest asked where we got it from!",
  },
  {
    name: "Vikas Chaudhary",
    occasion: "Parents' 25th Anniversary",
    location: "Agra Road, Hathras",
    rating: 5,
    comment:
      "Ordered via WhatsApp in 5 minutes. Fresh, beautifully inscribed, and meltingly soft. Kumar's never compromises on quality.",
  },
];

export default function LocalHeritage() {
  return (
    <section id="heritage" className="relative py-24 sm:py-32 bg-[#0c0908] text-[#f5f5f0] overflow-hidden">
      {/* 1px Gold Gradient Section Divider */}
      <div className="divider-gold-gradient absolute top-0 left-0" />

      {/* Ambient background illumination */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#d4a359]/6 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#c68642]/6 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heritage Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a359]/35 bg-[#1b120c]/90 backdrop-blur-md mb-5 shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#f5cb88] uppercase">
              HATHRAS CULINARY PRIDE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#fffbf5] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-[1.15]">
            Rooted in Hathras,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#f5cb88] to-[#d4a359]">
              Celebrated in Every Home
            </span>
          </h2>

          <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4a359]/60 to-transparent mx-auto mt-4 mb-4" />

          <p className="mt-4 text-sm sm:text-base text-[#e5dfd5] font-light max-w-xl mx-auto leading-relaxed">
            For over a decade, KUMAR&apos;S Cakes & Bakery has stood as the sweet
            benchmark of Hathras. We craft every celebration centerpiece with pure dairy, 100% vegetarian ingredients, and heartfelt love.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 sm:mb-20">
          <div className="rounded-3xl p-6 sm:p-8 bg-[#19110b]/75 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center text-center hover:border-[#d4a359]/40 hover:shadow-[0_0_30px_rgba(212,163,89,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#2a1a12] border border-[#d4a359]/30 flex items-center justify-center mb-5 text-[#d4a359]">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#fffbf5]">
              Express Hathras Delivery
            </h3>
            <p className="text-xs sm:text-sm text-[#e0dad0] mt-2 leading-relaxed font-light">
              Specialized air-cushioned delivery vans ensuring multi-tier cakes arrive
              in pristine structural perfection across Hathras.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-[#19110b]/75 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center text-center hover:border-[#d4a359]/40 hover:shadow-[0_0_30px_rgba(212,163,89,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#2a1a12] border border-[#d4a359]/30 flex items-center justify-center mb-5 text-[#d4a359]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#fffbf5]">
              100% Vegetarian Certified
            </h3>
            <p className="text-xs sm:text-sm text-[#e0dad0] mt-2 leading-relaxed font-light">
              Strictly eggless bakery kitchen adhering to highest purity and local
              cultural traditions. Zero animal gelatine ever.
            </p>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-[#19110b]/75 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center text-center hover:border-[#d4a359]/40 hover:shadow-[0_0_30px_rgba(212,163,89,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#2a1a12] border border-[#d4a359]/30 flex items-center justify-center mb-5 text-[#d4a359]">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#fffbf5]">
              Master Confectioners
            </h3>
            <p className="text-xs sm:text-sm text-[#e0dad0] mt-2 leading-relaxed font-light">
              Trained in contemporary European pastry techniques, delivering world-class
              Belgian truffles right home to Uttar Pradesh.
            </p>
          </div>
        </div>

        {/* Customer Testimonials Cards */}
        <div>
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-widest text-[#d4a359] font-semibold block">
              Words From Hathras Families
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fffbf5] mt-1">
              Trusted by 15,000+ Celebrations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 sm:p-7 bg-[#19110b]/75 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between hover:border-[#d4a359]/35 transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#d4a359] mb-3">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#d4a359] text-[#d4a359]"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#e5dfd5] italic leading-relaxed font-light">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#fffbf5]">{rev.name}</h4>
                    <span className="text-[11px] text-[#f5cb88]">
                      {rev.occasion}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#dcd7ce]/70">
                    {rev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
