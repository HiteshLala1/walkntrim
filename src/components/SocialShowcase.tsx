"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackConversionEvent } from "@/lib/whatsapp";
import { ClipReveal, MaskedHeading, Reveal } from "./MotionPrimitives";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

export function SocialShowcase() {
  const { instagram, facebook } = siteConfig.social;

  return (
    <section
      id="social"
      aria-labelledby="social-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  OFFICIAL SOCIAL CHANNELS
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="social-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                THE WALK N TRIM LOOK. BEYOND THE SALON.
              </h2>
            </MaskedHeading>
            <Reveal delay={0.08}>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Follow Walk N Trim for grooming inspiration, salon updates,
                latest looks, and special deals.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Architectural Dual-Channel Header Strip */}
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-b border-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
          {instagram.enabled && (
            <Reveal className="flex flex-col justify-between py-6 md:pr-8 lg:pr-12">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#E31B23] text-white shadow-sm">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#E31B23] uppercase">
                      INSTAGRAM
                    </p>
                    <h3 className="mt-0.5 font-display text-2xl font-extrabold tracking-tight text-gray-900">
                      {instagram.handle}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
                Browse haircut finishes, beard grooming details, and daily style
                updates directly on our official Instagram profile.
              </p>

              <div className="mt-6">
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("instagram_click", {
                      placement: "social_showcase",
                    })
                  }
                  className="group/btn inline-flex items-center justify-between gap-4 bg-[#E31B23] px-5 py-3.5 font-display text-xs font-bold tracking-[0.16em] text-white uppercase shadow-sm transition-colors hover:bg-[#C8151C]"
                >
                  <span className="inline-flex items-center gap-2">
                    <InstagramIcon className="h-4 w-4" />
                    <span>{instagram.cta}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          )}

          {facebook.enabled && (
            <Reveal
              delay={0.06}
              className="flex flex-col justify-between py-6 md:pl-8 lg:pl-12"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-gray-50 text-gray-900">
                    <FacebookIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#E31B23] uppercase">
                      FACEBOOK PAGE
                    </p>
                    <h3 className="mt-0.5 font-display text-2xl font-extrabold tracking-tight text-gray-900">
                      {facebook.pageName}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
                Stay updated on grooming deals, Groom&apos;s Packages, and salon
                announcements on our official Facebook page.
              </p>

              <div className="mt-6">
                <a
                  href={facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("facebook_click", {
                      placement: "social_showcase",
                    })
                  }
                  className="group/btn inline-flex items-center justify-between gap-4 border border-gray-300 bg-white px-5 py-3.5 font-display text-xs font-bold tracking-[0.16em] text-gray-900 uppercase shadow-sm transition-colors hover:border-[#E31B23] hover:bg-[#E31B23] hover:text-white"
                >
                  <span className="inline-flex items-center gap-2">
                    <FacebookIcon className="h-4 w-4" />
                    <span>{facebook.cta}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          )}
        </div>

        {/* 4-Frame Editorial Lookbook Reel Strip */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.socialShowcaseItems.map((card, idx) => (
            <ClipReveal key={card.id} delay={idx * 0.05}>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent(
                    card.platform === "Instagram"
                      ? "instagram_click"
                      : "facebook_click",
                    { placement: `social_grid_${card.id}` }
                  )
                }
                className="group relative block aspect-[4/5] overflow-hidden border border-gray-200 bg-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23]"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-90" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-black/80 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-[#E31B23] uppercase backdrop-blur-sm">
                    {card.platform === "Instagram" ? (
                      <InstagramIcon className="h-3 w-3" />
                    ) : (
                      <FacebookIcon className="h-3 w-3" />
                    )}
                    <span>{card.platform}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/85 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <h3 className="font-display text-base font-bold text-white uppercase">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-200">
                    {card.caption}
                  </p>
                </div>
              </a>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
