"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { createBrushedSteelRoughnessMap } from "./textures";

export type CraftFocusMode = "geometry" | "pivot" | "action";

interface ShearsModelProps {
  focusMode: CraftFocusMode;
  prefersReducedMotion: boolean;
}

function ShearsModel({ focusMode, prefersReducedMotion }: ShearsModelProps) {
  const rootRef = useRef<THREE.Group | null>(null);
  const bladeARef = useRef<THREE.Group | null>(null);
  const bladeBRef = useRef<THREE.Group | null>(null);
  const sweepLightRef = useRef<THREE.PointLight | null>(null);
  const elapsedRef = useRef(0);

  const steelRoughness = useMemo(() => createBrushedSteelRoughnessMap(), []);

  const geometries = useMemo(() => {
    // Tapered Japanese shear blade + shank
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(-1.18, 0.042);
    bladeShape.lineTo(-0.08, 0.055);
    bladeShape.quadraticCurveTo(0.0, 0.078, 0.14, 0.075);
    bladeShape.lineTo(2.05, 0.025);
    bladeShape.quadraticCurveTo(2.22, 0.012, 2.24, -0.008);
    bladeShape.quadraticCurveTo(1.1, -0.075, 0.14, -0.085);
    bladeShape.quadraticCurveTo(-0.02, -0.072, -0.14, -0.052);
    bladeShape.lineTo(-1.18, -0.036);
    bladeShape.closePath();

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.024,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.01,
    });
    bladeGeo.translate(0, 0, -0.012);
    bladeGeo.computeVertexNormals();

    return { bladeGeo };
  }, []);

  useEffect(() => {
    return () => {
      steelRoughness.dispose();
      geometries.bladeGeo.dispose();
    };
  }, [steelRoughness, geometries]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    elapsedRef.current += dt;
    const elapsed = elapsedRef.current;

    const root = rootRef.current;
    const bladeA = bladeARef.current;
    const bladeB = bladeBRef.current;
    const sweepLight = sweepLightRef.current;

    if (!root || !bladeA || !bladeB) return;

    const targetRootRot =
      focusMode === "pivot"
        ? { x: 0.45, y: 0.18, z: -0.22 }
        : focusMode === "action"
          ? { x: 0.12, y: -0.28, z: -0.18 }
          : { x: 0.24, y: -0.45, z: 0.14 };

    const targetOpen =
      focusMode === "action"
        ? 0.26
        : focusMode === "pivot"
          ? 0.14
          : 0.08;

    if (prefersReducedMotion) {
      root.rotation.set(targetRootRot.x, targetRootRot.y, targetRootRot.z);
      bladeA.rotation.z = targetOpen;
      bladeB.rotation.z = -targetOpen;
      return;
    }

    const floatY = Math.sin(elapsed * 0.95) * 0.045;
    root.position.y = THREE.MathUtils.lerp(root.position.y, floatY, dt * 3.2);

    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      targetRootRot.x + Math.sin(elapsed * 0.6) * 0.035,
      dt * 3.2
    );
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      targetRootRot.y + Math.cos(elapsed * 0.5) * 0.045,
      dt * 3.2
    );
    root.rotation.z = THREE.MathUtils.lerp(
      root.rotation.z,
      targetRootRot.z,
      dt * 3.2
    );

    const snipCadence = Math.pow(Math.max(0, Math.sin(elapsed * 2.4)), 2) * 0.11;
    const pulseOpen =
      focusMode === "action"
        ? targetOpen - snipCadence
        : targetOpen + Math.sin(elapsed * 1.1) * 0.012;

    bladeA.rotation.z = THREE.MathUtils.lerp(bladeA.rotation.z, pulseOpen, dt * 5.5);
    bladeB.rotation.z = THREE.MathUtils.lerp(
      bladeB.rotation.z,
      -pulseOpen,
      dt * 5.5
    );

    if (sweepLight) {
      sweepLight.position.x = Math.sin(elapsed * 0.9) * 2.1;
    }
  });

  return (
    <group ref={rootRef} position={[-0.2, 0, 0]} scale={0.98}>
      <pointLight
        ref={sweepLightRef}
        position={[0, 1.2, 2.4]}
        intensity={1.9}
        distance={7}
        color="#ffffff"
      />
      {/* Upper Thumb Shear Half */}
      <group ref={bladeARef} position={[0, 0, 0.018]} rotation={[0, 0, 0.08]}>
        <mesh geometry={geometries.bladeGeo}>
          <meshPhysicalMaterial
            color="#98a2b0"
            metalness={0.94}
            roughness={0.22}
            roughnessMap={steelRoughness}
            clearcoat={0.42}
            envMapIntensity={1.6}
          />
        </mesh>

        {/* Offset Thumb Ring */}
        <mesh position={[-1.38, 0.24, 0]}>
          <torusGeometry args={[0.25, 0.042, 18, 48]} />
          <meshPhysicalMaterial
            color="#8e97a5"
            metalness={0.94}
            roughness={0.22}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Inner Matte Charcoal Comfort Ring */}
        <mesh position={[-1.38, 0.24, 0]}>
          <torusGeometry args={[0.21, 0.024, 14, 48]} />
          <meshStandardMaterial color="#111827" roughness={0.55} />
        </mesh>
      </group>

      {/* Lower Finger Shear Half (Flipped on Y) */}
      <group
        ref={bladeBRef}
        position={[0, 0, -0.018]}
        rotation={[Math.PI, 0, -0.08]}
      >
        <mesh geometry={geometries.bladeGeo}>
          <meshPhysicalMaterial
            color="#858f9e"
            metalness={0.94}
            roughness={0.24}
            roughnessMap={steelRoughness}
            clearcoat={0.4}
            envMapIntensity={1.55}
          />
        </mesh>

        {/* Offset Finger Ring */}
        <mesh position={[-1.44, 0.24, 0]}>
          <torusGeometry args={[0.26, 0.042, 18, 48]} />
          <meshPhysicalMaterial
            color="#86909e"
            metalness={0.94}
            roughness={0.22}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Curved Pinkie Finger Tang */}
        <mesh position={[-1.78, 0.34, 0]} rotation={[0, 0, -0.45]}>
          <cylinderGeometry args={[0.024, 0.036, 0.42, 16]} />
          <meshStandardMaterial
            color="#86909e"
            metalness={0.94}
            roughness={0.22}
          />
        </mesh>
      </group>

      {/* Signature Crimson Tension Dial Screw */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.082, 32]} />
        <meshStandardMaterial
          color="#e31b23"
          emissive="#8a0d12"
          emissiveIntensity={0.35}
          metalness={0.78}
          roughness={0.22}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.096, 24]} />
        <meshStandardMaterial color="#f5f7fa" metalness={0.95} roughness={0.14} />
      </mesh>
    </group>
  );
}

