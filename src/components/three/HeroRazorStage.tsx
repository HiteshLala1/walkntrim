"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import type { RazorGestureState } from "./HeroRazorCanvas";
import { SceneErrorBoundary, useCanRender3D } from "./SceneErrorBoundary";

const HeroRazorCanvas = dynamic(
  () => import("./HeroRazorCanvas").then((mod) => mod.HeroRazorCanvas),
  { ssr: false }
);

function Hero2DFallback({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center"
    >
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
        <div className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(227,27,35,0.14)_0%,transparent_70%)] blur-xl" />
        <motion.svg
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 240 160"
          fill="none"
          className="h-44 w-56 drop-shadow-[0_18px_36px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <linearGradient id="steelBlade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#9DA3AC" />
              <stop offset="100%" stopColor="#3B3E44" />
            </linearGradient>
          </defs>
          <path
            d="M36 92 L126 30 L216 42 Q226 52 214 66 L124 88 Z"
            fill="url(#steelBlade)"
          />
          <path
            d="M118 86 L46 130 Q30 136 22 124 Q18 112 32 102 L106 78 Z"
            fill="#17171B"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
          <circle cx="114" cy="82" r="7" fill="#E31B23" />
          <circle cx="114" cy="82" r="3" fill="#FFFFFF" />
        </motion.svg>
      </div>
    </div>
  );
}

interface HeroRazorStageProps {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}

const MAX_PITCH = 1.15;

