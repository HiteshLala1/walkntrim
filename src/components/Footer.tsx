"use client";

import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { scrollToSection } from "@/lib/navigation";
import { getWhatsAppUrl, trackConversionEvent } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { instagram, facebook } = siteConfig.social;

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-24 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand & Official Social Column */}
          <div className="lg:col-span-5">
            <a
              href="#home"
              aria-label={`${siteConfig.brand.officialName} Home`}
              onClick={(e) => handleAnchorClick(e, "#home")}
              className="inline-block"
            >
              <BrandLogo size="lg" />
            </a>

            <p className="mt-5 font-display text-xs font-bold tracking-[0.24em] text-[#E31B23] uppercase">
              {siteConfig.brand.footerTagline}
            </p>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
              {siteConfig.brand.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {instagram.enabled && (
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={instagram.displayName}
                  onClick={() =>
                    trackConversionEvent("instagram_click", {
                      placement: "footer",
                    })
                  }
                  className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold tracking-[0.12em] text-gray-900 uppercase shadow-sm transition-colors hover:border-[#E31B23] hover:bg-[#E31B23] hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>{instagram.handle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}

              {facebook.enabled && (
                <a
                  href={facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={facebook.displayName}
                  onClick={() =>
                    trackConversionEvent("facebook_click", {
                      placement: "footer",
                    })
                  }
                  className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold tracking-[0.12em] text-gray-900 uppercase shadow-sm transition-colors hover:border-[#E31B23] hover:bg-[#E31B23] hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                  <span>{facebook.pageName}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-bold tracking-[0.22em] text-gray-900 uppercase">
              QUICK LINKS
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => handleAnchorClick(e, "#reviews")}
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Client Reviews
                </a>
              </li>
              <li>
                <a
                  href="#social"
                  onClick={(e) => handleAnchorClick(e, "#social")}
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Social Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-xs font-bold tracking-[0.22em] text-gray-900 uppercase">
              SALON DETAILS
            </h2>

            <ul className="mt-4 space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E31B23]" />
                <div>
                  <p className="leading-relaxed text-gray-700">
                    {siteConfig.address.display}
                  </p>
                  <a
                    href={siteConfig.address.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversionEvent("directions_click", {
                        placement: "footer",
                      })
                    }
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.12em] text-[#E31B23] uppercase hover:underline"
                  >
                    <span>Google Maps Directions</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#E31B23]" />
                <a
                  href={siteConfig.contact.phoneHref}
                  onClick={() =>
                    trackConversionEvent("phone_click", { placement: "footer" })
                  }
                  className="font-medium text-gray-900 transition-colors hover:text-[#E31B23]"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#E31B23]" />
                <a
                  href={getWhatsAppUrl({ type: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("whatsapp_click", {
                      placement: "footer",
                    })
                  }
                  className="font-medium text-gray-900 transition-colors hover:text-[#E31B23]"
                >
                  Book via WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-5 border-t border-gray-200 pt-4 text-xs leading-relaxed text-gray-500">
              {siteConfig.openingHours.verified &&
              siteConfig.openingHours.schedule ? (
                <div className="space-y-1">
                  {siteConfig.openingHours.schedule.map((entry) => (
                    <p key={entry.days}>
                      <span className="text-gray-700">{entry.days}:</span>{" "}
                      {entry.hours}
                    </p>
                  ))}
                </div>
              ) : (
                <p>
                  Hours: Message us on WhatsApp or call{" "}
                  {siteConfig.contact.phoneDisplay} to confirm today&apos;s
                  schedule.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-gray-200 pt-7 pr-16 text-xs text-gray-500 sm:flex-row sm:items-center sm:pr-56">
          <p>
            © {currentYear} {siteConfig.brand.officialName}. All rights
            reserved.
          </p>
          <p className="tracking-[0.14em] uppercase">
            {siteConfig.address.road}, {siteConfig.address.city},{" "}
            {siteConfig.address.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
