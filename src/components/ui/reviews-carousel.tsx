"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Spring-stacked Reviews Carousel adapted from 21st.dev (@educalvolpz/reviews-carousel)
 * for Walk N Trim's dark editorial aesthetic (#080808 / #141414 / #E31B23).
 */
const FRAME_OFFSET = -26;
const FRAMES_VISIBLE_LENGTH = 3;

function clamp(val: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(val, min), max);
}

export interface ReviewItem {
  id: string | number;
  author: string;
  title: string;
  rating: number;
  body: string;
}

interface ReviewCardProps {
  activeIndex: number;
  index: number;
  review: ReviewItem;
  totalCards: number;
}

function ReviewCard({
  review,
  index,
  activeIndex,
  totalCards,
}: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  // Circular visual stack distance ahead of activeIndex so the deck wraps cleanly
  const offsetIndex = (index - activeIndex + totalCards) % totalCards;
  const isActive = offsetIndex === 0;

  const scale = shouldReduceMotion
    ? 1
    : clamp(1 - offsetIndex * 0.06, [0.84, 1]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        0,
      ]);
  const opacity = isActive ? 1 : Math.max(0.28, 0.72 - offsetIndex * 0.24);
  const blur = isActive || shouldReduceMotion ? 0 : Math.min(offsetIndex * 0.8, 1.8);

  const initials = review.author
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.figure
      animate={{
        y,
        scale,
        opacity,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 260,
              damping: 22,
              mass: 0.6,
            },
      }}
      className={cn(
        "absolute top-[55%] left-1/2 w-[calc(100%-0.5rem)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border p-5 shadow-[0_20px_50px_rgba(17,24,39,0.1)] transition-colors duration-300 sm:p-8",
        isActive
          ? "border-gray-300 bg-white"
          : "border-gray-200 bg-gray-50"
      )}
      initial={false}
      style={{
        willChange: "opacity, filter, transform",
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        zIndex: totalCards - offsetIndex,
        pointerEvents: isActive ? "auto" : "none",
      }}
      aria-hidden={!isActive}
    >
      {/* Top Crimson Accent Line */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300",
          isActive ? "bg-[#E31B23] opacity-100" : "bg-gray-300 opacity-50"
        )}
      />

      {/* Star Rating & Index Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-1"
          aria-label={`Rated ${review.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, starIdx) => {
            const filled = starIdx < review.rating;
            return (
              <Star
                key={`${review.id}-star-${starIdx}`}
                aria-hidden="true"
                className={cn(
                  "h-4 w-4",
                  filled
                    ? "fill-[#E31B23] text-[#E31B23]"
                    : "fill-transparent text-gray-300"
                )}
              />
            );
          })}
          <span className="ml-2 font-display text-xs font-bold tracking-[0.16em] text-gray-700 tabular-nums">
            {review.rating}.0 / 5.0
          </span>
        </div>

        <span className="font-display text-xs font-bold tracking-[0.2em] text-gray-400 tabular-nums">
          0{index + 1} / 0{totalCards}
        </span>
      </div>

      {/* Editorial Quote */}
      <blockquote className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 -left-1 font-display text-6xl font-extrabold leading-none text-[#E31B23]/20 select-none"
        >
          &ldquo;
        </span>
        <p className="relative pl-4 font-sans text-base leading-relaxed text-gray-900 sm:text-lg sm:leading-relaxed">
          {review.body}
        </p>
      </blockquote>

      {/* Author Footer */}
      <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E31B23]/40 bg-gray-50 font-display text-xs font-extrabold tracking-wider text-gray-900">
            {initials}
          </div>
          <div>
            <span className="block font-display text-sm font-bold tracking-wide text-gray-900 uppercase">
              {review.author}
            </span>
            <span className="block text-xs font-medium tracking-[0.12em] text-gray-600 uppercase">
              {review.title}
            </span>
          </div>
        </div>

        <span className="hidden border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold tracking-[0.14em] text-gray-600 uppercase sm:inline-block">
          Client Review
        </span>
      </figcaption>
    </motion.figure>
  );
}

interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={direction === "prev" ? "Previous client review" : "Next client review"}
      className="group flex h-9 w-9 items-center justify-center border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-[#E31B23] hover:bg-[#E31B23] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23]"
      onClick={onClick}
      type="button"
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
    </button>
  );
}

export interface ReviewsCarouselProps {
  activeIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  excludeIds?: Array<string | number>;
  height?: string;
  onActiveIndexChange?: (index: number) => void;
  reviews: ReviewItem[];
  showIndicators?: boolean;
  showNavigation?: boolean;
}

export function ReviewsCarousel({
  reviews,
  className = "",
  height = "360px",
  excludeIds = [],
  showIndicators = true,
  showNavigation = true,
  autoPlay = true,
  autoPlayInterval = 5500,
  activeIndex: controlledIndex,
  onActiveIndexChange,
}: ReviewsCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [internalIndex, setInternalIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredReviews = useMemo(() => {
    if (excludeIds.length === 0) return reviews;
    const excludeSet = new Set(excludeIds);
    return reviews.filter((review) => !excludeSet.has(review.id));
  }, [reviews, excludeIds]);

  const totalCards = filteredReviews.length;
  const activeIndex =
    controlledIndex !== undefined
      ? Math.min(Math.max(controlledIndex, 0), Math.max(totalCards - 1, 0))
      : Math.min(internalIndex, Math.max(totalCards - 1, 0));

  const onActiveChangeRef = useRef(onActiveIndexChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveIndexChange;
  }, [onActiveIndexChange]);

  const setActive = useCallback(
    (next: number) => {
      const normalized =
        totalCards > 0 ? ((next % totalCards) + totalCards) % totalCards : 0;
      if (controlledIndex === undefined) {
        setInternalIndex(normalized);
      }
      onActiveChangeRef.current?.(normalized);
    },
    [controlledIndex, totalCards]
  );

  useEffect(() => {
    if (!autoPlay || isPaused || shouldReduceMotion || totalCards <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive(activeIndex + 1);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [
    autoPlay,
    autoPlayInterval,
    isPaused,
    shouldReduceMotion,
    totalCards,
    activeIndex,
    setActive,
  ]);

  if (totalCards === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials carousel"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setActive(activeIndex - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setActive(activeIndex + 1);
        }
      }}
      className={cn(
        "relative mx-auto flex w-full flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E31B23]",
        className
      )}
    >
      {/* Spring-Stacked Review Deck */}
      <div
        className="relative w-full pt-12 pb-2 min-h-[385px] sm:min-h-[360px]"
        style={height !== "360px" ? { height } : undefined}
      >
        <div className="relative h-[340px] w-full sm:h-[320px]">
          {filteredReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              activeIndex={activeIndex}
              index={index}
              review={review}
              totalCards={totalCards}
            />
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      {(showNavigation || showIndicators) && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
          {showIndicators ? (
            <div className="flex items-center gap-2" aria-label="Select review slide">
              {filteredReviews.map((review, index) => {
                const isSelected = index === activeIndex;
                return (
                  <button
                    key={review.id}
                    type="button"
                    aria-label={`View review by ${review.author}`}
                    aria-current={isSelected ? "true" : undefined}
                    onClick={() => setActive(index)}
                    className={cn(
                      "h-1.5 transition-all duration-300",
                      isSelected
                        ? "w-10 bg-[#E31B23]"
                        : "w-3 bg-gray-300 hover:bg-gray-400"
                    )}
                  />
                );
              })}
            </div>
          ) : (
            <div />
          )}

          {showNavigation && (
            <div className="flex items-center gap-2">
              {autoPlay && !shouldReduceMotion && (
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-label={
                    isPaused ? "Resume automatic rotation" : "Pause automatic rotation"
                  }
                  className="mr-1 flex h-9 w-9 items-center justify-center border border-gray-200 bg-white text-gray-500 transition-colors hover:border-gray-900 hover:text-gray-900"
                >
                  {isPaused ? (
                    <Play className="h-3.5 w-3.5" />
                  ) : (
                    <Pause className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
              <NavigationButton
                direction="prev"
                onClick={() => setActive(activeIndex - 1)}
              />
              <NavigationButton
                direction="next"
                onClick={() => setActive(activeIndex + 1)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
