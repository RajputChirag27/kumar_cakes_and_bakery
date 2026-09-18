import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DynamicScrollCanvas from "@/components/DynamicScrollCanvas";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import BentoGridMenu from "@/components/BentoGridMenu";
import Dynamic3DViewer from "@/components/Dynamic3DViewer";
import LocalHeritage from "@/components/LocalHeritage";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0c0806] text-[#faf6f0] selection:bg-[#d4a359] selection:text-[#0c0806]">
      {/* 1. Fixed Luxury Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section (Tall h-screen with 90vw brand anchor) */}
      <HeroSection />

      {/* 3. Cinematic HTML5 Canvas Scroll Animation (Client boundary, ssr: false) */}
      <DynamicScrollCanvas />

      {/* 4. Infinite Highlight Carousel Marquee */}
      <InfiniteMarquee />

      {/* 5. Asymmetric Bento Grid Menu */}
      <BentoGridMenu />

      {/* 6. Immersive 3D Cake Studio (Three.js / React Three Fiber, ssr: false) */}
      <Dynamic3DViewer />

      {/* 7. Hathras Local Heritage, Trust & Reviews */}
      <LocalHeritage />

      {/* 8. Luxury Espresso Bakehouse Footer */}
      <Footer />
    </main>
  );
}
