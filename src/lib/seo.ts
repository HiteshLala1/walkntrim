import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export function buildSiteMetadata(): Metadata {
  const siteUrl = siteConfig.seo.siteUrl;
  const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    keywords: [...siteConfig.seo.keywords],
    authors: [{ name: siteConfig.brand.officialName }],
    creator: siteConfig.brand.officialName,
    publisher: siteConfig.brand.officialName,
    ...(siteUrl
      ? {
          alternates: {
            canonical: "/",
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: "en_PK",
      siteName: siteConfig.brand.officialName,
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
      ...(siteUrl ? { url: siteUrl } : {}),
      images: [
        {
          url: "/images/hero-grooming.jpg",
          width: 1280,
          height: 720,
          alt: "Walk N Trim Men's Salon on Tariq Road, Karachi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
      images: ["/images/hero-grooming.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generates HairSalon / LocalBusiness JSON-LD using verified business,
 * social, deal, and Groom's Package information only.
 */
export function buildHairSalonStructuredData() {
  const socialUrls: Array<string | null> = [
    siteConfig.social.instagram.enabled ? siteConfig.social.instagram.url : null,
    siteConfig.social.facebook.enabled ? siteConfig.social.facebook.url : null,
  ];
  const sameAs = socialUrls.filter((url): url is string => Boolean(url));

  const offerItems = [
    ...siteConfig.deals.map((deal) => ({
      "@type": "Offer",
      name: deal.name,
      price: deal.pricePkr,
      priceCurrency: "PKR",
      itemOffered: {
        "@type": "Service",
        name: `${deal.name} — Men's Grooming Deal`,
        description: deal.inclusions.join(", "),
      },
    })),
    ...siteConfig.groomsPackages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.pricePkr,
      priceCurrency: "PKR",
      itemOffered: {
        "@type": "Service",
        name: pkg.name,
        description: pkg.days
          .map((day) => `${day.dayLabel}: ${day.inclusions.join(", ")}`)
          .join(" | "),
      },
    })),
    ...siteConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  ];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.brand.officialName,
    alternateName: siteConfig.brand.brandName,
    description: siteConfig.brand.shortDescription,
    telephone: siteConfig.contact.phone,
    hasMap: siteConfig.address.googleMapsSearchUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.shop}, ${siteConfig.address.landmark}, ${siteConfig.address.road}`,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "City",
      name: "Karachi",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Men's Grooming Deals, Groom's Packages & Services",
      itemListElement: offerItems,
    },
  };

  if (siteConfig.seo.siteUrl) {
    schema.url = siteConfig.seo.siteUrl;
    schema.image = `${siteConfig.seo.siteUrl}/images/hero-grooming.jpg`;
    schema.logo = `${siteConfig.seo.siteUrl}${siteConfig.brand.squareLogoPath}`;
  }

  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  if (siteConfig.openingHours.verified && siteConfig.openingHours.schedule) {
    schema.openingHoursSpecification = siteConfig.openingHours.schedule.map(
      (entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.days,
        description: entry.hours,
      })
    );
  }

  return schema;
}
