import React from "react";
import {
  Sparkles,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#080504] border-t border-[#d4a359]/20 text-[#dcd7ce] pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4a359]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#d4a359]/40 flex items-center justify-center bg-[#1d120c]">
                <Sparkles className="w-4 h-4 text-[#d4a359]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fff9f2] via-[#f5cb88] to-[#d4a359]">
                KUMAR&apos;S
              </span>
            </div>
            <p className="text-xs text-[#dcd7ce]/75 leading-relaxed mb-6 font-light">
              Hathras&apos;s premier destination for handcrafted celebration cakes,
              bespoke 3D novelty art, and gourmet European confections. 100% pure vegetarian.
            </p>
            <div className="flex items-center gap-3 text-[#d4a359]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#d4a359]/30 flex items-center justify-center hover:bg-[#d4a359] hover:text-[#0c0908] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#d4a359]/30 flex items-center justify-center hover:bg-[#d4a359] hover:text-[#0c0806] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919837000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#d4a359]/30 flex items-center justify-center hover:bg-[#d4a359] hover:text-[#0c0806] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#f5cb88] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#dcd7ce]/80">
              <li>
                <a href="#scroll-craft" className="hover:text-[#f5cb88] transition-colors">
                  Artisanal Craftsmanship
                </a>
              </li>
              <li>
                <a href="#bento-menu" className="hover:text-[#f5cb88] transition-colors">
                  Bento Cake Menu
                </a>
              </li>
              <li>
                <a href="#3d-studio" className="hover:text-[#f5cb88] transition-colors">
                  3D Customizer Studio
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#f5cb88] transition-colors">
                  Hathras Heritage & Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Bakehouse Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#f5cb88] mb-4">
              Bakehouse Hours
            </h4>
            <div className="space-y-3 text-xs text-[#dcd7ce]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Monday – Sunday</span>
                  <span>9:00 AM – 10:30 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-[#dcd7ce]/60 font-light">
                Midnight surprise delivery available across Hathras with 6-hour prior notice.
              </p>
            </div>
          </div>

          {/* Visit & Contact */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#f5cb88] mb-4">
              Visit The Bakery
            </h4>
            <div className="space-y-3 text-xs text-[#dcd7ce]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                <span>
                  Main Market, Near Sadabad Gate & Kamla Nagar, Hathras, Uttar Pradesh – 204101
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4a359] shrink-0" />
                <a href="tel:+919837000000" className="hover:text-[#f5cb88]">
                  +91 98370 XXXXX / 05722 2XXXX
                </a>
              </div>
              <a
                href="https://wa.me/919837000000?text=Hello%20Kumar's%20Cakes,%20I%20have%20an%20order%20inquiry!"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-gold-gradient text-xs uppercase tracking-wider font-bold shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#dcd7ce]/60">
          <p>© {new Date().getFullYear()} KUMAR&apos;S Cakes & Bakery. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-[#d4a359] fill-[#d4a359]" />
            <span>for Hathras celebrations</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
