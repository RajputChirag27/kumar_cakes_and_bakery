"use client";

import dynamic from "next/dynamic";

const ScrollCanvas = dynamic(() => import("./ScrollCanvasAnimation"), {
  ssr: false,
  loading: () => (
    <div className="h-[300vh] bg-[#0c0908] flex items-start justify-center pt-32">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin" />
        <span className="font-serif text-xs text-[#f5cb88] tracking-widest uppercase font-semibold">
          Loading Canvas Animation...
        </span>
      </div>
    </div>
  ),
});

export default function DynamicScrollCanvas() {
  return <ScrollCanvas />;
}
