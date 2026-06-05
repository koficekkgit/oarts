"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Wheel3D = dynamic(() => import("./Wheel3D").then((m) => m.Wheel3D), {
  ssr: false,
  loading: () => null,
});

export function HeroWheel() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* soft overhead spotlight grounding the wheel */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="h-[78%] w-[78%] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(214,208,196,0.12), rgba(184,184,184,0.05) 42%, transparent 70%)",
            filter: "blur(26px)",
          }}
        />
      </div>

      {/* 3D canvas */}
      <div
        className={`relative z-10 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Wheel3D onReady={() => setReady(true)} />
      </div>

      {/* loading state — stays until the first 3D frame is painted */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="h-24 w-24 rounded-full border border-white/10"
          style={{ borderTopColor: "#d6d0c4", animation: "spinSlow 1.2s linear infinite" }}
        />
      </div>
    </div>
  );
}
