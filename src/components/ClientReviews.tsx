"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { MaskedHeading, Reveal } from "./MotionPrimitives";
import { ReviewsCarousel, type ReviewItem } from "./ui/reviews-carousel";
import { WhatsAppIcon } from "./SocialIcons";

export function ClientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const carouselItems: ReviewItem[] = useMemo(
    () =>
      siteConfig.clientReviews.map((item) => ({
        id: item.id,
        author: item.name,
        title: item.serviceTag,
        rating: item.rating,
        body: item.review,
      })),
    []
  );

  const averageRating = useMemo(() => {
    const sum = siteConfig.clientReviews.reduce(
      (total, item) => total + item.rating,
      0
    );
    return (sum / siteConfig.clientReviews.length).toFixed(1);
  }, []);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative scroll-mt-20 border-t border-gray-200 bg-gray-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-6 bg-[#E31B23]" />
                <span className="text-xs font-semibold tracking-[0.24em] text-[#E31B23] uppercase">
                  CLIENT REVIEWS
                </span>
              </div>
            </Reveal>
            <MaskedHeading>
              <h2
                id="reviews-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
              >
                TRUSTED BY MEN ACROSS KARACHI.
              </h2>
            </MaskedHeading>
            <Reveal delay={0.08}>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                Real client feedback on our skin fades, beard grooming, hot
                towel shaves, and consistent chair standard on Tariq Road.
              </p>
            </Reveal>
          </div>

          {/* Aggregate Rating Box */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-5 border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <div>
                <p className="font-display text-3xl font-extrabold tracking-tight text-gray-900 tabular-nums">
                  {averageRating}
                  <span className="ml-1 text-base font-semibold text-gray-500">
                    / 5
                  </span>
                </p>
                <div className="mt-1 flex items-center gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`summary-star-${i}`}
                      className="h-3.5 w-3.5 fill-[#E31B23] text-[#E31B23]"
                    />
                  ))}
                </div>
              </div>
              <div className="h-10 w-[1px] bg-gray-200" aria-hidden="true" />
              <div className="text-xs">
                <p className="font-display font-bold tracking-[0.16em] text-gray-900 uppercase">
                  VERIFIED CLIENTS
                </p>
                <p className="mt-0.5 text-gray-600">
                  {siteConfig.clientReviews.length} Featured Tariq Road Reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Asymmetric Split: Interactive Reviewer Index (Left) + 21st.dev Spring Reviews Carousel (Right) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Interactive Reviewer Ledger */}
          <Reveal className="lg:col-span-5">
            <div className="space-y-2 divide-y divide-gray-200 border-y border-gray-200">
              {siteConfig.clientReviews.map((review, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={review.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative flex w-full items-start justify-between gap-4 px-4 py-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23] sm:px-5 ${
                      isActive
                        ? "bg-white text-gray-900 shadow-sm"
                        : "bg-transparent text-gray-600 hover:bg-white/75 hover:text-gray-900"
                    }`}
                  >
                    {isActive && !prefersReducedMotion && (
                      <motion.span
                        layoutId="client-review-rail-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                        className="absolute inset-y-0 left-0 w-1 bg-[#E31B23]"
                      />
                    )}
                    {isActive && prefersReducedMotion && (
                      <span className="absolute inset-y-0 left-0 w-1 bg-[#E31B23]" />
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-display text-xs font-bold tracking-[0.2em] ${
                            isActive ? "text-[#E31B23]" : "text-gray-400"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="font-display text-base font-extrabold tracking-tight uppercase">
                          {review.name}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-gray-600">
                        &ldquo;{review.review}&rdquo;
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star
                            key={`${review.id}-list-star-${starIdx}`}
                            aria-hidden="true"
                            className={`h-3 w-3 ${
                              starIdx < review.rating
                                ? "fill-[#E31B23] text-[#E31B23]"
                                : "fill-transparent text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-gray-500 uppercase">
                        {review.rating}.0 ★
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-xs text-gray-600">
                <Quote className="h-3.5 w-3.5 text-[#E31B23]" />
                <span>Experience the same precision standard today</span>
              </div>

              <a
                href={getWhatsAppUrl({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent("whatsapp_click", {
                    placement: "reviews_section",
                  })
                }
                className="group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden bg-[#E31B23] px-5 py-3 font-display text-xs font-bold tracking-[0.16em] text-white uppercase shadow-sm transition-colors hover:bg-[#C8151C]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[260%]"
                />
                <WhatsAppIcon className="relative h-3.5 w-3.5" />
                <span className="relative">BOOK YOUR SLOT</span>
                <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Right Stacked 21st.dev Reviews Carousel */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
              <ReviewsCarousel
                reviews={carouselItems}
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
                autoPlay
                autoPlayInterval={5500}
                height="360px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
