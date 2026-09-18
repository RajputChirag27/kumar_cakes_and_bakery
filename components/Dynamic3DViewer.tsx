"use client";

import dynamic from "next/dynamic";

const CakeViewer3D = dynamic(() => import("./CakeViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="py-32 bg-[#f7f2ea] flex items-center justify-center min-h-[600px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-3 border-[#c68642]/20 border-t-[#c68642] animate-spin" />
        <span className="font-serif text-base text-[#3b2316] font-semibold tracking-wider">
          Initializing 3D Cake Studio...
        </span>
      </div>
    </div>
  ),
});

export default function Dynamic3DViewer() {
  return <CakeViewer3D />;
}