export function HeroRazorStage({ pointerRef }: HeroRazorStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragOriginRef = useRef<{ x: number; y: number } | null>(null);
  const holdIntervalRef = useRef<number | null>(null);
  const gestureRef = useRef<RazorGestureState>({
    yaw: 0,
    pitch: 0,
    targetYaw: 0,
    targetPitch: 0,
    isDragging: false,
  });

  const { ready, canRender } = useCanRender3D(768);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isPoised, setIsPoised] = useState(true);
  const [inView, setInView] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canRender || !inView) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const denomX = Math.max(rect.width * 0.85, 320);
      const denomY = Math.max(rect.height * 0.85, 300);
      const nx = (e.clientX - cx) / denomX;
      const ny = -(e.clientY - cy) / denomY;
      pointerRef.current.x = Math.max(-1, Math.min(1, nx));
      pointerRef.current.y = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener("pointermove", handleWindowPointerMove, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
    };
  }, [canRender, inView, pointerRef]);

  const stopHoldRepeat = useCallback(() => {
    if (holdIntervalRef.current !== null) {
      window.clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  }, []);

  useEffect(() => stopHoldRepeat, [stopHoldRepeat]);

  const nudgeBlade = useCallback((dYaw: number, dPitch: number) => {
    const g = gestureRef.current;
    g.targetYaw += dYaw;
    g.targetPitch = Math.max(
      -MAX_PITCH,
      Math.min(MAX_PITCH, g.targetPitch + dPitch)
    );
  }, []);

  const resetPose = useCallback(() => {
    const g = gestureRef.current;
    g.targetYaw = 0;
    g.targetPitch = 0;
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }, [pointerRef]);

  const startHoldNudge = (dYaw: number, dPitch: number) => {
    nudgeBlade(dYaw, dPitch);
    stopHoldRepeat();
    holdIntervalRef.current = window.setInterval(() => {
      nudgeBlade(dYaw * 0.55, dPitch * 0.55);
    }, 65);
  };

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canRender) return;
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
    gestureRef.current.isDragging = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gestureRef.current.isDragging || !dragOriginRef.current) return;
    const dx = e.clientX - dragOriginRef.current.x;
    const dy = e.clientY - dragOriginRef.current.y;
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
    nudgeBlade(dx * 0.012, -dy * 0.01);
  };

  const handleStagePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gestureRef.current.isDragging) return;
    gestureRef.current.isDragging = false;
    dragOriginRef.current = null;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleStageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        nudgeBlade(-0.32, 0);
        break;
      case "ArrowRight":
        e.preventDefault();
        nudgeBlade(0.32, 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        nudgeBlade(0, -0.24);
        break;
      case "ArrowDown":
        e.preventDefault();
        nudgeBlade(0, 0.24);
        break;
      case "Home":
      case "r":
      case "R":
        e.preventDefault();
        resetPose();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={stageRef}
      onKeyDown={handleStageKeyDown}
      className="relative flex h-[360px] w-full flex-col justify-between md:h-[440px] lg:h-[510px]"
    >
      {/* Interactive Gesture & Keyboard Focus Viewport */}
      <div
        role="application"
        tabIndex={canRender ? 0 : -1}
        aria-label="Interactive 3D straight razor. Move cursor, drag, or use arrow keys to rotate the blade."
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerEnd}
        onPointerCancel={handleStagePointerEnd}
        className={`relative flex-1 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E31B23] ${
          canRender
            ? isDragging
              ? "cursor-grabbing touch-none"
              : "cursor-grab touch-pan-y"
            : ""
        }`}
      >
        {!ready ? null : canRender ? (
          <SceneErrorBoundary
            fallback={<Hero2DFallback prefersReducedMotion={prefersReducedMotion} />}
          >
            <HeroRazorCanvas
              pointerRef={pointerRef}
              gestureRef={gestureRef}
              isPoised={isPoised}
              prefersReducedMotion={prefersReducedMotion}
              active={inView}
            />
          </SceneErrorBoundary>
        ) : (
          <Hero2DFallback prefersReducedMotion={prefersReducedMotion} />
        )}
      </div>

      {/* Subtle Interactive Gesture + Directional Arrow Control Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-3">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-700 uppercase">
          {canRender
            ? "DRAG · CURSOR · ARROW KEYS TO MOVE BLADE"
            : "PRECISION INSTRUMENT"}
        </span>

        <div className="flex items-center gap-2">
          {canRender && (
            <div
              role="group"
              aria-label="Move 3D razor blade with directional arrows"
              className="flex items-center gap-1"
            >
              <button
                type="button"
                aria-label="Rotate blade left"
                onPointerDown={() => startHoldNudge(-0.28, 0)}
                onPointerUp={stopHoldRepeat}
                onPointerLeave={stopHoldRepeat}
                onPointerCancel={stopHoldRepeat}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nudgeBlade(-0.28, 0);
                  }
                }}
                className="inline-flex h-7 w-7 items-center justify-center border border-gray-300 bg-white/95 text-gray-700 shadow-sm transition-colors hover:border-[#E31B23] hover:text-[#E31B23] active:bg-[#E31B23] active:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Tilt blade up"
                onPointerDown={() => startHoldNudge(0, -0.22)}
                onPointerUp={stopHoldRepeat}
                onPointerLeave={stopHoldRepeat}
                onPointerCancel={stopHoldRepeat}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nudgeBlade(0, -0.22);
                  }
                }}
                className="inline-flex h-7 w-7 items-center justify-center border border-gray-300 bg-white/95 text-gray-700 shadow-sm transition-colors hover:border-[#E31B23] hover:text-[#E31B23] active:bg-[#E31B23] active:text-white"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Tilt blade down"
                onPointerDown={() => startHoldNudge(0, 0.22)}
                onPointerUp={stopHoldRepeat}
                onPointerLeave={stopHoldRepeat}
                onPointerCancel={stopHoldRepeat}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nudgeBlade(0, 0.22);
                  }
                }}
                className="inline-flex h-7 w-7 items-center justify-center border border-gray-300 bg-white/95 text-gray-700 shadow-sm transition-colors hover:border-[#E31B23] hover:text-[#E31B23] active:bg-[#E31B23] active:text-white"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Rotate blade right"
                onPointerDown={() => startHoldNudge(0.28, 0)}
                onPointerUp={stopHoldRepeat}
                onPointerLeave={stopHoldRepeat}
                onPointerCancel={stopHoldRepeat}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nudgeBlade(0.28, 0);
                  }
                }}
                className="inline-flex h-7 w-7 items-center justify-center border border-gray-300 bg-white/95 text-gray-700 shadow-sm transition-colors hover:border-[#E31B23] hover:text-[#E31B23] active:bg-[#E31B23] active:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Reset blade position"
                title="Reset blade angle"
                onClick={resetPose}
                className="inline-flex h-7 w-7 items-center justify-center border border-gray-300 bg-white/95 text-gray-500 shadow-sm transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsPoised((prev) => !prev)}
            aria-pressed={!isPoised}
            className="inline-flex items-center gap-1.5 border border-gray-300 bg-white/95 px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] text-gray-900 uppercase shadow-sm backdrop-blur-sm transition-colors hover:border-[#E31B23] hover:text-[#E31B23]"
          >
            <RotateCw
              className={`h-3 w-3 text-[#E31B23] transition-transform duration-300 ${
                isPoised ? "rotate-0" : "rotate-180"
              }`}
            />
            <span>{isPoised ? "FOLD BLADE" : "DRAW BLADE"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
