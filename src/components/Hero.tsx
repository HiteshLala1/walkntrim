"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { scrollToSection } from "@/lib/navigation";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./SocialIcons";
import { HeroRazorStage } from "./three/HeroRazorStage";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const pointerRef = useRef({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 88]);
  const backgroundScale = useTransform(scrollY, [0, 800], [1.03, 1.1]);
  const glowY = useTransform(scrollY, [0, 800], [0, -32]);

  return (
    <section
      id="home"
      onPointerLeave={() => {
        pointerRef.current.x = 0;
        pointerRef.current.y = 0;
      }}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-white pt-24 pb-8 sm:pt-28 sm:pb-10"
    >
      {/* Layer 0: Background Cinematic Photography with Parallax & Light Editorial Wash */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { y: backgroundY, scale: backgroundScale }
        }
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/hero-grooming.jpg"
          alt="Barber performing a precision haircut at Walk N Trim men's salon on Tariq Road"
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-[72%_25%] opacity-30 sm:object-[68%_center] lg:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/80" />
      </motion.div>

      {/* Layer 1: Subtle Parallax Red Accent Sheen */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: glowY }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.65, 0.95, 0.65], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] z-[1] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(227,27,35,0.12)_0%,transparent_65%)] blur-2xl"
      />

      {/* Top Spacer Anchor */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" />

      {/* Main Split Editorial & Interactive 3D Composition */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Left Editorial Headline & Conversion Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <span className="inline-block h-[2px] w-8 bg-[#E31B23]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-gray-900 uppercase">
                {siteConfig.address.shortLocationLabel}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-medium tracking-[0.14em] text-gray-600">
                {siteConfig.brand.secondaryTagline}
              </span>
            </motion.div>

            <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-gray-900 uppercase sm:text-6xl md:text-7xl lg:text-[5rem] lg:leading-[0.95] xl:text-[5.5rem]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  LOOK SHARP
                  <span className="text-[#E31B23]">.</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  FEEL CONFIDENT
                  <span className="text-[#E31B23]">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl"
            >
              Experience professional men&apos;s grooming at{" "}
              <span className="font-semibold text-gray-900">
                Walk N Trim, Tariq Road
              </span>
              . Precision haircuts, sharp beard work, and curated deals booked
              directly via WhatsApp.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4"
            >
              <a
                href={getWhatsAppUrl({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent("whatsapp_click", { placement: "hero" })
                }
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden bg-[#E31B23] px-7 py-4 font-display text-xs font-bold tracking-[0.18em] text-white uppercase shadow-[0_12px_28px_rgba(227,27,35,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8151C] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23] sm:text-sm"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                />
                <WhatsAppIcon className="relative h-4 w-4" />
                <span className="relative">BOOK YOUR APPOINTMENT</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#deals"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#deals");
                }}
                className="group inline-flex items-center justify-center gap-2.5 border border-gray-300 bg-white/90 px-7 py-4 font-display text-xs font-bold tracking-[0.18em] text-gray-900 uppercase shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-50 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23] sm:text-sm"
              >
                <span>EXPLORE OUR DEALS</span>
                <ArrowDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-gray-900" />
              </a>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600"
            >
              <span>Appointments confirmed directly via WhatsApp</span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <a
                href={siteConfig.contact.phoneHref}
                onClick={() =>
                  trackConversionEvent("phone_click", { placement: "hero" })
                }
                className="inline-flex items-center gap-1.5 font-semibold text-gray-900 transition-colors hover:text-[#E31B23]"
              >
                <Phone className="h-3.5 w-3.5 text-[#E31B23]" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Interactive 3D Straight Razor Instrument Stage */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden md:block lg:col-span-5"
          >
            <HeroRazorStage pointerRef={pointerRef} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wayfinding & Scroll Cue */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-t border-gray-200 pt-5 pr-16 text-xs tracking-[0.16em] text-gray-600 uppercase sm:flex-row sm:items-center sm:pr-56">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E31B23]" />
            <span>
              {siteConfig.address.shop}, {siteConfig.address.landmark}
            </span>
          </div>

          <a
            href="#deals"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#deals");
            }}
            className="hidden items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 sm:inline-flex"
          >
            <span>VIEW GROOMING DEALS</span>
            <ArrowDown className="h-3.5 w-3.5 text-[#E31B23]" />
          </a>
        </div>
      </div>
    </section>
  );
}
