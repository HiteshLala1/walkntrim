import { ArrowUpRight, Megaphone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Editable Promotional Banner.
 * Controlled centrally from `siteConfig.promoBanner`.
 * Remains hidden unless `enabled` is explicitly true and copy is supplied.
 */
export function PromoBanner() {
  const { promoBanner } = siteConfig;

  if (!promoBanner.enabled || !promoBanner.heading) {
    return null;
  }

  return (
    <section
      aria-label="Salon Promotion"
      className="border-t border-gray-200 bg-gray-50 py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col justify-between gap-4 border border-[#E31B23]/40 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#E31B23] text-white">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              {promoBanner.badge && (
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#E31B23] uppercase">
                  {promoBanner.badge}
                </span>
              )}
              <h2 className="font-display text-base font-bold text-gray-900 uppercase sm:text-lg">
                {promoBanner.heading}
              </h2>
              {promoBanner.description && (
                <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                  {promoBanner.description}
                </p>
              )}
            </div>
          </div>

          {promoBanner.ctaLabel && promoBanner.destinationUrl && (
            <a
              href={promoBanner.destinationUrl}
              target={promoBanner.openInNewTab ? "_blank" : undefined}
              rel={
                promoBanner.openInNewTab ? "noopener noreferrer" : undefined
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#E31B23] px-5 py-3 font-display text-xs font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#C8151C]"
            >
              <span>{promoBanner.ctaLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
