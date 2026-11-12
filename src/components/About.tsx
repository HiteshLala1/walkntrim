"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { scrollToSection } from "@/lib/navigation";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import {
  ClipReveal,
  MaskedHeading,
  ParallaxFrame,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";
import { CraftShearsStage } from "./three/CraftShearsStage";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Parallax Salon Studio Photo + Interactive 3D Craft Inspector */}
          <div className="space-y-6 lg:col-span-5">
            <ClipReveal>
              <div className="relative">
                <div className="pointer-events-none absolute -top-2.5 -left-2.5 z-10 h-16 w-16 border-t-2 border-l-2 border-[#E31B23]" />
                <div className="relative overflow-hidden border border-gray-200 bg-white shadow-lg">
                  <ParallaxFrame distance={22} className="aspect-[4/5]">
                    <Image
                      src="/images/about-interior.jpg"
                      alt="Minimalist men's grooming chair and backlit mirror at Walk N Trim studio"
                      fill
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </ParallaxFrame>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="border-l-2 border-[#E31B23] pl-3.5">
                      <p className="font-display text-xs font-bold tracking-[0.22em] text-white uppercase">
                        {siteConfig.brand.displayName}
                      </p>
                      <p className="mt-1 text-xs tracking-[0.14em] text-gray-200 uppercase">
                        {siteConfig.address.shop} · {siteConfig.address.road},{" "}
                        {siteConfig.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ClipReveal>

            <Reveal delay={0.08}>
              <CraftShearsStage />
            </Reveal>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <Reveal delay={0.05}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  ABOUT WALK N TRIM
                </span>
              </div>
            </Reveal>

            <MaskedHeading>
              <h2
                id="about-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                MORE THAN JUST A HAIRCUT.
              </h2>
            </MaskedHeading>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                <p>
                  Walk N Trim is a dedicated{" "}
                  <strong className="font-semibold text-gray-900">
                    men&apos;s salon on Tariq Road
                  </strong>{" "}
                  built for men who value clean execution, reliable hygiene, and
                  a composed grooming routine. Located right behind Tariq Center
                  near Hina&apos;s Cosmetics, we make stepping in for quality
                  grooming effortless.
                </p>

                <p>
                  From an everyday{" "}
                  <strong className="font-semibold text-gray-900">
                    haircut on Tariq Road, Karachi
                  </strong>{" "}
                  and sharp beard work to multi-step skin care, protein hair
                  treatments, and a tailored{" "}
                  <strong className="font-semibold text-gray-900">
                    groom&apos;s package in Karachi
                  </strong>
                  , our menu combines practical value with careful attention to
                  detail.
                </p>

                <p>
                  Built as a modern{" "}
                  <strong className="font-semibold text-gray-900">
                    barber shop on Tariq Road
                  </strong>{" "}
                  and{" "}
                  <strong className="font-semibold text-gray-900">
                    men&apos;s salon in Karachi
                  </strong>{" "}
                  for dependable{" "}
                  <strong className="font-semibold text-gray-900">
                    men&apos;s grooming in Karachi
                  </strong>
                  , our focus stays simple: schedule ahead on WhatsApp, sit down
                  with zero hassle, and{" "}
                  <span className="font-medium text-gray-900">
                    {siteConfig.brand.footerTagline}
                  </span>
                </p>
              </div>
            </Reveal>

            <StaggerGroup
              staggerDelay={0.07}
              className="mt-10 grid grid-cols-1 divide-y divide-gray-200 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            >
              <StaggerItem className="py-5 sm:pr-5">
                <p className="font-display text-xs font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                  7 MENU DEALS
                </p>
                <p className="mt-1.5 text-sm font-medium text-gray-900">
                  Clear PKR packages starting from Rs. 849
                </p>
              </StaggerItem>
              <StaggerItem className="py-5 sm:px-5">
                <p className="font-display text-xs font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                  GROOM&apos;S PREP
                </p>
                <p className="mt-1.5 text-sm font-medium text-gray-900">
                  1, 2 &amp; 3-day wedding grooming packages
                </p>
              </StaggerItem>
              <StaggerItem className="py-5 sm:pl-5">
                <p className="font-display text-xs font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                  WHATSAPP BOOKING
                </p>
                <p className="mt-1.5 text-sm font-medium text-gray-900">
                  Confirm timings directly before arriving
                </p>
              </StaggerItem>
            </StaggerGroup>

            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppUrl({ type: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("whatsapp_click", {
                      placement: "about",
                    })
                  }
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden bg-[#E31B23] px-6 py-4 font-display text-xs font-bold tracking-[0.18em] text-white uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8151C] active:translate-y-0 active:scale-[0.98]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                  />
                  <span className="relative">BOOK YOUR APPOINTMENT</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contact");
                  }}
                  className="inline-flex items-center gap-2 border border-gray-300 bg-white px-6 py-4 font-display text-xs font-bold tracking-[0.18em] text-gray-900 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-50 active:translate-y-0"
                >
                  <span>FIND US ON TARIQ ROAD</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
