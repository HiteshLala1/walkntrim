"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import {
  createBrushedSteelRoughnessMap,
  createObsidianGrainMap,
} from "./textures";

export interface RazorGestureState {
  yaw: number;
  pitch: number;
  targetYaw: number;
  targetPitch: number;
  isDragging: boolean;
}

interface HeroRazorMeshProps {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  gestureRef: React.MutableRefObject<RazorGestureState>;
  isPoised: boolean;
  prefersReducedMotion: boolean;
}

function RazorModel({
  pointerRef,
  gestureRef,
  isPoised,
  prefersReducedMotion,
}: HeroRazorMeshProps) {
  const { viewport } = useThree();
  const stageFitRef = useRef<THREE.Group | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const bladePivotRef = useRef<THREE.Group | null>(null);
  const handlePivotRef = useRef<THREE.Group | null>(null);
  const glintLightRef = useRef<THREE.PointLight | null>(null);
  const elapsedRef = useRef(0);

  // Dynamically keep the full 5.2-unit effective diameter (handle + French-point blade tip + cursor sway) well inside the canvas at all screen sizes & angles
  const fitScale = Math.min(
    0.82,
    (viewport.width * 0.76) / 5.2,
    (viewport.height * 0.8) / 3.2
  );

  const textures = useMemo(() => {
    const steelRoughness = createBrushedSteelRoughnessMap();
    const obsidianRoughness = createObsidianGrainMap();
    return { steelRoughness, obsidianRoughness };
  }, []);

  const geometries = useMemo(() => {
    // 1. Hollow-ground straight razor blade profile
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(-0.34, 0.04);
    bladeShape.quadraticCurveTo(-0.18, 0.1, 0.06, 0.09);
    bladeShape.lineTo(0.45, 0.11);
    bladeShape.quadraticCurveTo(0.56, 0.17, 0.64, 0.25);
    bladeShape.lineTo(2.14, 0.24);
    // French point tip
    bladeShape.quadraticCurveTo(2.3, 0.23, 2.34, 0.06);
    bladeShape.quadraticCurveTo(2.33, -0.18, 2.18, -0.24);
    bladeShape.lineTo(0.66, -0.24);
    bladeShape.quadraticCurveTo(0.52, -0.2, 0.44, -0.07);
    bladeShape.lineTo(0.06, -0.07);
    bladeShape.quadraticCurveTo(-0.16, -0.08, -0.32, -0.04);
    bladeShape.closePath();

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.014,
    });
    bladeGeo.translate(0, 0, -0.015);
    bladeGeo.computeVertexNormals();

    // 2. Sculpted matte-carbon handle scale profile (extending toward -X)
    const scaleShape = new THREE.Shape();
    scaleShape.moveTo(0.14, 0.09);
    scaleShape.quadraticCurveTo(0.18, 0.0, 0.12, -0.09);
    scaleShape.lineTo(-0.85, -0.13);
    scaleShape.quadraticCurveTo(-1.85, -0.22, -2.3, -0.16);
    scaleShape.quadraticCurveTo(-2.46, -0.1, -2.44, 0.04);
    scaleShape.quadraticCurveTo(-2.4, 0.16, -2.22, 0.16);
    scaleShape.quadraticCurveTo(-1.45, 0.14, -0.75, 0.11);
    scaleShape.closePath();

    const scaleGeo = new THREE.ExtrudeGeometry(scaleShape, {
      depth: 0.044,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.014,
      bevelThickness: 0.012,
    });
    scaleGeo.translate(0, 0, -0.022);
    scaleGeo.computeVertexNormals();

    // 3. Reinforced spine ridge
    const spineGeo = new THREE.BoxGeometry(1.62, 0.085, 0.062);

    return { bladeGeo, scaleGeo, spineGeo };
  }, []);

  useEffect(() => {
    return () => {
      textures.steelRoughness.dispose();
      textures.obsidianRoughness.dispose();
      geometries.bladeGeo.dispose();
      geometries.scaleGeo.dispose();
      geometries.spineGeo.dispose();
    };
  }, [textures, geometries]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    elapsedRef.current += dt;
    const elapsed = elapsedRef.current;

    const stageFit = stageFitRef.current;
    const root = rootGroupRef.current;
    const bladePivot = bladePivotRef.current;
    const handlePivot = handlePivotRef.current;
    const glintLight = glintLightRef.current;
    const gesture = gestureRef.current;

    if (!root || !bladePivot || !handlePivot) return;

    if (stageFit) {
      stageFit.scale.setScalar(
        THREE.MathUtils.lerp(stageFit.scale.x, fitScale, dt * 8)
      );
    }

    const pointerX = pointerRef.current.x;
    const pointerY = pointerRef.current.y;

    // Smooth gesture yaw & pitch (from drag swipe, arrow keys, or directional pad)
    gesture.yaw = THREE.MathUtils.lerp(gesture.yaw, gesture.targetYaw, dt * 9);
    gesture.pitch = THREE.MathUtils.lerp(
      gesture.pitch,
      gesture.targetPitch,
      dt * 9
    );

    if (prefersReducedMotion) {
      root.position.set(0, -0.14, 0);
      root.rotation.set(
        0.16 + gesture.pitch,
        -0.34 + gesture.yaw,
        -0.06
      );
      bladePivot.rotation.z = isPoised ? 0.36 : 0.06;
      handlePivot.rotation.z = isPoised ? -0.36 : -0.18;
      return;
    }

    const introFactor = Math.min(elapsed / 0.85, 1);
    const smoothIntro = 1 - Math.pow(1 - introFactor, 3);
    const ambientWeight = gesture.isDragging ? 0 : 1;

    const targetRotX =
      0.16 +
      gesture.pitch +
      pointerY * 0.36 +
      ambientWeight * Math.sin(elapsed * 0.72) * 0.025;
    const targetRotY =
      -0.34 +
      gesture.yaw +
      pointerX * 0.62 +
      ambientWeight * Math.cos(elapsed * 0.52) * 0.045;
    const targetRotZ =
      -0.06 +
      pointerX * -0.07 +
      ambientWeight * Math.sin(elapsed * 0.45) * 0.02;

    const targetPosX = pointerX * 0.14;
    const targetPosY =
      -0.14 +
      pointerY * 0.1 +
      ambientWeight * Math.sin(elapsed * 1.15) * 0.065;

    const followSpeed = gesture.isDragging ? dt * 11 : dt * 5.2;
    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      targetRotX,
      followSpeed
    );
    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      targetRotY,
      followSpeed
    );
    root.rotation.z = THREE.MathUtils.lerp(
      root.rotation.z,
      targetRotZ,
      followSpeed
    );
    root.position.x = THREE.MathUtils.lerp(root.position.x, targetPosX, dt * 4.5);
    root.position.y = THREE.MathUtils.lerp(root.position.y, targetPosY, dt * 4.5);

    const openBreath = isPoised ? Math.sin(elapsed * 1.3) * 0.012 : 0;
    const targetBladeAngle = isPoised
      ? 0.08 + (0.42 - 0.08) * smoothIntro + openBreath
      : 0.08;
    const targetHandleAngle = isPoised
      ? -0.18 + (-0.44 + 0.18) * smoothIntro - openBreath * 0.7
      : -0.18;

    bladePivot.rotation.z = THREE.MathUtils.lerp(
      bladePivot.rotation.z,
      targetBladeAngle,
      dt * 4.8
    );
    handlePivot.rotation.z = THREE.MathUtils.lerp(
      handlePivot.rotation.z,
      targetHandleAngle,
      dt * 4.8
    );

    if (glintLight) {
      glintLight.position.x =
        Math.sin(elapsed * 0.85) * 2.2 + pointerX * 1.4;
      glintLight.position.y =
        1.15 + Math.cos(elapsed * 0.6) * 0.45 + pointerY * 0.8;
    }
  });

  return (
    <group ref={stageFitRef} position={[0, 0, 0]} scale={fitScale}>
      <pointLight
        ref={glintLightRef}
        position={[0.6, 1.15, 2.8]}
        intensity={2.4}
        distance={9}
        color="#ffffff"
      />

      {/* Main Razor Assembly */}
      <group
        ref={rootGroupRef}
        rotation={[0.16, -0.34, -0.06]}
        position={[0, -0.14, 0]}
      >
        {/* Blade Pivot Sub-Assembly */}
        <group ref={bladePivotRef} rotation={[0, 0, 0.08]}>
          <mesh geometry={geometries.bladeGeo} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#c8d0da"
              metalness={0.94}
              roughness={0.22}
              roughnessMap={textures.steelRoughness}
              clearcoat={0.38}
              clearcoatRoughness={0.14}
              envMapIntensity={1.65}
            />
          </mesh>

          {/* Top Satin Spine Ridge */}
          <mesh
            geometry={geometries.spineGeo}
            position={[1.38, 0.245, 0]}
            castShadow
          >
            <meshPhysicalMaterial
              color="#aeb6c2"
              metalness={0.92}
              roughness={0.24}
              clearcoat={0.28}
              envMapIntensity={1.45}
            />
          </mesh>

          {/* Subtle Crimson Precision Inlay Strip on Blade Neck */}
          <mesh position={[0.25, 0.02, 0]}>
            <boxGeometry args={[0.32, 0.024, 0.072]} />
            <meshStandardMaterial
              color="#e31b23"
              emissive="#e31b23"
              emissiveIntensity={0.55}
              metalness={0.65}
              roughness={0.22}
            />
          </mesh>
        </group>

        {/* Handle Scales Pivot Sub-Assembly */}
        <group ref={handlePivotRef} rotation={[0, 0, -0.44]}>
          {/* Front Scale */}
          <mesh geometry={geometries.scaleGeo} position={[0, 0, 0.068]}>
            <meshPhysicalMaterial
              color="#25252b"
              metalness={0.55}
              roughness={0.36}
              roughnessMap={textures.obsidianRoughness}
              clearcoat={0.45}
              clearcoatRoughness={0.25}
              envMapIntensity={1.65}
            />
          </mesh>

          {/* Back Scale */}
          <mesh geometry={geometries.scaleGeo} position={[0, 0, -0.068]}>
            <meshPhysicalMaterial
              color="#25252b"
              metalness={0.55}
              roughness={0.36}
              roughnessMap={textures.obsidianRoughness}
              clearcoat={0.45}
              clearcoatRoughness={0.25}
              envMapIntensity={1.65}
            />
          </mesh>

          {/* Rear Titanium Spacer Wedge */}
          <mesh position={[-2.22, -0.02, 0]}>
            <boxGeometry args={[0.3, 0.18, 0.082]} />
            <meshStandardMaterial
              color="#a1a8b2"
              metalness={0.9}
              roughness={0.22}
            />
          </mesh>

          {/* Rear Rivet Pins */}
          <mesh position={[-2.22, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.19, 24]} />
            <meshStandardMaterial
              color="#e4e8ee"
              metalness={0.94}
              roughness={0.16}
            />
          </mesh>
        </group>

        {/* Signature Crimson Anodized Pivot Collar + Steel Pin */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.072, 0.072, 0.195, 32]} />
          <meshStandardMaterial
            color="#e31b23"
            emissive="#8a0e13"
            emissiveIntensity={0.35}
            metalness={0.78}
            roughness={0.22}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.215, 24]} />
          <meshStandardMaterial
            color="#f5f7fa"
            metalness={0.95}
            roughness={0.14}
          />
        </mesh>
      </group>
    </group>
  );
}

