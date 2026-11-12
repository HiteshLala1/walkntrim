"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { MaskedHeading, Reveal } from "./MotionPrimitives";
import { WhatsAppIcon } from "./SocialIcons";

export function BookingCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="booking-cta-heading"
      className="relative overflow-hidden border-t border-gray-200 bg-gray-50 py-24 sm:py-32"
    >
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.65, 0.95, 0.65] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,27,35,0.12)_0%,transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-[#E31B23] pl-6 sm:pl-10 lg:pl-14">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Reveal>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.26em] text-[#E31B23] uppercase">
                    WHATSAPP BOOKING · TARIQ ROAD
                  </span>
                </div>
              </Reveal>

              <MaskedHeading>
                <h2
                  id="booking-cta-heading"
                  className="font-display text-4xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-5xl lg:text-6xl"
                >
                  YOUR NEXT LOOK STARTS HERE.
                </h2>
              </MaskedHeading>

              <Reveal delay={0.08}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                  Skip the unnecessary wait. Get in touch and plan your next
                  grooming visit directly with our salon team in chat.
                </p>

                <p className="mt-3 text-xs tracking-wide text-gray-500">
                  {siteConfig.brand.footerTagline} — Shop No. 3, Behind Tariq
                  Center.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="flex shrink-0 flex-col gap-3.5 sm:flex-row lg:flex-col xl:min-w-[300px]">
                <a
                  href={getWhatsAppUrl({ type: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("whatsapp_click", {
                      placement: "booking_banner",
                    })
                  }
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-[#E31B23] px-8 py-4.5 font-display text-xs font-bold tracking-[0.18em] text-white uppercase shadow-[0_12px_28px_rgba(227,27,35,0.28)] transition-colors hover:bg-[#C8151C] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23] sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                  />
                  <WhatsAppIcon className="relative h-4 w-4" />
                  <span className="relative">BOOK ON WHATSAPP</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() =>
                    trackConversionEvent("phone_click", {
                      placement: "booking_banner",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2.5 border border-gray-300 bg-white px-8 py-4.5 font-display text-xs font-bold tracking-[0.18em] text-gray-900 uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-100 active:translate-y-0 sm:text-sm"
                >
                  <Phone className="h-4 w-4 text-[#E31B23]" />
                  <span>CALL {siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
