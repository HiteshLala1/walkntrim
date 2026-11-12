"use client";

import { motion, useReducedMotion } from "motion/react";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./SocialIcons";

export function WhatsAppButton() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={getWhatsAppUrl({ type: "general" })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book an appointment on WhatsApp"
      onClick={() =>
        trackConversionEvent("whatsapp_click", {
          placement: "floating_widget",
        })
      }
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -2 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className="group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 overflow-hidden border border-white/15 bg-[#E31B23] p-3.5 text-white shadow-[0_14px_34px_rgba(227,27,35,0.38)] transition-colors duration-200 hover:bg-[#C8151C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:bottom-6 sm:px-5 sm:py-3.5"
    >
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,transparent_72%)]"
        />
      )}
      <WhatsAppIcon className="relative h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="relative hidden font-display text-xs font-bold tracking-[0.16em] uppercase sm:inline">
        BOOK ON WHATSAPP
      </span>
    </motion.a>
  );
}
