"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Float,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Sparkles,
  RotateCcw,
  Check,
  ShoppingBag,
  Layers,
  Palette,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
  Box,
} from "lucide-react";
import confetti from "canvas-confetti";

function CakeModel({ frostingColor }: { frostingColor: string }) {
  const { scene } = useGLTF("/cake_1.glb");
  const modelRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }, [scene, frostingColor]);

  return (
    <group ref={modelRef} dispose={null}>
      <Center>
        <primitive object={scene} scale={2.4} position={[0, -0.2, 0]} />
      </Center>
    </group>
  );
}

function Loader3D() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0908]/85 backdrop-blur-sm z-10">
      <div className="w-10 h-10 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin" />
      <span className="font-serif text-xs text-[#f5cb88] font-semibold mt-3 tracking-widest uppercase">
        Loading 3D Confection...
      </span>
      <span className="text-[10px] text-[#e0dad0]/60 mt-0.5">Drag to rotate 360°</span>
    </div>
  );
}

const flavors = [
  { id: "truffle", name: "Belgian Dark Truffle", extra: 0, tag: "Chef Choice" },
  { id: "caramel", name: "Salted Caramel Swirl", extra: 100, tag: "Rich & Gooey" },
  { id: "vanilla", name: "Royal Vanilla Bean", extra: 50, tag: "Classic" },
  { id: "pistachio", name: "Pistachio Rose Berry", extra: 150, tag: "Luxury Special" },
];

const tiers = [
  { id: "1-tier", name: "1 Tier (1 kg)", desc: "Serves 6-8 guests", basePrice: 650 },
  { id: "2-tier", name: "2 Tiers Grand (2.5 kg)", desc: "Serves 18-22 guests", basePrice: 1650 },
  { id: "3-tier", name: "3 Tiers Royal (4.5 kg)", desc: "Wedding grand (40+)", basePrice: 3200 },
];

const frostingColors = [
  { id: "espresso", name: "Dark Chocolate", hex: "#2b1810" },
  { id: "gold", name: "Warm Gold Cream", hex: "#d4a359" },
  { id: "ivory", name: "Ivory Whipped", hex: "#faf6f0" },
  { id: "berry", name: "Velvet Blush", hex: "#b84a5f" },
];

const toppings = [
  { id: "gold-leaf", name: "24K Edible Gold Leaf", price: 150 },
  { id: "macarons", name: "French Macarons (4 pcs)", price: 200 },
  { id: "praline", name: "Roasted Hazelnut Rocks", price: 100 },
  { id: "flowers", name: "Fresh Edible Botanicals", price: 150 },
];

