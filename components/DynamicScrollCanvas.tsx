"use client";

import dynamic from "next/dynamic";

const ScrollCanvas = dynamic(() => import("./ScrollCanvasAnimation"), {
  ssr: false,
  loading: () => (
    <div className="h-[290vh] bg-[#0c0806] flex items-start justify-center pt-32">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin" />
        <span className="font-serif text-sm text-[#f5cb88] tracking-widest uppercase">
          Loading Artisanal Canvas...
        </span>
      </div>
    </div>
  ),
});

export default function DynamicScrollCanvas() {
  return <ScrollCanvas />;
}
