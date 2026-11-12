"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Move3d } from "lucide-react";
import type { CraftFocusMode } from "./CraftShearsCanvas";
import { SceneErrorBoundary, useCanRender3D } from "./SceneErrorBoundary";

const CraftShearsCanvas = dynamic(
  () => import("./CraftShearsCanvas").then((mod) => mod.CraftShearsCanvas),
  { ssr: false }
);

const CRAFT_SPECS: Array<{
  mode: CraftFocusMode;
  code: string;
  label: string;
  detail: string;
}> = [
  {
    mode: "geometry",
    code: "01",
    label: "Razor Edge Taper",
    detail:
      "Clean scissor-over-comb blending and crown balance before a single clipper pass.",
  },
  {
    mode: "pivot",
    code: "02",
    label: "Sanitized Hardware",
    detail:
      "Dedicated stainless steel shears, fresh blades, and consistent station hygiene.",
  },
  {
    mode: "action",
    code: "03",
    label: "Controlled Execution",
    detail:
      "Measured pace, clear consultation, and sharp hairline finish every visit.",
  },
];

function Craft2DFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/images/gallery-tools.jpg"
        alt="Japanese steel barber shears, clippers, and carbon combs on dark leather"
        fill
        quality={85}
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/35 to-transparent" />
    </div>
  );
}

export function CraftShearsStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ready, canRender } = useCanRender3D(768);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [focusMode, setFocusMode] = useState<CraftFocusMode>("geometry");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const activeSpec =
    CRAFT_SPECS.find((s) => s.mode === focusMode) ?? CRAFT_SPECS[0];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border border-gray-200 bg-white shadow-lg"
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#E31B23]" />
          <span className="font-display text-[11px] font-bold tracking-[0.2em] text-gray-900 uppercase">
            CRAFT INSPECTOR
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] text-gray-500 uppercase">
          <Move3d className="h-3.5 w-3.5 text-[#E31B23]" />
          <span>{canRender ? "Drag to rotate 3D shears" : "Station craft detail"}</span>
        </span>
      </div>

      {/* Interactive 3D Viewport / Mobile Fallback */}
      <div className="relative h-60 w-full bg-[radial-gradient(circle_at_50%_45%,rgba(227,27,35,0.06),rgba(243,244,246,0.85)_60%,#f8fafc_100%)] sm:h-68">
        {!ready ? null : canRender ? (
          <SceneErrorBoundary fallback={<Craft2DFallback />}>
            <CraftShearsCanvas
              focusMode={focusMode}
              prefersReducedMotion={prefersReducedMotion}
              active={inView}
            />
          </SceneErrorBoundary>
        ) : (
          <Craft2DFallback />
        )}
      </div>

      {/* Mode Switcher + Detail Spec */}
      <div className="border-t border-gray-200 p-5">
        <div
          role="tablist"
          aria-label="Inspect grooming craft standards"
          className="grid grid-cols-3 gap-2"
        >
          {CRAFT_SPECS.map((spec) => {
            const active = spec.mode === focusMode;
            return (
              <button
                key={spec.mode}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFocusMode(spec.mode)}
                className={`border px-2.5 py-2 text-left transition-all duration-200 ${
                  active
                    ? "border-[#E31B23] bg-[#E31B23]/10 text-gray-900"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                <span className="block font-display text-[10px] font-bold tracking-[0.2em] text-[#E31B23]">
                  {spec.code}
                </span>
                <span className="mt-0.5 block font-display text-[11px] font-bold tracking-wide uppercase">
                  {spec.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
          {activeSpec.detail}
        </p>
      </div>
    </div>
  );
}
