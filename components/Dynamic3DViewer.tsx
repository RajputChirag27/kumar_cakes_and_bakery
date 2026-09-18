"use client";

import dynamic from "next/dynamic";

const CakeViewer3D = dynamic(() => import("./CakeViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="py-32 bg-[#0c0908] flex items-center justify-center min-h-[600px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4a359]/20 border-t-[#d4a359] animate-spin" />
        <span className="font-serif text-xs text-[#f5cb88] font-semibold tracking-widest uppercase">
          Initializing 3D Cake Studio...
        </span>
      </div>
    </div>
  ),
});

export default function Dynamic3DViewer() {
  return <CakeViewer3D />;
}
