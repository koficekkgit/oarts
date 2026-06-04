"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const ACCENT = "#5cd6e6";
const SPOKES = 10;
const LUGS = 5;

// Metalness kept moderate so diffuse lighting fully reveals the form on the
// very first frame — before the environment map bakes — avoiding a dark flash.
const SILVER = { color: "#dadee4", metalness: 0.5, roughness: 0.34, envMapIntensity: 1.5 };
const DARK_METAL = { color: "#262a30", metalness: 0.6, roughness: 0.45, envMapIntensity: 1.1 };

function WheelModel() {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((state, delta) => {
    if (spin.current && !reduceMotion) {
      spin.current.rotation.z -= Math.min(delta, 0.05) * 0.5;
    }
    if (tilt.current) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -0.32 + py * 0.16, 0.05);
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, -0.1 + px * 0.4, 0.05);
    }
  });

  const spokes = useMemo(() => Array.from({ length: SPOKES }, (_, i) => i), []);
  const lugs = useMemo(() => Array.from({ length: LUGS }, (_, i) => i), []);

  return (
    <group ref={tilt} rotation={[-0.32, -0.1, 0]} scale={0.92}>
      <group ref={spin}>
        {/* Tire */}
        <mesh>
          <torusGeometry args={[2.0, 0.42, 32, 160]} />
          <meshStandardMaterial color="#17191c" roughness={0.82} metalness={0.25} />
        </mesh>

        {/* Bead seat */}
        <mesh>
          <torusGeometry args={[1.74, 0.12, 24, 160]} />
          <meshStandardMaterial {...DARK_METAL} />
        </mesh>

        {/* Polished outer lip */}
        <mesh position={[0, 0, 0.05]}>
          <torusGeometry args={[1.62, 0.1, 24, 160]} />
          <meshStandardMaterial color="#e6eaee" metalness={0.55} roughness={0.22} envMapIntensity={1.6} />
        </mesh>

        {/* Dish back plate */}
        <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.12, 96]} />
          <meshStandardMaterial color="#191c20" metalness={0.6} roughness={0.55} />
        </mesh>

        {/* Spokes */}
        {spokes.map((i) => (
          <group key={i} rotation={[0, 0, (i / SPOKES) * Math.PI * 2]}>
            <mesh position={[0, 1.03, 0.02]} scale={[1, 1, 0.5]}>
              <cylinderGeometry args={[0.07, 0.15, 1.18, 20]} />
              <meshStandardMaterial {...SILVER} />
            </mesh>
          </group>
        ))}

        {/* Hub */}
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.36, 48]} />
          <meshStandardMaterial {...SILVER} />
        </mesh>

        {/* Lug nuts */}
        {lugs.map((i) => {
          const a = (i / LUGS) * Math.PI * 2 - Math.PI / 2;
          const r = 0.34;
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.14, 6]} />
              <meshStandardMaterial color="#3a3f46" metalness={0.85} roughness={0.35} />
            </mesh>
          );
        })}

        {/* Center cap */}
        <mesh position={[0, 0, 0.18]} scale={[1, 1, 0.45]}>
          <sphereGeometry args={[0.3, 40, 28]} />
          <meshStandardMaterial color="#15191e" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Accent center */}
        <mesh position={[0, 0, 0.34]}>
          <circleGeometry args={[0.14, 40]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function Wheel3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      style={{ background: "transparent" }}
    >
      {/* Lighting rig — reveals metal form independent of the env map */}
      <ambientLight intensity={0.95} />
      <hemisphereLight color="#dcefff" groundColor="#0d1014" intensity={1.6} />
      <directionalLight position={[5, 8, 6]} intensity={3.2} />
      <directionalLight position={[-6, 2, 4]} intensity={1.5} color="#bfefff" />
      <pointLight position={[0, -4, 3]} intensity={22} color={ACCENT} distance={14} />

      <WheelModel />

      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 5]} scale={[10, 5, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.6} position={[-5, 1, 3]} scale={[4, 8, 1]} color="#cdeaff" />
          <Lightformer form="rect" intensity={2.2} position={[5, -1, 2]} scale={[5, 5, 1]} color="#ffffff" />
          <Lightformer form="ring" intensity={2} position={[0, -3, -4]} scale={8} color={ACCENT} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