interface CraftShearsCanvasProps {
  focusMode: CraftFocusMode;
  prefersReducedMotion: boolean;
  active: boolean;
}

export function CraftShearsCanvas({
  focusMode,
  prefersReducedMotion,
  active,
}: CraftShearsCanvasProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`h-full w-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 6.2], fov: 34 }}
        frameloop={active ? "always" : "demand"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        onCreated={() => setReady(true)}
      >
        <Environment resolution={128} frames={1}>
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[0, 1.2, 6]}
            scale={[14, 9, 1]}
            color="#e6edf5"
          />
          <Lightformer
            form="rect"
            intensity={5.0}
            position={[0, 4.2, 2.5]}
            rotation={[Math.PI / 2.5, 0, 0]}
            scale={[7, 2.2, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[-4, 1, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[4, 4, 1]}
            color="#ffe1c2"
          />
          <Lightformer
            form="rect"
            intensity={2.0}
            position={[0, -3.5, 2]}
            rotation={[-Math.PI / 2.4, 0, 0]}
            scale={[5, 1.5, 1]}
            color="#e31b23"
          />
        </Environment>

        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-3, -2, 2]} intensity={0.95} color="#e31b23" />

        <ShearsModel
          focusMode={focusMode}
          prefersReducedMotion={prefersReducedMotion}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.07}
          minPolarAngle={Math.PI * 0.22}
          maxPolarAngle={Math.PI * 0.78}
        />
      </Canvas>
    </div>
  );
}
