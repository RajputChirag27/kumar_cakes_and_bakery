"use client";

import React, { useState, Suspense, useRef } from "react";
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
  Info,
  Layers,
  Palette,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

// Preload the GLB model
useGLTF.preload("/cake_1.glb");

function CakeModel({ frostingColor }: { frostingColor: string }) {
  const { scene } = useGLTF("/cake_1.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Apply subtle tint accent if desired to cake materials
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
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7f2ea]/60 backdrop-blur-sm z-10">
      <div className="w-12 h-12 rounded-full border-3 border-[#c68642]/30 border-t-[#c68642] animate-spin" />
      <span className="font-serif text-sm text-[#3b2316] font-semibold mt-3 tracking-wider">
        Loading 3D Confection...
      </span>
      <span className="text-[11px] text-[#6b4c39]">Spin & Zoom once loaded</span>
    </div>
  );
}

const flavors = [
  { id: "truffle", name: "Belgian Dark Truffle", extra: 0, tag: "Chef's Choice" },
  { id: "caramel", name: "Salted Caramel Swirl", extra: 100, tag: "Rich & Gooey" },
  { id: "vanilla", name: "Royal Vanilla Bean", extra: 50, tag: "Classic" },
  { id: "pistachio", name: "Pistachio Rose Berry", extra: 150, tag: "Luxury Special" },
];

const tiers = [
  { id: "1-tier", name: "1 Tier (1 kg)", desc: "Serves 6-8 guests", basePrice: 650 },
  { id: "2-tier", name: "2 Tiers Grand (2.5 kg)", desc: "Serves 18-22 guests", basePrice: 1650 },
  { id: "3-tier", name: "3 Tiers Royal (4.5 kg)", desc: "Wedding centerpiece (40+ guests)", basePrice: 3200 },
];

const frostingColors = [
  { id: "espresso", name: "Dark Espresso", hex: "#2b1810", lightColor: "#ffe5d0" },
  { id: "gold", name: "Warm Gold Cream", hex: "#d4a359", lightColor: "#fff4d9" },
  { id: "ivory", name: "Ivory Whipped", hex: "#f5eedf", lightColor: "#ffffff" },
  { id: "berry", name: "Velvet Blush", hex: "#b84a5f", lightColor: "#ffd6df" },
];

const toppings = [
  { id: "gold-leaf", name: "24K Edible Gold Leaf", price: 150 },
  { id: "macarons", name: "Handcrafted French Macarons", price: 200 },
  { id: "praline", name: "Hazelnut Praline Rocks", price: 100 },
  { id: "flowers", name: "Fresh Edible Blooms", price: 150 },
];