export default function CakeViewer3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [selectedTier, setSelectedTier] = useState(tiers[1]);
  const [selectedFrosting, setSelectedFrosting] = useState(frostingColors[1]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["gold-leaf"]);
  const [customText, setCustomText] = useState("Happy Celebration!");
  const [autoRotate, setAutoRotate] = useState(true);

  // Lazy loading 3D section via IntersectionObserver: only loads heavy 3D engine when near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toppingsTotal = selectedToppings.reduce((acc, tId) => {
    const found = toppings.find((t) => t.id === tId);
    return acc + (found ? found.price : 0);
  }, 0);

  const totalPrice = selectedTier.basePrice + selectedFlavor.extra + toppingsTotal;

  const handleOrder = () => {
    confetti({
      particleCount: 85,
      spread: 65,
      origin: { y: 0.6 },
      colors: ["#d4a359", "#c68642", "#f5f5f0", "#2b1810"],
    });

    const toppingNames = selectedToppings
      .map((tId) => toppings.find((t) => t.id === tId)?.name)
      .filter(Boolean)
      .join(", ");

    const text = encodeURIComponent(
      `Hello Kumar's Cakes & Bakery (Hathras)!\n\nI would like to order this 3D Custom Cake:\n` +
        `• Tier: ${selectedTier.name}\n` +
        `• Flavor: ${selectedFlavor.name}\n` +
        `• Frosting Tone: ${selectedFrosting.name}\n` +
        `• Gourmet Add-ons: ${toppingNames || "None"}\n` +
        `• Custom Inscription: "${customText}"\n` +
        `• Estimated Price: ₹${totalPrice}\n\n` +
        `Please confirm delivery time in Hathras!`
    );

    window.open(`https://wa.me/919837000000?text=${text}`, "_blank");
  };

  return (
    <section
      id="3d-studio"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 bg-[#0c0908] text-[#f5f5f0] overflow-hidden w-full max-w-full"
    >
      {/* 1px Gold Gradient Section Divider */}
      <div className="divider-gold-gradient absolute top-0 left-0" />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d4a359]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#c68642]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#d4a359]/35 bg-[#1b120c]/90 backdrop-blur-md shadow-lg mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#f5cb88] uppercase">
              INTERACTIVE 3D CAKE STUDIO
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffbf5] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-[1.15] px-2">
            Sculpt Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#faede0] via-[#f5cb88] to-[#d4a359]">
              Celebration Centerpiece
            </span>
          </h2>

          <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4a359]/60 to-transparent mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4" />

          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#e5dfd5] font-light max-w-xl mx-auto leading-relaxed px-2">
            Rotate the cake in full 360° studio lighting, configure tiers,
            flavors, and toppings, then send your order directly to our Hathras bakehouse.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* 3D Canvas Column */}
          <div className="lg:col-span-7 bg-[#140e0a]/90 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col h-[320px] sm:h-[480px] lg:h-[620px]">
            {/* HUD Status */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#1b120c]/90 backdrop-blur-md border border-[#d4a359]/35 shadow-md flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-[#fffbf5]">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Studio 3D View</span>
              </div>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="pointer-events-auto px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#1b120c]/90 backdrop-blur-md border border-[#d4a359]/35 shadow-md text-[10px] sm:text-xs font-medium text-[#f5cb88] hover:bg-[#251811] flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                <span>{autoRotate ? "Auto-Spin: ON" : "Auto-Spin: OFF"}</span>
              </button>
            </div>

            {/* Lazy-Loaded Three.js Canvas */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing touch-none">
              {isInView ? (
                <Suspense fallback={<Loader3D />}>
                  <Canvas
                    shadows
                    camera={{ position: [0, 1.8, 4.5], fov: 42 }}
                    className="w-full h-full"
                  >
                    <ambientLight intensity={1.2} />
                    <directionalLight
                      position={[5, 8, 5]}
                      intensity={1.8}
                      castShadow
                      shadow-mapSize={[1024, 1024]}
                    />
                    <directionalLight position={[-5, 4, -4]} intensity={0.9} color="#ffd8a8" />
                    <pointLight position={[0, 4, 2]} intensity={0.8} color="#d4a359" />

                    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
                      <CakeModel frostingColor={selectedFrosting.hex} />
                    </Float>

                    <ContactShadows
                      position={[0, -1.2, 0]}
                      opacity={0.6}
                      scale={8}
                      blur={2.5}
                      far={4}
                      color="#000000"
                    />

                    <OrbitControls
                      enableZoom={true}
                      enableRotate={true}
                      enablePan={false}
                      autoRotate={autoRotate}
                      autoRotateSpeed={1.4}
                      minDistance={2.4}
                      maxDistance={6.5}
                      maxPolarAngle={Math.PI / 2 + 0.15}
                    />
                  </Canvas>
                </Suspense>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#140e0a]">
                  <Box className="w-8 h-8 text-[#d4a359] animate-pulse mb-2" />
                  <span className="font-serif text-xs text-[#f5cb88] tracking-widest uppercase">
                    3D Studio Ready
                  </span>
                  <span className="text-[10px] text-[#dcd7ce]/60 mt-0.5">Scroll to enter</span>
                </div>
              )}
            </div>

            {/* Bottom 3D instruction */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-0 right-0 text-center pointer-events-none z-10 px-2">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#f5cb88] bg-[#1b120c]/90 backdrop-blur-md px-3 sm:px-4 py-0.5 sm:py-1 rounded-full border border-white/10 shadow-md inline-block">
                Drag to rotate • Pinch / scroll to zoom 360°
              </span>
            </div>
          </div>

          {/* Dark Glassmorphic Customizer Panel on Right */}
          <div className="lg:col-span-5 bg-[#19110b]/75 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-7 lg:p-8 shadow-2xl flex flex-col gap-5 sm:gap-6">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#d4a359] uppercase">
                  Bespoke Studio
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#fffbf5]">
                  Cake Customization
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] sm:text-[10px] text-[#dcd7ce]/70 uppercase tracking-wider block font-medium">
                  Estimated Total
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#f5cb88]">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* 1. Tiers */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#d4a359] mb-2 sm:mb-2.5">
                <Layers className="w-3.5 h-3.5" />
                <span>1. Select Cake Tiers</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {tiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#d4a359] bg-[#291a12] shadow-sm ring-1 ring-[#d4a359]/70"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-[#f5f5f0]"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#fffbf5]">{tier.name}</div>
                      <div className="text-[10px] text-[#dcd7ce]/70 mt-0.5">
                        {tier.desc}
                      </div>
                      <div className="text-xs font-semibold text-[#f5cb88] mt-1.5">
                        ₹{tier.basePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Flavor */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#d4a359] mb-2 sm:mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>2. Signature Flavor</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {flavors.map((flavor) => {
                  const isSelected = selectedFlavor.id === flavor.id;
                  return (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#d4a359] bg-[#291a12] ring-1 ring-[#d4a359]/70"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#fffbf5]">
                          {flavor.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#d4a359]" />}
                      </div>
                      <span className="text-[10px] text-[#dcd7ce]/70 block mt-0.5">
                        {flavor.extra === 0 ? "Standard" : `+₹${flavor.extra}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Frosting Color */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#d4a359] mb-2 sm:mb-2.5">
                <Palette className="w-3.5 h-3.5" />
                <span>3. Frosting Tone</span>
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {frostingColors.map((color) => {
                  const isSelected = selectedFrosting.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedFrosting(color)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer text-xs font-medium ${
                        isSelected
                          ? "border-[#d4a359] bg-[#291a12] ring-1 ring-[#d4a359]/70 text-[#fffbf5]"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-[#dcd7ce]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Gourmet Add-ons */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#d4a359] mb-2 sm:mb-2.5">
                <BadgePercent className="w-3.5 h-3.5" />
                <span>4. Gourmet Add-ons</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toppings.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={() => toggleTopping(top.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isChecked
                          ? "border-[#d4a359] bg-[#291a12] font-semibold text-[#f5cb88]"
                          : "border-white/10 bg-white/5 text-[#dcd7ce]/80 hover:bg-white/10"
                      }`}
                    >
                      <span>{top.name}</span>
                      <span className="text-[11px] text-[#d4a359] font-medium">
                        +₹{top.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Custom Inscription */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#d4a359] mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>5. Personalized Inscription</span>
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Happy 25th Anniversary Papa & Maa!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/50 text-xs text-[#fffbf5] placeholder:text-[#dcd7ce]/40 focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359]"
                maxLength={40}
              />
            </div>

            {/* Order CTA */}
            <div className="pt-1 sm:pt-2">
              <button
                onClick={handleOrder}
                className="w-full py-3 sm:py-3.5 rounded-2xl btn-gold-gradient font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Custom 3D Cake • ₹{totalPrice}</span>
              </button>
              <div className="mt-2.5 flex items-center justify-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] text-[#dcd7ce]/70">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Free Hathras delivery
                </span>
                <span>•</span>
                <span>100% Eggless Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
