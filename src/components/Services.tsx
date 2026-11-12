"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import {
  ClipReveal,
  MaskedHeading,
  ParallaxFrame,
  Reveal,
} from "./MotionPrimitives";
import { WhatsAppIcon } from "./SocialIcons";

export function Services() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 lg:mb-20 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  SALON SERVICES
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="services-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                EVERY DETAIL MATTERS.
              </h2>
            </MaskedHeading>
            <Reveal delay={0.08}>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Professional grooming services to help you look and feel your
                best.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border-l-2 border-[#E31B23] pl-4 text-xs leading-relaxed text-gray-600 sm:max-w-xs">
              Prefer a single service instead of a package deal? Message us on
              WhatsApp for availability and individual service inquiries.
            </div>
          </Reveal>
        </div>

        {/* Alternating Asymmetric Editorial Spreads — Breaking Uniform Card Grids */}
        <div className="space-y-16 sm:space-y-24">
          {siteConfig.services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={service.id}
                className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                {/* Large Photographic Frame with Scroll Depth & Clip Reveal */}
                <div
                  className={`${
                    isEven ? "lg:order-1 lg:col-span-7" : "lg:order-2 lg:col-span-7"
                  }`}
                >
                  <ClipReveal>
                    <div className="relative overflow-hidden border border-gray-200 bg-white shadow-lg">
                      <ParallaxFrame
                        distance={24}
                        className={
                          index === 0
                            ? "aspect-[16/10]"
                            : "aspect-[4/3]"
                        }
                      >
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          quality={85}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </ParallaxFrame>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-2 border border-white/20 bg-black/85 px-3.5 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 bg-[#E31B23]" />
                        <span className="font-display text-xs font-bold tracking-[0.22em] text-white">
                          CHAPTER {service.index}
                        </span>
                      </div>
                    </div>
                  </ClipReveal>
                </div>

                {/* Open Architectural Copy & Direct Booking Column */}
                <motion.div
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                        delayChildren: 0.14,
                        staggerChildren: 0.035,
                      },
                    },
                  }}
                  className={`${
                    isEven ? "lg:order-2 lg:col-span-5" : "lg:order-1 lg:col-span-5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-extrabold tracking-tighter text-[#E31B23]">
                      {service.index}
                    </span>
                    <span className="h-[1px] flex-1 bg-gray-200" />
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-3xl lg:text-4xl">
                    {service.name}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    {service.description}
                  </p>

                  {service.menuItems.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-5">
                      <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                        MENU SERVICES IN THIS CATEGORY
                      </p>
                      <ul
                        aria-label={`${service.name} services`}
                        className="flex flex-wrap gap-2"
                      >
                        {service.menuItems.map((item) => (
                          <motion.li
                            key={item}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              },
                            }}
                            className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-800 transition-colors duration-200 hover:border-[#E31B23]/60 hover:text-gray-900"
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8">
                    <a
                      href={getWhatsAppUrl({
                        type: "service",
                        name: service.whatsappServiceName,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackConversionEvent("service_booking_click", {
                          service: service.name,
                        });
                        trackConversionEvent("whatsapp_click", {
                          placement: `service_${service.id}`,
                        });
                      }}
                      className="group/btn relative inline-flex items-center justify-between gap-5 overflow-hidden border border-gray-300 bg-white px-6 py-4 font-display text-xs font-bold tracking-[0.18em] text-gray-900 uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E31B23] hover:bg-[#E31B23] hover:text-white active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23]"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/btn:translate-x-[260%]"
                      />
                      <span className="relative inline-flex items-center gap-2.5">
                        <WhatsAppIcon className="h-4 w-4 text-[#E31B23] transition-colors group-hover/btn:text-white" />
                        <span>BOOK ON WHATSAPP</span>
                      </span>
                      <ArrowUpRight className="relative h-4 w-4 text-gray-500 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-white" />
                    </a>
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
