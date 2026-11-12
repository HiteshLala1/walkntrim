export interface DealItem {
  id: string;
  name: string;
  pricePkr: number;
  priceFormatted: string;
  inclusions: string[];
}

export interface GroomPackageDay {
  dayLabel: string;
  inclusions: string[];
}

export interface GroomPackageItem {
  id: string;
  name: string;
  duration: string;
  pricePkr: number;
  priceFormatted: string;
  days: GroomPackageDay[];
}

export interface ServiceItem {
  id: string;
  index: string;
  name: string;
  description: string;
  menuItems: string[];
  image: string;
  imageAlt: string;
  whatsappServiceName: string;
}

export interface ValuePillar {
  number: string;
  title: string;
  description: string;
}

export interface PromoBannerConfig {
  enabled: boolean;
  badge: string;
  heading: string;
  description: string;
  ctaLabel: string;
  destinationUrl: string;
  openInNewTab: boolean;
}

export interface ClientReviewItem {
  id: string;
  name: string;
  rating: number;
  serviceTag: string;
  review: string;
}

export interface SocialShowcaseCard {
  id: string;
  platform: "Instagram" | "Facebook";
  title: string;
  caption: string;
  image: string;
  alt: string;
  href: string;
}

export interface OpeningHoursSchedule {
  days: string;
  hours: string;
}

