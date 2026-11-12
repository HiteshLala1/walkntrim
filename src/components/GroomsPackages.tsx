"use client";

import Image from "next/image";
import { ArrowUpRight, Calendar, Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { scrollToSection } from "@/lib/navigation";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { ClipReveal, MaskedHeading, ParallaxFrame, Reveal } from "./MotionPrimitives";
import { WhatsAppIcon } from "./SocialIcons";

const WEDDING_PREP_VISUALS = [
  {
    title: "Hot Towel & Blade Ritual",
    src: "/images/service-shave.jpg",
    alt: "Warm steamed charcoal towel, straight razor, and lather bowl setup for wedding preparation",
  },
  {
    title: "Styling & Event Finish",
    src: "/images/service-products.jpg",
    alt: "Barber finishing crisp hair styling with pomade and serum prior to event arrival",
  },
  {
    title: "24k Gold Facial & Prep",
    src: "/images/service-facial.jpg",
    alt: "Charcoal mask, basalt stones, and facial preparation setup before a wedding event",
  },
] as const;

export function GroomsPackages() {
  return (
    <section
      id="grooms-packages"
      aria-labelledby="grooms-packages-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-gray-50 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  WEDDING &amp; EVENT GROOMING
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="grooms-packages-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                YOUR BIG DAY. YOUR BEST LOOK.
              </h2>
            </MaskedHeading>
            <Reveal delay={0.08}>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Get ready for your special day with structured 1-Day, 2-Day, and
                3-Day Groom&apos;s Packages crafted directly from our menu.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border-l-2 border-[#E31B23] pl-4 text-xs leading-relaxed text-gray-600">
              Tap any package below to confirm event dates, sequence timings,
              and chair scheduling with our salon team directly on WhatsApp.
            </div>
          </Reveal>
        </div>

        {/* Wedding Grooming Editorial Visual Triptych */}
        <div className="mb-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {WEDDING_PREP_VISUALS.map((frame, frameIdx) => (
              <ClipReveal
                key={frame.title}
                delay={frameIdx * 0.08}
                className="group relative overflow-hidden border border-gray-200 bg-white shadow-lg"
              >
                <ParallaxFrame distance={16} className="aspect-[16/10]">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </ParallaxFrame>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="inline-block border-l-2 border-[#E31B23] pl-2.5 font-display text-xs font-bold tracking-[0.16em] text-white uppercase">
                    {frame.title}
                  </span>
                </div>
              </ClipReveal>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-gray-500">
            Representative pre-event skincare, shave, and styling preparation rituals featured in our Groom&apos;s Packages.
          </p>
        </div>

        {/* Quick Tier Summary Selector Strip */}
        <Reveal>
          <div className="mb-12 grid grid-cols-1 divide-y divide-gray-200 border border-gray-200 bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
            {siteConfig.groomsPackages.map((pkg) => {
              const totalItems = pkg.days.reduce(
                (sum, d) => sum + d.inclusions.length,
                0
              );
              return (
                <a
                  key={`${pkg.id}-jump`}
                  href={`#${pkg.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(`#${pkg.id}`);
                  }}
                  className="group flex items-center justify-between px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                >
                  <div>
                    <span className="font-display text-[10px] font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                      {pkg.duration} · {totalItems} SERVICES
                    </span>
                    <p className="mt-1 font-display text-base font-extrabold text-gray-900 uppercase">
                      {pkg.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tabular-nums font-display text-xl font-extrabold text-gray-900">
                      <span className="mr-1 text-xs font-bold text-[#E31B23]">
                        Rs.
                      </span>
                      {pkg.priceFormatted}
                    </p>
                    <span className="text-[10px] tracking-[0.16em] text-gray-500 uppercase transition-colors group-hover:text-gray-900">
                      View Schedule →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Full Architectural Package Chapters */}
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {siteConfig.groomsPackages.map((pkg, pkgIndex) => (
            <Reveal key={pkg.id} delay={pkgIndex * 0.05}>
              <article
                id={pkg.id}
                className="relative scroll-mt-24 py-12 sm:py-16"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* Left Package Pricing & Conversion Pillar */}
                  <div className="border-l-2 border-[#E31B23] pl-5 sm:pl-7 lg:col-span-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 border border-[#E31B23]/45 bg-[#E31B23]/10 px-3 py-1 font-display text-[11px] font-bold tracking-[0.2em] text-[#E31B23] uppercase">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{pkg.duration}</span>
                      </span>

                      <span className="text-[11px] font-medium tracking-[0.16em] text-gray-500 uppercase">
                        {pkg.days.length}{" "}
                        {pkg.days.length === 1 ? "Session" : "Day Schedule"}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-3xl">
                      {pkg.name}
                    </h3>

                    <div className="mt-6 border-y border-gray-200 py-5">
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                        PACKAGE PRICE
                      </p>
                      <p className="tabular-nums mt-1 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        <span className="mr-1.5 text-lg font-bold text-[#E31B23]">
                          Rs.
                        </span>
                        {pkg.priceFormatted}
                      </p>
                    </div>

                    <div className="mt-6">
                      <a
                        href={getWhatsAppUrl({
                          type: "package",
                          name: pkg.name,
                          price: pkg.priceFormatted,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackConversionEvent("package_booking_click", {
                            package: pkg.name,
                            price: String(pkg.pricePkr),
                          });
                          trackConversionEvent("whatsapp_click", {
                            placement: pkg.id,
                          });
                        }}
                        className="group relative flex w-full items-center justify-between overflow-hidden bg-[#E31B23] px-5 py-4 font-display text-xs font-bold tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8151C] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23]"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                        />
                        <span className="relative inline-flex items-center gap-2">
                          <WhatsAppIcon className="h-4 w-4" />
                          <span>BOOK {pkg.duration.toUpperCase()} PACKAGE</span>
                        </span>
                        <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <p className="mt-3 text-[11px] leading-relaxed text-gray-500">
                        Dates and session timings are confirmed directly by Walk
                        N Trim on WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Right Day-by-Day Editorial Itinerary */}
                  <div className="space-y-8 lg:col-span-8">
                    {pkg.days.map((day) => (
                      <div
                        key={`${pkg.id}-${day.dayLabel}`}
                        className="border border-gray-200 bg-white p-6 shadow-sm sm:p-7"
                      >
                        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3.5">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 bg-[#E31B23]" />
                            <h4 className="font-display text-sm font-extrabold tracking-[0.18em] text-gray-900 uppercase sm:text-base">
                              {day.dayLabel}
                            </h4>
                          </div>
                          <span className="text-[11px] font-medium tracking-[0.14em] text-gray-500 uppercase">
                            {day.inclusions.length} Services
                          </span>
                        </div>

                        <ul
                          aria-label={`${pkg.name} ${day.dayLabel} services`}
                          className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3"
                        >
                          {day.inclusions.map((item, itemIdx) => (
                            <li
                              key={`${pkg.id}-${day.dayLabel}-${itemIdx}`}
                              className="flex items-start gap-2.5 text-sm leading-snug text-gray-700"
                            >
                              <Check
                                aria-hidden="true"
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#E31B23]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
