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
      {/* glow behind the wheel */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="h-[70%] w-[70%] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(92,214,230,0.28), rgba(92,214,230,0.05) 45%, transparent 70%)",
            filter: "blur(30px)",
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
          className="h-28 w-28 rounded-full border-2 border-white/10 border-t-accent"
          style={{ animation: "spinSlow 1.1s linear infinite" }}
        />
      </div>
    </div>
  );
}
