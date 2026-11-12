"use client";

import {
  ArrowUpRight,
  Clock,
  Compass,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import {
  MaskedHeading,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";
import { WhatsAppIcon } from "./SocialIcons";

export function Location() {
  return (
    <section
      id="contact"
      aria-labelledby="location-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-white py-20 sm:py-28"
    >
      <div id="location" className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  LOCATION &amp; CONTACT
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="location-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                FIND US ON TARIQ ROAD.
              </h2>
            </MaskedHeading>
            <Reveal delay={0.08}>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Easy landmark access behind Tariq Center with direct WhatsApp
                and phone support for timings and directions.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <span className="inline-flex w-fit items-center gap-2 border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] text-gray-600 uppercase">
              <MapPin className="h-3.5 w-3.5 text-[#E31B23]" />
              <span>POSTAL CODE {siteConfig.address.postalCode}</span>
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Architectural Address & Landmarks */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <Reveal>
                <p className="font-display text-xs font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                  {siteConfig.address.shortLocationLabel}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-gray-900 sm:text-3xl">
                  {siteConfig.address.display}
                </h3>
              </Reveal>

              <StaggerGroup
                staggerDelay={0.07}
                className="mt-8 grid grid-cols-1 divide-y divide-gray-200 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              >
                <StaggerItem className="py-5 sm:pr-5">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#E31B23] uppercase">
                    SHOP UNIT
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-gray-900">
                    {siteConfig.address.shop}
                  </p>
                </StaggerItem>

                <StaggerItem className="py-5 sm:px-5">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#E31B23] uppercase">
                    PRIMARY LANDMARK
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-gray-900">
                    Behind Tariq Center
                  </p>
                </StaggerItem>

                <StaggerItem className="py-5 sm:pl-5">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#E31B23] uppercase">
                    NEARBY CUE
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-gray-900">
                    Near Hina&apos;s Cosmetics
                  </p>
                </StaggerItem>
              </StaggerGroup>

              <Reveal delay={0.08}>
                <div className="mt-6 flex items-start gap-3.5 border-l-2 border-[#E31B23] pl-4">
                  <Compass className="mt-0.5 h-5 w-5 shrink-0 text-[#E31B23]" />
                  <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                    Need help spotting the entrance? Use the Google Maps search
                    link below or message us on WhatsApp before you head over.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 pt-4 sm:flex-row">
                <a
                  href={siteConfig.address.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("directions_click", {
                      placement: "location_card",
                    })
                  }
                  className="group relative inline-flex flex-1 items-center justify-center gap-2.5 overflow-hidden bg-[#E31B23] px-6 py-4 font-display text-xs font-bold tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8151C] active:translate-y-0"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                  />
                  <Navigation className="relative h-4 w-4" />
                  <span className="relative">OPEN IN GOOGLE MAPS</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={getWhatsAppUrl({ type: "location" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("whatsapp_click", {
                      placement: "location_directions_help",
                    })
                  }
                  className="inline-flex flex-1 items-center justify-center gap-2.5 border border-gray-300 bg-white px-6 py-4 font-display text-xs font-bold tracking-[0.16em] text-gray-900 uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-50 active:translate-y-0"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#E31B23]" />
                  <span>ASK EXACT DIRECTIONS</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Direct Contact & Opening Hours */}
          <Reveal
            delay={0.08}
            className="flex flex-col justify-between border-t border-gray-200 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-gray-200 lg:pt-0 lg:pl-12"
          >
            <div>
              <div className="flex items-center gap-2.5 border-b border-gray-200 pb-4">
                <Phone className="h-4 w-4 text-[#E31B23]" />
                <span className="font-display text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                  DIRECT CONTACT &amp; HOURS
                </span>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                  TELEPHONE &amp; WHATSAPP
                </p>
                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() =>
                    trackConversionEvent("phone_click", {
                      placement: "contact_card",
                    })
                  }
                  className="tabular-nums mt-2 inline-block font-display text-3xl font-extrabold tracking-tight text-gray-900 transition-colors hover:text-[#E31B23]"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-gray-600">
                  WhatsApp &amp; Call: {siteConfig.contact.phone}
                </p>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#E31B23]" />
                  <h3 className="font-display text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                    {siteConfig.openingHours.verified
                      ? "OPENING HOURS"
                      : siteConfig.openingHours.unverifiedStatusLabel}
                  </h3>
                </div>

                {siteConfig.openingHours.verified &&
                siteConfig.openingHours.schedule ? (
                  <dl className="mt-4 space-y-2.5 text-sm">
                    {siteConfig.openingHours.schedule.map((item) => (
                      <div
                        key={item.days}
                        className="flex items-center justify-between border-b border-gray-200 pb-2"
                      >
                        <dt className="text-gray-600">{item.days}</dt>
                        <dd className="font-medium text-gray-900">{item.hours}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {siteConfig.openingHours.unverifiedMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
              <a
                href={getWhatsAppUrl({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent("whatsapp_click", {
                    placement: "contact_card_book",
                  })
                }
                className="group relative flex w-full items-center justify-between overflow-hidden bg-[#E31B23] px-5 py-4 font-display text-xs font-bold tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8151C] active:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                />
                <span className="relative inline-flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>BOOK ON WHATSAPP</span>
                </span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={siteConfig.contact.phoneHref}
                onClick={() =>
                  trackConversionEvent("phone_click", {
                    placement: "contact_card_button",
                  })
                }
                className="flex w-full items-center justify-between border border-gray-300 bg-white px-5 py-4 font-display text-xs font-bold tracking-[0.16em] text-gray-900 uppercase shadow-sm transition-colors hover:border-gray-900 hover:bg-gray-50"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#E31B23]" />
                  <span>CALL {siteConfig.contact.phoneDisplay}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-gray-500" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
