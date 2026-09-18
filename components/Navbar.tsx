"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Phone, MessageCircle, Menu, X, MapPin } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Craft", href: "#scroll-craft" },
    { label: "Bento Menu", href: "#bento-menu" },
    { label: "3D Customizer", href: "#3d-studio" },
    { label: "Hathras Heritage", href: "#heritage" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0908]/85 backdrop-blur-md border-b border-[#d4a359]/20 py-3 shadow-xl shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#d4a359]/40 flex items-center justify-center bg-gradient-to-br from-[#241710] to-[#120a06] shadow-inner group-hover:border-[#d4a359] transition-colors">
            <Sparkles className="w-4 h-4 text-[#d4a359] animate-pulse" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fffbf5] via-[#f5cb88] to-[#d4a359]">
              KUMAR&apos;S
            </span>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#d4a359]/85 font-medium">
              <span>Cakes & Bakery</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-[#f5f5f0]">
                <MapPin className="w-2.5 h-2.5 text-[#d4a359]" /> Hathras
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#dcd7ce] hover:text-[#f5cb88] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#d4a359] to-[#c68642] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919837000000"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#d4a359]/30 text-xs font-medium text-[#f5f5f0] hover:border-[#d4a359] hover:bg-[#1b120c] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>Call Bakery</span>
          </a>
          <a
            href="https://wa.me/919837000000?text=Hello%20Kumar's%20Cakes,%20I%20would%20like%20to%20order%20a%20celebration%20cake!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full btn-gold-gradient text-xs uppercase tracking-wider shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#f5f5f0] hover:text-[#d4a359] hover:bg-white/5 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#140e0a] border-b border-[#d4a359]/20 px-6 py-5 flex flex-col gap-4 text-xs font-medium uppercase tracking-wider"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f5f5f0] hover:text-[#f5cb88] py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/919837000000?text=Hello%20Kumar's%20Cakes,%20I%20would%20like%20to%20order%20a%20celebration%20cake!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-full btn-gold-gradient text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