export const siteConfig = {
  brand: {
    officialName: "Walk N Trim",
    brandName: "WalkNTrim",
    displayName: "WALK N TRIM",
    businessType: "Men's Salon",
    primaryTagline: "LOOK SHARP. FEEL CONFIDENT.",
    secondaryTagline: "Your grooming. Your style. Your standard.",
    footerTagline: "Walk In. Look Sharp. Walk Out.",
    shortDescription:
      "A modern men's grooming destination on Tariq Road, Karachi — precision haircuts, grooming deals, Groom's Packages, and direct WhatsApp booking.",
    logoPath: "/logo/walkntrim-logo-dark.png",
    squareLogoPath: "/logo/walkntrim-logo-square.png",
  },

  contact: {
    phone: "+923208336407",
    phoneDisplay: "0320-8336407",
    phoneHref: "tel:+923208336407",
    whatsappNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
      "923208336407",
    // Keep null until an official business email is confirmed by the owner
    email: null as string | null,
  },

  address: {
    shop: "Shop No. 3",
    landmark: "Behind Tariq Center, Near Hina's Cosmetics",
    road: "Tariq Road",
    city: "Karachi",
    postalCode: "75850",
    country: "Pakistan",
    display:
      "Shop No. 3, Behind Tariq Center, Near Hina's Cosmetics, Tariq Road, Karachi, Pakistan, 75850",
    shortLocationLabel: "TARIQ ROAD, KARACHI",
    googleMapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Walk+N+Trim+Tariq+Road+Karachi",
  },

  openingHours: {
    /**
     * Set `verified: true` and populate `schedule` once the owner confirms
     * exact daily and Sunday timings.
     */
    verified: false,
    schedule: null as OpeningHoursSchedule[] | null,
    unverifiedStatusLabel: "Hours & Slot Availability",
    unverifiedMessage:
      "Confirm today's opening hours and available chair timings directly on WhatsApp or by calling 0320-8336407 before your visit.",
  },

  social: {
    instagram: {
      platform: "Instagram",
      handle: "@walkn.trim",
      url: "https://www.instagram.com/walkn.trim/",
      displayName: "Walk N Trim Instagram",
      cta: "FOLLOW ON INSTAGRAM",
      enabled: true,
    },
    facebook: {
      platform: "Facebook",
      pageName: "WalkNTrim",
      url: "https://www.facebook.com/WalkNTrim.pk/",
      displayName: "Walk N Trim Facebook",
      cta: "FOLLOW ON FACEBOOK",
      enabled: true,
    },
  },

  /**
   * Editable promotional banner.
   * Keep `enabled: false` until the business confirms an active promotion.
   */
  promoBanner: {
    enabled: false,
    badge: "SALON UPDATE",
    heading: "",
    description: "",
    ctaLabel: "BOOK ON WHATSAPP",
    destinationUrl: "https://wa.me/923208336407",
    openInNewTab: true,
  } satisfies PromoBannerConfig,

  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
    title:
      "Walk N Trim | Men's Salon, Grooming Deals & Groom's Packages — Tariq Road, Karachi",
    description:
      "Walk N Trim on Tariq Road, Karachi — precision haircuts, 7 men's grooming deals starting at Rs. 849, and 1 to 3-Day Groom's Packages. Book your appointment on WhatsApp.",
    keywords: [
      "Men's salon in Karachi",
      "Men's salon Tariq Road",
      "Barber shop Tariq Road",
      "Men's grooming Karachi",
      "Haircut Tariq Road Karachi",
      "Groom's package Karachi",
      "Walk N Trim",
    ],
  },

  analytics: {
    enabled: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null,
  },

  navigation: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Deals", href: "#deals" },
    { label: "Groom's Packages", href: "#grooms-packages" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  valuePillars: [
    {
      number: "01",
      title: "Professional Grooming",
      description:
        "Quality grooming services delivered with attention to detail.",
    },
    {
      number: "02",
      title: "Easy WhatsApp Booking",
      description:
        "Book your visit before arriving and reduce unnecessary waiting.",
    },
    {
      number: "03",
      title: "Grooming Deals",
      description:
        "Explore grooming combinations at convenient package prices.",
    },
  ] satisfies ValuePillar[],

  /**
   * Standard Deals 1–7 sourced strictly from Walk N Trim Menu.pdf
   */
  deals: [
    {
      id: "deal-1",
      name: "Deal 1",
      pricePkr: 849,
      priceFormatted: "849",
      inclusions: [
        "Haircut",
        "Beard/Shave",
        "Face Cleansing",
        "Face Scrubbing",
        "Head Massage for 5 Minutes",
      ],
    },
    {
      id: "deal-2",
      name: "Deal 2",
      pricePkr: 1299,
      priceFormatted: "1,299",
      inclusions: [
        "Haircut",
        "Hair Protein Treatment",
        "Beard/Shave",
        "Vitamin E For Hair",
        "Face Cleansing",
        "Face Scrubbing",
        "Head Steam",
        "Hair Wash",
        "Head Massage for 5 Minutes",
      ],
    },
    {
      id: "deal-3",
      name: "Deal 3",
      pricePkr: 1399,
      priceFormatted: "1,399",
      inclusions: [
        "Haircut Beard/Shave",
        "Face Polish",
        "Face Cleansing",
        "Face Whitening",
        "Face Scrubbing",
        "Mud Mask",
        "Face Massage",
        "Head Massage for 5 Minutes",
      ],
    },
    {
      id: "deal-4",
      name: "Deal 4",
      pricePkr: 1499,
      priceFormatted: "1,499",
      inclusions: [
        "Haircut",
        "Beard/Shave",
        "Hair Color",
        "Beard Color",
        "Face Cleansing",
        "Face Scrubbing",
        "Head Massage for 5 Minutes",
        "Face Massage",
        "Hair Wash",
      ],
    },
    {
      id: "deal-5",
      name: "Deal 5",
      pricePkr: 1799,
      priceFormatted: "1,799",
      inclusions: [
        "Haircut",
        "Beard/Shave",
        "Face Polish",
        "Face Whitening",
        "Face Scrubbing",
        "Face Cleansing",
        "Face Massage",
        "Face Steam",
        "Head Massage for 5 Minutes",
        "Shoulder Massage",
        "Hair Protein Treatment",
        "Vitamin E For Hair",
        "Head Steam",
        "Hair Wash",
        "Hair Styling",
      ],
    },
    {
      id: "deal-6",
      name: "Deal 6",
      pricePkr: 2299,
      priceFormatted: "2,299",
      inclusions: [
        "Haircut",
        "Beard Shave",
        "24k Gold Facial",
        "Face Cleansing",
        "Face Whitening",
        "Face Scrubbing",
        "Charcoal Mask",
        "Face Steam",
        "Face Massage",
        "Face Polish",
        "Hair Protein Treatment",
        "Head Steam",
        "Vitamin E For Hair",
        "Black Head Removal",
        "Hand Scrubbing",
        "Hand Cleansing",
        "Hair Wash",
        "Neck Whitening",
        "Neck Scrubbing",
        "Head Massage for 5 Minutes",
        "Shoulder Massage",
        "Hair Styling",
      ],
    },
    {
      id: "deal-7",
      name: "Deal 7",
      pricePkr: 2999,
      priceFormatted: "2,999",
      inclusions: [
        "Haircut Beard/Shave",
        "Face Polish",
        "Face Cleansing",
        "Face Whitening",
        "Face Scrubbing",
        "Face Massage",
        "Neck Cleansing",
        "Neck Scrubbing",
        "Manicure",
        "Pedicure",
        "Face Steam",
        "Hair Styling",
      ],
    },
  ] satisfies DealItem[],

  /**
   * Groom's Packages sourced strictly from Walk N Trim Menu.pdf
   */
  groomsPackages: [
    {
      id: "grooms-1-day",
      name: "1-Day Groom's Package",
      duration: "1 Day",
      pricePkr: 2999,
      priceFormatted: "2,999",
      days: [
        {
          dayLabel: "Single-Day Session",
          inclusions: [
            "Haircut",
            "Beard Shave",
            "24k Gold Facial",
            "Face Cleansing",
            "Face Whitening",
            "Face Scrubbing",
            "Charcoal Mask",
            "Face Steam",
            "Face Massage",
            "Face Polish",
            "Hair Protein Treatment",
            "Head Steam",
            "Vitamin E For Hair",
            "Black Head Removal",
            "Hand Scrubbing",
            "Hand Cleansing",
            "Hair Wash",
            "Neck Whitening",
            "Neck Scrubbing",
            "Head Massage",
            "Shoulder Massage",
            "Hair Styling",
            "Makeover",
          ],
        },
      ],
    },
    {
      id: "grooms-2-days",
      name: "2-Day Groom's Package",
      duration: "2 Days",
      pricePkr: 5950,
      priceFormatted: "5,950",
      days: [
        {
          dayLabel: "Day 1",
          inclusions: [
            "Haircut/Styling/Wash",
            "Beard/Shave",
            "Makeover",
            "Massage (Head | Shoulder)",
            "Skin Glow Massage",
            "Black Head Remover",
            "Hand (Cleansing | Scrubbing | Polish)",
            "Face (Whitening | Threading | Polish | Mint Mask)",
            "Deep Cleaning",
            "Quick Manicure",
            "Microfoliant Scrubbing",
            "Neck (Whitening & Scrubbing)",
          ],
        },
        {
          dayLabel: "Day 2",
          inclusions: [
            "Hair Wash/Styling",
            "Hair/Beard Trimming",
            "Makeover",
            "Massage (Head | Shoulder)",
            "Hair Protein Treatment",
            "Vitamin E for Hair",
            "Face (Whitening | Deep Cleansing | Polish | Scrubbing)",
            "Charcoal Mask",
          ],
        },
      ],
    },
    {
      id: "grooms-3-days",
      name: "3-Day Groom's Package",
      duration: "3 Days",
      pricePkr: 6950,
      priceFormatted: "6,950",
      days: [
        {
          dayLabel: "Day 1",
          inclusions: [
            "Haircut & Hair styling",
            "Beard/Shave",
            "Makeover",
            "Head Massage",
            "Face Cleansing",
            "Face Whitening",
            "Face Polish & Mint Mask",
            "Face Massage & Face Wash",
          ],
        },
        {
          dayLabel: "Day 2",
          inclusions: [
            "Hair Styling",
            "Hair Wash",
            "Hair/Beard Trimming",
            "Makeover",
            "Face (Scrubbing | Whitening | Cleansing)",
            "Mud Mask",
            "Massage (Head | Shoulder)",
            "Skin Glow Massage",
          ],
        },
        {
          dayLabel: "Day 3",
          inclusions: [
            "Hair Wash & Styling",
            "Hair/Beard Trimming",
            "Makeover",
            "Hair Protein Treatment",
            "Quick Manicure",
            "Black Head Removal",
            "Microfoliant Scrubbing",
            "Face (Polish | Whitening | Threading)",
            "Deep Cleansing (Face | Neck)",
            "Massage (Head | Shoulder)",
            "Vitamin E for Hair",
            "Charcoal Mask",
            "Skin Glow Massage",
            "Hand Cleansing & Scrubbing",
          ],
        },
      ],
    },
  ] satisfies GroomPackageItem[],

  /**
   * Salon service categories derived strictly from Walk N Trim Menu.pdf
   */
  services: [
    {
      id: "haircuts-and-styling",
      index: "01",
      name: "Haircuts & Styling",
      description:
        "Tailored haircuts, hair washes, styling finishes, and hair coloring suited to your everyday standard or event look.",
      menuItems: ["Haircut", "Hair Styling", "Hair Wash", "Hair Color"],
      image: "/images/service-haircut.jpg",
      imageAlt:
        "Barber hands detailing a crisp haircut with Japanese steel shears and comb",
      whatsappServiceName: "Haircut & Styling",
    },
    {
      id: "beard-and-shaving",
      index: "02",
      name: "Beard Grooming & Shaving",
      description:
        "Clean beard trimming, shaping, shaving, beard coloring, and neat threading for crisp jawline definition.",
      menuItems: [
        "Beard / Shave",
        "Hair/Beard Trimming",
        "Beard Color",
        "Threading",
      ],
      image: "/images/beard-lineup.jpg",
      imageAlt:
        "Macro detail of a barber trimmer carving a razor-sharp cheek beard line-up against dark backdrop",
      whatsappServiceName: "Beard Grooming & Shaving",
    },
    {
      id: "facials-and-skincare",
      index: "03",
      name: "Facials & Skincare",
      description:
        "Targeted facial cleansing, scrubs, steam, masks, and brightening skin care for face and neck.",
      menuItems: [
        "24k Gold Facial",
        "Face Cleansing & Deep Cleansing",
        "Face Scrubbing & Microfoliant Scrubbing",
        "Face Polish & Face Whitening",
        "Charcoal, Mud & Mint Masks",
        "Face Steam & Black Head Removal",
        "Neck Cleansing, Scrubbing & Whitening",
        "Skin Glow Massage",
      ],
      image: "/images/service-facial.jpg",
      imageAlt:
        "Dark basalt stones, charcoal clay mask, steamed towel, and apothecary facial care",
      whatsappServiceName: "Facial & Skincare Service",
    },
    {
      id: "hair-treatments",
      index: "04",
      name: "Hair Treatments",
      description:
        "Restorative conditioning treatments, vitamin nourishment, and head steam to strengthen hair health and texture.",
      menuItems: ["Hair Protein Treatment", "Vitamin E For Hair", "Head Steam"],
      image: "/images/service-products.jpg",
      imageAlt:
        "Barber hands applying styling pomade and serum beside unbranded matte-black jar and amber dropper bottle",
      whatsappServiceName: "Hair Treatment",
    },
    {
      id: "massage-and-grooming-care",
      index: "05",
      name: "Massage, Hands & Makeover",
      description:
        "Relaxing head and shoulder massages, hand and foot grooming, and complete groom makeovers.",
      menuItems: [
        "Head Massage & Shoulder Massage",
        "Face Massage",
        "Manicure & Quick Manicure",
        "Pedicure",
        "Hand Cleansing, Scrubbing & Polish",
        "Makeover",
      ],
      image: "/images/service-massage.jpg",
      imageAlt:
        "Steaming black waffle towels, warm basalt stones, amber essential oil bottle, and matte manicure instruments",
      whatsappServiceName: "Massage, Manicure/Pedicure or Makeover",
    },
  ] satisfies ServiceItem[],

  clientReviews: [
    {
      id: "review-ahmed-ali",
      name: "Ahmed Ali",
      rating: 5,
      serviceTag: "Skin Fade · Tariq Road",
      review:
        "Best skin fade on Tariq Road. The barbers really know their craft and take their time. Highly recommended.",
    },
    {
      id: "review-fahad-m",
      name: "Fahad M.",
      rating: 5,
      serviceTag: "Beard Grooming & Hot Towel Shave",
      review:
        "Premium vibe and excellent beard grooming. The hot towel shave is a must-try. Definitely my go-to spot in Karachi now.",
    },
    {
      id: "review-saad-khan",
      name: "Saad Khan",
      rating: 4,
      serviceTag: "Signature Haircut",
      review:
        "Great service and attention to detail. Walk N Trim delivers a proper master's cut.",
    },
  ] satisfies ClientReviewItem[],

  /**
   * Manually manageable social media showcase visuals.
   * Replace with real Walk N Trim Instagram / Facebook feed photography anytime.
   */
  socialShowcaseItems: [
    {
      id: "ig-fade-craft",
      platform: "Instagram",
      title: "Precision Haircuts & Fades",
      caption: "See recent cuts, styling inspiration, and grooming highlights on @walkn.trim.",
      image: "/images/service-haircut.jpg",
      alt: "Precision scissor-over-comb haircut craft showcased for Walk N Trim Instagram",
      href: "https://www.instagram.com/walkn.trim/",
    },
    {
      id: "ig-beard-detail",
      platform: "Instagram",
      title: "Beard Shaping & Line-Ups",
      caption: "Sharp beard contours and everyday grooming routines shared on Instagram.",
      image: "/images/service-beard.jpg",
      alt: "Precision beard trimming detail featured for Walk N Trim Instagram",
      href: "https://www.instagram.com/walkn.trim/",
    },
    {
      id: "fb-deals-updates",
      platform: "Facebook",
      title: "Deals & Groom's Packages",
      caption: "Latest package announcements, deal combinations, and salon updates on Facebook.",
      image: "/images/service-products.jpg",
      alt: "Barber styling craft and apothecary products featured for Facebook updates",
      href: "https://www.facebook.com/WalkNTrim.pk/",
    },
    {
      id: "fb-tools-craft",
      platform: "Facebook",
      title: "Skin Care & Groom Prep",
      caption: "Facials, treatments, and wedding prep highlights on WalkNTrim Facebook.",
      image: "/images/service-massage.jpg",
      alt: "Hot towels, basalt stones, and grooming care featured for Walk N Trim Facebook",
      href: "https://www.facebook.com/WalkNTrim.pk/",
    },
  ] satisfies SocialShowcaseCard[],
} as const;
