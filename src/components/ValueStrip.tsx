"use client";

import { MessageCircle, Scissors, Tag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { MaskedHeading, Reveal } from "./MotionPrimitives";

const PILLAR_ICONS = [Scissors, MessageCircle, Tag] as const;

export function ValueStrip() {
  return (
    <section
      id="difference"
      aria-labelledby="value-proposition-heading"
      className="relative border-t border-gray-200 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 sm:mb-14 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  THE WALK N TRIM STANDARD
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="value-proposition-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                GROOMING WITHOUT THE WAIT.
              </h2>
            </MaskedHeading>
          </div>

          <Reveal delay={0.08}>
            <p className="max-w-sm text-sm leading-relaxed text-gray-600">
              {siteConfig.brand.footerTagline} Consistent grooming and direct
              WhatsApp slot confirmation on Tariq Road.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {siteConfig.valuePillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index];
            return (
              <Reveal
                key={pillar.number}
                delay={index * 0.08}
                className={`group relative py-8 transition-all duration-300 hover:-translate-y-0.5 md:py-4 ${
                  index === 0
                    ? "md:pr-8 lg:pr-10"
                    : index === 1
                      ? "md:px-8 lg:px-10"
                      : "md:pl-8 lg:pl-10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-4xl font-extrabold tracking-tighter text-gray-200 transition-colors duration-300 group-hover:text-[#E31B23]/75 sm:text-5xl">
                    {pillar.number}
                  </span>

                  <div className="relative flex h-11 w-11 items-center justify-center border border-gray-200 bg-gray-50 text-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:border-[#E31B23] group-hover:bg-[#E31B23] group-hover:text-white">
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 h-[1px] w-10 bg-gray-200 transition-all duration-300 group-hover:w-20 group-hover:bg-[#E31B23]" />
                  <h3 className="font-display text-lg font-bold tracking-tight text-gray-900 uppercase sm:text-xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