export default function CakeViewer3D() {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [selectedTier, setSelectedTier] = useState(tiers[1]);
  const [selectedFrosting, setSelectedFrosting] = useState(frostingColors[1]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["gold-leaf"]);
  const [customText, setCustomText] = useState("Happy Celebration!");
  const [autoRotate, setAutoRotate] = useState(true);

  // Toggle topping
  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total price
  const toppingsTotal = selectedToppings.reduce((acc, tId) => {
    const found = toppings.find((t) => t.id === tId);
    return acc + (found ? found.price : 0);
  }, 0);

  const totalPrice = selectedTier.basePrice + selectedFlavor.extra + toppingsTotal;

  // Handle WhatsApp order checkout
  const handleOrder = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4a359", "#c68642", "#ffffff", "#2b1810"],
    });

    const toppingNames = selectedToppings
      .map((tId) => toppings.find((t) => t.id === tId)?.name)
      .filter(Boolean)
      .join(", ");

    const text = encodeURIComponent(
      `Hello Kumar's Cakes & Bakery (Hathras)!\n\nI would like to book this 3D Custom Cake:\n` +
        `• Tier: ${selectedTier.name}\n` +
        `• Flavor: ${selectedFlavor.name}\n` +
        `• Frosting Tone: ${selectedFrosting.name}\n` +
        `• Toppings: ${toppingNames || "None"}\n` +
        `• Message on Cake: "${customText}"\n` +
        `• Estimated Price: ₹${totalPrice}\n\n` +
        `Please confirm delivery availability!`
    );

    window.open(`https://wa.me/919837000000?text=${text}`, "_blank");
  };

  return (
    <section
      id="3d-studio"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#fbf8f2] via-[#f7f2ea] to-[#eee5d8] text-[#1e140d] overflow-hidden"
    >
      {/* Subtle warm background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4a359]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c68642]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c68642]/30 bg-white/80 backdrop-blur-sm shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#b26a28]" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8a4b16] uppercase">
              INTERACTIVE 3D CAKE STUDIO
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#23150d]">
            Design Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b26a28] via-[#d4a359] to-[#8a4b16]">
              Dream Centerpiece
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5c4033] font-normal">
            Interact with our 3D model in real time. Rotate, inspect every tier,
            customize flavors, and send directly to our Hathras chefs.
          </p>
        </div>

        {/* Split Layout: 3D Canvas on Left, Customizer Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Canvas Column */}
          <div className="lg:col-span-7 bg-white/85 rounded-3xl border border-[#c68642]/20 shadow-2xl overflow-hidden relative flex flex-col h-[520px] sm:h-[620px]">
            {/* Interactive HUD bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#c68642]/25 shadow-sm flex items-center gap-2 text-xs font-semibold text-[#3b2316]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>3D Preview Active</span>
              </div>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#c68642]/25 shadow-sm text-xs font-medium text-[#3b2316] hover:bg-[#fff9f2] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                <span>{autoRotate ? "Auto-Spin: ON" : "Auto-Spin: OFF"}</span>
              </button>
            </div>

            {/* Three.js Canvas */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <Suspense fallback={<Loader3D />}>
                <Canvas
                  shadows
                  camera={{ position: [0, 1.8, 4.5], fov: 42 }}
                  className="w-full h-full"
                >
                  <ambientLight intensity={1.1} />
                  <directionalLight
                    position={[4, 7, 5]}
                    intensity={1.6}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                  />
                  <directionalLight position={[-4, 3, -3]} intensity={0.6} />
                  <pointLight
                    position={[0, 3, 2]}
                    intensity={0.8}
                    color={selectedFrosting.lightColor}
                  />

                  <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                    <CakeModel frostingColor={selectedFrosting.hex} />
                  </Float>

                  <ContactShadows
                    position={[0, -1.2, 0]}
                    opacity={0.5}
                    scale={7}
                    blur={2.5}
                    far={4}
                  />

                  <OrbitControls
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate={autoRotate}
                    autoRotateSpeed={1.5}
                    minDistance={2.5}
                    maxDistance={7}
                    maxPolarAngle={Math.PI / 2 + 0.15}
                  />
                </Canvas>
              </Suspense>
            </div>

            {/* Bottom 3D Helper instruction */}
            <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none z-10">
              <span className="text-[11px] font-medium text-[#7a5843] bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-black/5 shadow-xs">
                Drag to rotate • Pinch / scroll to zoom 360°
              </span>
            </div>
          </div>

          {/* Customization Glassmorphism Panel on Right */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl rounded-3xl border border-[#c68642]/30 p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#c68642]/20">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#b26a28] uppercase">
                  Bespoke Studio
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#23150d]">
                  Cake Customization
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#7a5843] uppercase tracking-wider block">
                  Est. Total
                </span>
                <span className="font-serif text-2xl font-bold text-[#b26a28]">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* 1. Select Tier */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3b2316] mb-2.5">
                <Layers className="w-4 h-4 text-[#b26a28]" />
                <span>1. Select Cake Tiers</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {tiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#b26a28] bg-[#fff9f2] shadow-sm ring-1 ring-[#b26a28]"
                          : "border-black/10 bg-white/60 hover:bg-white"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#23150d]">
                        {tier.name}
                      </div>
                      <div className="text-[10px] text-[#7a5843] mt-0.5">
                        {tier.desc}
                      </div>
                      <div className="text-xs font-semibold text-[#b26a28] mt-1.5">
                        ₹{tier.basePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Flavor */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3b2316] mb-2.5">
                <Sparkles className="w-4 h-4 text-[#b26a28]" />
                <span>2. Signature Flavor</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {flavors.map((flavor) => {
                  const isSelected = selectedFlavor.id === flavor.id;
                  return (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#b26a28] bg-[#fff9f2] shadow-sm ring-1 ring-[#b26a28]"
                          : "border-black/10 bg-white/60 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#23150d]">
                          {flavor.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#b26a28]" />}
                      </div>
                      <span className="text-[10px] text-[#7a5843] block mt-0.5">
                        {flavor.extra === 0 ? "Included" : `+₹${flavor.extra}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Frosting Color Palette */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3b2316] mb-2.5">
                <Palette className="w-4 h-4 text-[#b26a28]" />
                <span>3. Frosting Color Tone</span>
              </label>
              <div className="flex items-center gap-3">
                {frostingColors.map((color) => {
                  const isSelected = selectedFrosting.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedFrosting(color)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer text-xs font-medium ${
                        isSelected
                          ? "border-[#b26a28] bg-[#fff9f2] ring-1 ring-[#b26a28]"
                          : "border-black/10 bg-white/60 hover:bg-white"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Luxury Toppings */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3b2316] mb-2.5">
                <BadgePercent className="w-4 h-4 text-[#b26a28]" />
                <span>4. Gourmet Add-ons & Toppings</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toppings.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={() => toggleTopping(top.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isChecked
                          ? "border-[#b26a28] bg-[#fff9f2] font-semibold text-[#23150d]"
                          : "border-black/10 bg-white/50 text-[#5c4033] hover:bg-white"
                      }`}
                    >
                      <span>{top.name}</span>
                      <span className="text-[11px] text-[#b26a28]">
                        +₹{top.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Custom Message */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3b2316] mb-2">
                <MessageSquare className="w-4 h-4 text-[#b26a28]" />
                <span>5. Personalized Cake Inscription</span>
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Happy 25th Anniversary Papa & Maa!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-[#23150d] focus:outline-none focus:border-[#b26a28] focus:ring-1 focus:ring-[#b26a28]"
                maxLength={40}
              />
            </div>

            {/* Summary & Order CTA */}
            <div className="pt-2">
              <button
                onClick={handleOrder}
                className="w-full py-4 rounded-2xl btn-gold-gradient font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Custom 3D Cake • ₹{totalPrice}</span>
              </button>
              <div className="mt-2.5 flex items-center justify-center gap-4 text-[11px] text-[#6b4c39]">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Free delivery in Hathras
                </span>
                <span>•</span>
                <span>100% Eggless Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
