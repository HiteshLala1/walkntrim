"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { scrollToSection } from "@/lib/navigation";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

const TRACKED_SECTION_MAP = [
  { id: "home", navHref: "#home" },
  { id: "difference", navHref: "#home" },
  { id: "deals", navHref: "#deals" },
  { id: "services", navHref: "#services" },
  { id: "grooms-packages", navHref: "#grooms-packages" },
  { id: "about", navHref: "#about" },
  { id: "reviews", navHref: "#about" },
  { id: "social", navHref: "#about" },
  { id: "contact", navHref: "#contact" },
  { id: "location", navHref: "#contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#home");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      setScrolled(y > 28);

      // Compute active section relative to top reading band (35% down viewport)
      const markerY = window.innerHeight * 0.35;
      let current = "#home";

      for (const entry of TRACKED_SECTION_MAP) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= markerY && rect.bottom > 100) {
          current = entry.navHref;
        }
      }

      // Snap to Contact when near bottom of document
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        current = "#contact";
      }

      setActiveHref(current);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setMobileOpen(false);
    setActiveHref(href);
    scrollToSection(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(17,24,39,0.08)]"
            : "border-b border-transparent bg-gradient-to-b from-white/95 via-white/75 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
          <a
            href="#home"
            aria-label={`${siteConfig.brand.officialName} Home`}
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative z-10 flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E31B23]"
          >
            <BrandLogo size="md" preload />
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {siteConfig.navigation.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative whitespace-nowrap py-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E31B23] xl:text-xs ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 36,
                      }}
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#E31B23]"
                    />
                  ) : (
                    <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gray-900/35 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            {siteConfig.social.instagram.enabled && (
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.social.instagram.displayName}
                onClick={() =>
                  trackConversionEvent("instagram_click", {
                    placement: "navbar",
                  })
                }
                className="inline-flex h-9 w-9 items-center justify-center border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:border-[#E31B23] hover:text-[#E31B23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}

            {siteConfig.social.facebook.enabled && (
              <a
                href={siteConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.social.facebook.displayName}
                onClick={() =>
                  trackConversionEvent("facebook_click", {
                    placement: "navbar",
                  })
                }
                className="inline-flex h-9 w-9 items-center justify-center border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:border-[#E31B23] hover:text-[#E31B23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}

            <a
              href={getWhatsAppUrl({ type: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackConversionEvent("whatsapp_click", { placement: "navbar" })
              }
              className="group ml-1 inline-flex shrink-0 items-center gap-2 bg-[#E31B23] px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-200 hover:bg-[#C8151C] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31B23] xl:px-5 xl:text-xs"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {siteConfig.social.instagram.enabled && (
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.social.instagram.displayName}
                onClick={() =>
                  trackConversionEvent("instagram_click", {
                    placement: "navbar_mobile",
                  })
                }
                className="inline-flex h-10 w-10 items-center justify-center border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:border-[#E31B23] hover:text-[#E31B23]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="relative z-10 inline-flex h-10 w-10 items-center justify-center border border-gray-200 bg-gray-50 text-gray-900 transition-colors hover:border-[#E31B23]"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[45] flex flex-col justify-between overflow-y-auto bg-white px-6 pt-24 pb-10 lg:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col divide-y divide-gray-200 border-y border-gray-200"
            >
              {siteConfig.navigation.map((item, idx) => {
                const isActive = activeHref === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, x: -12 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between py-3.5 font-display text-xl font-bold tracking-tight transition-colors ${
                      isActive
                        ? "text-[#E31B23]"
                        : "text-gray-900 hover:text-[#E31B23]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-medium tracking-[0.2em] text-gray-500">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="space-y-4 pt-6">
              <div className="flex gap-3">
                {siteConfig.social.instagram.enabled && (
                  <a
                    href={siteConfig.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversionEvent("instagram_click", {
                        placement: "mobile_menu",
                      })
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold tracking-[0.14em] text-gray-900 uppercase transition-colors hover:border-[#E31B23]"
                  >
                    <InstagramIcon className="h-4 w-4 text-[#E31B23]" />
                    <span>{siteConfig.social.instagram.handle}</span>
                  </a>
                )}

                {siteConfig.social.facebook.enabled && (
                  <a
                    href={siteConfig.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversionEvent("facebook_click", {
                        placement: "mobile_menu",
                      })
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold tracking-[0.14em] text-gray-900 uppercase transition-colors hover:border-[#E31B23]"
                  >
                    <FacebookIcon className="h-4 w-4 text-[#E31B23]" />
                    <span>{siteConfig.social.facebook.pageName}</span>
                  </a>
                )}
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E31B23] uppercase">
                  {siteConfig.address.shortLocationLabel}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  {siteConfig.address.display}
                </p>
                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() =>
                    trackConversionEvent("phone_click", {
                      placement: "mobile_menu",
                    })
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                >
                  <Phone className="h-4 w-4 text-[#E31B23]" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>

              <a
                href={getWhatsAppUrl({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversionEvent("whatsapp_click", {
                    placement: "mobile_menu",
                  });
                  setMobileOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 bg-[#E31B23] px-6 py-4 font-display text-xs font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#C8151C]"
              >
                <span>BOOK APPOINTMENT ON WHATSAPP</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
