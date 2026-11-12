"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { siteConfig, type DealItem } from "@/lib/site-config";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { MaskedHeading, Reveal } from "./MotionPrimitives";
import { WhatsAppIcon } from "./SocialIcons";

const DEAL_PREVIEW_IMAGES: Record<string, { src: string; alt: string }> = {
  "deal-1": {
    src: "/images/service-haircut.jpg",
    alt: "Crisp scissor and clipper haircut finish included in Deal 1",
  },
  "deal-2": {
    src: "/images/service-treatment.jpg",
    alt: "Hair protein nourishment and scalp care for Deal 2",
  },
  "deal-3": {
    src: "/images/service-facial.jpg",
    alt: "Mud mask, polish, and facial care setup for Deal 3",
  },
  "deal-4": {
    src: "/images/beard-lineup.jpg",
    alt: "Clean beard shaping and color detailing for Deal 4",
  },
  "deal-5": {
    src: "/images/service-products.jpg",
    alt: "Protein care, styling finish, and multi-step grooming in Deal 5",
  },
  "deal-6": {
    src: "/images/hero-grooming.jpg",
    alt: "Complete haircut, beard, facial, and treatment suite in Deal 6",
  },
  "deal-7": {
    src: "/images/service-massage.jpg",
    alt: "Manicure, pedicure, facial polish, and hair styling care in Deal 7",
  },
};

export function Deals() {
  const [selectedDealId, setSelectedDealId] = useState<string>(
    siteConfig.deals[0].id
  );
  const prefersReducedMotion = useReducedMotion();

  const activeDeal: DealItem =
    siteConfig.deals.find((d) => d.id === selectedDealId) ??
    siteConfig.deals[0];
  const activeVisual =
    DEAL_PREVIEW_IMAGES[activeDeal.id] ?? DEAL_PREVIEW_IMAGES["deal-1"];

  return (
    <section
      id="deals"
      aria-labelledby="deals-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-gray-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  STANDARD DEALS
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="deals-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                GOOD GROOMING. EVEN BETTER DEALS.
              </h2>
            </MaskedHeading>
            <Reveal delay={0.08}>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Explore our grooming deals and find the combination that works
                for you.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border-l-2 border-[#E31B23] pl-4 text-xs leading-relaxed text-gray-600 sm:max-w-xs">
              Select any of the 7 deals below to inspect every included service.
              Every booking button opens WhatsApp with your selected deal and
              price pre-filled.
            </div>
          </Reveal>
        </div>

        {/* Interactive Asymmetric Deal Configurator */}
        <Reveal>
          <div className="grid grid-cols-1 border border-gray-200 bg-white shadow-sm lg:grid-cols-12">
            {/* Left Architectural Tier Rail */}
            <div
              role="tablist"
              aria-label="Select a Walk N Trim grooming deal to inspect"
              className="divide-y divide-gray-200 border-b border-gray-200 bg-gray-50/60 lg:col-span-5 lg:border-r lg:border-b-0"
            >
              {siteConfig.deals.map((deal, idx) => {
                const isSelected = deal.id === activeDeal.id;
                return (
                  <button
                    key={deal.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`spotlight-${deal.id}`}
                    onClick={() => setSelectedDealId(deal.id)}
                    className={`group relative flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-200 sm:px-7 sm:py-5 ${
                      isSelected
                        ? "bg-white text-gray-900"
                        : "bg-transparent text-gray-600 hover:bg-white/70 hover:text-gray-900"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="deal-rail-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                        className="absolute inset-y-0 left-0 w-1 bg-[#E31B23]"
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <span
                        className={`font-display text-xs font-bold tracking-[0.2em] ${
                          isSelected ? "text-[#E31B23]" : "text-gray-400"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <p className="font-display text-base font-extrabold tracking-tight uppercase sm:text-lg">
                          {deal.name}
                        </p>
                        <p className="text-[11px] tracking-[0.14em] text-gray-500 uppercase">
                          {deal.inclusions.length} Menu Services
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="tabular-nums font-display text-lg font-extrabold text-gray-900 sm:text-xl">
                        <span className="mr-1 text-xs font-bold text-[#E31B23]">
                          Rs.
                        </span>
                        {deal.priceFormatted}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active Deal Spotlight */}
            <div className="flex flex-col justify-between bg-white p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDeal.id}
                  id={`spotlight-${activeDeal.id}`}
                  role="tabpanel"
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    {/* Visual Atmospheric Header Strip */}
                    <div className="relative mb-6 h-40 w-full overflow-hidden border border-gray-200 bg-gray-900 shadow-md sm:h-48">
                      <motion.div
                        initial={prefersReducedMotion ? false : { scale: 1.07 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={activeVisual.src}
                          alt={activeVisual.alt}
                          fill
                          quality={85}
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                        <div>
                          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                            <span className="h-1.5 w-1.5 bg-[#E31B23]" />
                            <span>SELECTED STANDARD DEAL</span>
                          </span>
                          <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl">
                            {activeDeal.name}
                          </h3>
                        </div>

                        <div className="text-right">
                          <p className="tabular-nums font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            <span className="mr-1 text-base font-bold text-[#E31B23]">
                              Rs.
                            </span>
                            {activeDeal.priceFormatted}
                          </p>
                          <p className="text-[11px] font-medium tracking-[0.16em] text-gray-200 uppercase">
                            {activeDeal.inclusions.length} Services Included
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Multi-column Crisp Menu Checklist */}
                    <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                      INCLUDED SERVICES
                    </p>
                    <ul
                      aria-label={`${activeDeal.name} spotlight included services`}
                      className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2"
                    >
                      {activeDeal.inclusions.map((service, idx) => (
                        <motion.li
                          key={`${activeDeal.id}-spot-${idx}`}
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, x: -6 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: prefersReducedMotion
                              ? 0
                              : Math.min(idx * 0.018, 0.28),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-start gap-2.5 text-sm leading-snug text-gray-700"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#E31B23]"
                          />
                          <span>{service}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <a
                      href={getWhatsAppUrl({
                        type: "deal",
                        name: activeDeal.name,
                        price: activeDeal.priceFormatted,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackConversionEvent("deal_booking_click", {
                          deal: activeDeal.name,
                          price: String(activeDeal.pricePkr),
                          placement: "spotlight",
                        });
                        trackConversionEvent("whatsapp_click", {
                          placement: `${activeDeal.id}_spotlight`,
                        });
                      }}
                      className="group relative inline-flex w-full items-center justify-between overflow-hidden bg-[#E31B23] px-6 py-4 font-display text-xs font-bold tracking-[0.18em] text-white uppercase transition-colors duration-200 hover:bg-[#C8151C] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                      />
                      <span className="relative inline-flex items-center gap-2.5">
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>BOOK {activeDeal.name} ON WHATSAPP</span>
                      </span>
                      <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
