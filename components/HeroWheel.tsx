"use client";

import dynamic from "next/dynamic";

const Wheel3D = dynamic(() => import("./Wheel3D").then((m) => m.Wheel3D), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-40 w-40 rounded-full border-2 border-white/10 border-t-accent"
        style={{ animation: "spinSlow 1.1s linear infinite" }}
      />
    </div>
  );
}

export function HeroWheel() {
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
      <div className="relative z-10 h-full w-full">
        <Wheel3D />
      </div>
    </div>
  );
}
