import Navbar from "@/components/Navbar";
import DynamicScrollCanvas from "@/components/DynamicScrollCanvas";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import BentoGridMenu from "@/components/BentoGridMenu";
import Dynamic3DViewer from "@/components/Dynamic3DViewer";
import LocalHeritage from "@/components/LocalHeritage";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0c0908] text-[#f5f5f0] selection:bg-[#d4a359] selection:text-[#0c0908] w-full overflow-x-clip">
      {/* 1. Fixed Luxury Navigation Bar */}
      <Navbar />

      {/* 2. Merged Hero & Video Scroll Canvas (Top of Screen, Fullscreen Cover, Progressive Frame Loader) */}
      <DynamicScrollCanvas />

      {/* 3. High-End Dark Luxury Infinite Marquee */}
      <InfiniteMarquee />

      {/* 4. Dark Glassmorphism Bento Grid Menu */}
      <BentoGridMenu />

      {/* 5. Lazy-Loaded 3D Cake Studio (Three.js / React Three Fiber) */}
      <Dynamic3DViewer />

      {/* 6. Hathras Local Heritage, Guarantees & Reviews */}
      <LocalHeritage />

      {/* 7. Deep Dark Roast Bakehouse Footer */}
      <Footer />
    </main>
  );
}
