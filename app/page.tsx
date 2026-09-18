import Navbar from "@/components/Navbar";
import DynamicScrollCanvas from "@/components/DynamicScrollCanvas";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import BentoGridMenu from "@/components/BentoGridMenu";
import Dynamic3DViewer from "@/components/Dynamic3DViewer";
import LocalHeritage from "@/components/LocalHeritage";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#faf9f6] text-[#1c1c1c] selection:bg-[#ede5da] selection:text-[#1c1c1c]">
      {/* 1. Minimalist Glass Navigation Bar */}
      <Navbar />

      {/* 2. Merged Hero & Video Scroll Canvas (Top of Screen, h-[300vh]) */}
      <DynamicScrollCanvas />

      {/* 3. Clean Infinite Marquee (Stark white, bold charcoal text) */}
      <InfiniteMarquee />

      {/* 4. Floating Light-Themed Bento Grid Menu */}
      <BentoGridMenu />

      {/* 5. Immersive Bright Studio 3D Cake Studio */}
      <Dynamic3DViewer />

      {/* 6. Hathras Heritage & Verified Reviews */}
      <LocalHeritage />

      {/* 7. Minimalist Warm Light Bakehouse Footer */}
      <Footer />
    </main>
  );
}