interface HeroRazorCanvasProps {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  gestureRef: React.MutableRefObject<RazorGestureState>;
  isPoised: boolean;
  prefersReducedMotion: boolean;
  active: boolean;
}

export function HeroRazorCanvas({
  pointerRef,
  gestureRef,
  isPoised,
  prefersReducedMotion,
  active,
}: HeroRazorCanvasProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`h-full w-full transition-opacity duration-500 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.04, 8.2], fov: 36 }}
        frameloop={active ? "always" : "demand"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
        onCreated={() => setReady(true)}
      >
        {/* High-Contrast Studio Strip Lighting Dome (prevents flat white specular washout on blade cheek) */}
        <Environment resolution={128} frames={1}>
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[-3.4, 2.2, 5.2]}
            rotation={[0.18, 0.45, -0.35]}
            scale={[2.6, 7.5, 1]}
            color="#eef3fa"
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[3.8, -0.6, 4.6]}
            rotation={[-0.1, -0.5, 0.25]}
            scale={[2.2, 6.0, 1]}
            color="#cfd8e4"
          />
          <Lightformer
            form="rect"
            intensity={4.8}
            position={[0.4, 4.6, 2.8]}
            rotation={[Math.PI / 2.5, 0, 0]}
            scale={[8.5, 2.0, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.0}
            position={[-4.8, 1.4, 2.2]}
            rotation={[0, Math.PI / 2.2, 0]}
            scale={[4.5, 5.5, 1]}
            color="#ffe5c8"
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[4.8, 1.6, 2.0]}
            rotation={[0, -Math.PI / 2.2, 0]}
            scale={[4.5, 5.0, 1]}
            color="#dce8f8"
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[0, -3.5, 2.0]}
            rotation={[-Math.PI / 2.5, 0, 0]}
            scale={[7, 1.8, 1]}
            color="#e31b23"
          />
        </Environment>

        <ambientLight intensity={0.32} />
        <directionalLight
          position={[3.6, 4.2, 3.8]}
          intensity={1.8}
          color="#ffffff"
        />
        <directionalLight
          position={[-3.8, 2.2, 3.2]}
          intensity={1.25}
          color="#ffe6cc"
        />
        <directionalLight
          position={[-2, -2.5, 2]}
          intensity={1.1}
          color="#e31b23"
        />
        <pointLight position={[-1.8, 1.8, 3.8]} intensity={1.15} color="#ffffff" />

        <RazorModel
          pointerRef={pointerRef}
          gestureRef={gestureRef}
          isPoised={isPoised}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
