"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const CHAMPAGNE = "#d6d0c4";

// Drop a real wheel model at public/wheel.glb and it loads automatically.
const MODEL_URL = "/wheel.glb";
const MODEL_FIT = 3.4; // target diameter in scene units

// ---- procedural fallback (BBS-style mesh) ----
const N = 12;
const RI = 0.58;
const RM = 1.1;
const RO = 1.62;
const SPAN = Math.PI / N;

const SILVER = { color: "#cdcabf", metalness: 0.58, roughness: 0.3, envMapIntensity: 1.5 };
const LIP = { color: "#e4dfd4", metalness: 0.62, roughness: 0.2, envMapIntensity: 1.7 };
const DARK = { color: "#15130f", metalness: 0.5, roughness: 0.5, envMapIntensity: 1 };

type Spoke = { mx: number; my: number; len: number; ang: number };

function FirstFrame({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      onReady?.();
    }
  });
  return null;
}

/** Tilt + auto-spin rig shared by the GLB model and the procedural fallback. */
function SpinningRig({ children }: { children: ReactNode }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((state, delta) => {
    if (spin.current && !reduceMotion) {
      spin.current.rotation.z -= Math.min(delta, 0.05) * 0.4;
    }
    if (tilt.current) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -0.28 + py * 0.14, 0.05);
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, -0.08 + px * 0.36, 0.05);
    }
  });

  return (
    <group ref={tilt} rotation={[-0.28, -0.08, 0]} scale={1.04}>
      <group ref={spin}>{children}</group>
    </group>
  );
}

function GLBWheel() {
  const { scene } = useGLTF(MODEL_URL);
  const { model, rotation } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = MODEL_FIT / maxDim;
    // Scale first, then recenter using the *scaled* centre so it stays in frame.
    clone.scale.setScalar(s);
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);
    clone.traverse((o) => {
      o.castShadow = true;
      o.receiveShadow = true;
    });
    // Auto-orient: a wheel is thin along its axle. Point that axle at the camera (+Z).
    const min = Math.min(size.x, size.y, size.z);
    let rot: [number, number, number] = [0, 0, 0];
    if (min === size.x) rot = [0, Math.PI / 2, 0];
    else if (min === size.y) rot = [Math.PI / 2, 0, 0];
    return { model: clone, rotation: rot };
  }, [scene]);

  return (
    <group rotation={rotation}>
      <primitive object={model} />
    </group>
  );
}

function ProceduralWheel() {
  const spokes = useMemo<Spoke[]>(() => {
    const out: Spoke[] = [];
    const push = (r1: number, a1: number, r2: number, a2: number) => {
      const x1 = Math.cos(a1) * r1;
      const y1 = Math.sin(a1) * r1;
      const x2 = Math.cos(a2) * r2;
      const y2 = Math.sin(a2) * r2;
      out.push({
        mx: (x1 + x2) / 2,
        my: (y1 + y2) / 2,
        len: Math.hypot(x2 - x1, y2 - y1),
        ang: Math.atan2(y2 - y1, x2 - x1),
      });
    };
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      push(RM, t, RO, t + SPAN);
      push(RM, t, RO, t - SPAN);
      const t2 = t + Math.PI / N;
      push(RI, t2, RM, t2 + SPAN);
      push(RI, t2, RM, t2 - SPAN);
    }
    return out;
  }, []);
  const lugs = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  return (
    <>
      <mesh position={[0, 0, -0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.66, 1.5, 0.5, 96, 1, true]} />
        <meshStandardMaterial {...DARK} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.34]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.04, 96]} />
        <meshStandardMaterial {...DARK} />
      </mesh>

      <mesh position={[0, 0, 0.04]}>
        <torusGeometry args={[1.7, 0.085, 28, 180]} />
        <meshStandardMaterial {...LIP} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <torusGeometry args={[1.72, 0.05, 24, 180]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[1.6, 0.06, 24, 180]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>

      {spokes.map((s, i) => (
        <mesh key={i} position={[s.mx, s.my, 0.04]} rotation={[0, 0, s.ang]}>
          <boxGeometry args={[s.len + 0.03, 0.07, 0.05]} />
          <meshStandardMaterial {...SILVER} />
        </mesh>
      ))}

      <mesh position={[0, 0, 0.035]}>
        <torusGeometry args={[RM, 0.03, 18, 160]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <torusGeometry args={[RI, 0.075, 22, 140]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>
      <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.3, 56]} />
        <meshStandardMaterial {...SILVER} />
      </mesh>

      {lugs.map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const r = 0.34;
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.12, 6]} />
            <meshStandardMaterial color="#3a3833" metalness={0.7} roughness={0.35} />
          </mesh>
        );
      })}

      <mesh position={[0, 0, 0.16]} scale={[1, 1, 0.5]}>
        <sphereGeometry args={[0.3, 44, 30]} />
        <meshStandardMaterial color="#0f0e0b" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.3]}>
        <torusGeometry args={[0.2, 0.018, 16, 64]} />
        <meshStandardMaterial color={CHAMPAGNE} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.32]}>
        <circleGeometry args={[0.05, 32]} />
        <meshStandardMaterial color={CHAMPAGNE} metalness={0.6} roughness={0.35} />
      </mesh>
    </>
  );
}

/** Falls back to the procedural wheel if the GLB is missing or fails to load. */
class WheelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function Wheel3D({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.6], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <FirstFrame onReady={onReady} />

      <ambientLight intensity={0.85} />
      <hemisphereLight color="#f0ece2" groundColor="#100f0c" intensity={1.4} />
      <directionalLight position={[5, 8, 6]} intensity={3} />
      <directionalLight position={[-6, 1, 4]} intensity={1.3} color="#efe9dc" />

      <SpinningRig>
        <WheelBoundary fallback={<ProceduralWheel />}>
          <Suspense fallback={<ProceduralWheel />}>
            <GLBWheel />
          </Suspense>
        </WheelBoundary>
      </SpinningRig>

      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 5]} scale={[10, 5, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.6} position={[-5, 1, 3]} scale={[4, 8, 1]} color="#f3ede1" />
          <Lightformer form="rect" intensity={2.2} position={[5, -1, 2]} scale={[5, 5, 1]} color="#ffffff" />
          <Lightformer form="ring" intensity={1.8} position={[0, -3, -4]} scale={8} color={CHAMPAGNE} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
