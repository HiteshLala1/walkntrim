import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  preload?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "h-7 w-auto sm:h-8",
  md: "h-8 w-auto sm:h-10",
  lg: "h-10 w-auto sm:h-12",
} as const;

export function BrandLogo({
  size = "md",
  preload = false,
  className = "",
}: BrandLogoProps) {
  return (
    <Image
      src={siteConfig.brand.logoPath}
      alt={`${siteConfig.brand.officialName} — ${siteConfig.brand.businessType}`}
      width={455}
      height={119}
      preload={preload}
      className={`${SIZE_CLASSES[size]} select-none object-contain ${className}`}
    />
  );
}
