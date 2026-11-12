# Walk N Trim — Official Website

A conversion-focused, mobile-first editorial website for **Walk N Trim**, a men's grooming salon at Shop No. 3, Behind Tariq Center, Near Hina's Cosmetics, Tariq Road, Karachi, Pakistan.

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **3D & WebGL**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) with `prefers-reduced-motion` and mobile fallbacks
- **Animations**: Motion (`motion/react`) with `prefers-reduced-motion` support
- **Icons**: Lucide React + custom vector brand icons
- **Image Optimization**: `next/image` (AVIF/WebP)

## Centralized Configuration

All business details, menu deals, Groom's Packages, services, editable promotional banner, gallery visuals, and official social links live in:

- [`src/lib/site-config.ts`](src/lib/site-config.ts) — Verified address, phone (`0320-8336407`), Instagram (`@walkn.trim`), Facebook (`WalkNTrim`), Standard Deals 1–7 (`Rs. 849`–`Rs. 2,999`), Groom's Packages (`1-Day` `Rs. 2,999`, `2-Day` `Rs. 5,950`, `3-Day` `Rs. 6,950`), `promoBanner` toggle (`enabled: false` by default), and `openingHours` (`verified: false` until owner confirms).
- [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts) — Contextual WhatsApp URL generator and pre-filled message templates for deals, Groom's Packages, services, location inquiries, and general booking.
- [`src/lib/seo.ts`](src/lib/seo.ts) — Metadata and truthful `HairSalon` JSON-LD structured data including verified social URLs, deals, and Groom's Packages.

## Before Public Launch Checklist

1. **Opening Hours**: Set `openingHours.verified = true` and populate `openingHours.schedule` in `src/lib/site-config.ts` after owner confirmation.
2. **Map Coordinates**: Verify exact pin placement on Tariq Road behind Tariq Center before embedding an interactive coordinate map.
3. **Promotional Banner**: Enable `promoBanner.enabled = true` and enter confirmed promotional copy when running a campaign.
4. **Domain**: Set `NEXT_PUBLIC_SITE_URL` in `.env` (see `.env.example`) for canonical URLs, `sitemap.xml`, and `robots.txt` sitemap output.
5. **Photography**: Replace representative visuals in `public/images/` with genuine Walk N Trim salon and social photographs as captured.

## Development & Production

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
npm run start
```
