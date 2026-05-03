import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logo file in `public/` — swap filename if you add e.g. `logo.svg`. */
export const SITE_LOGO_PATH = "/icon.png";

type SiteLogoProps = {
  className?: string;
  /** Pixel size (width & height); logo is assumed square. */
  size?: number;
  priority?: boolean;
  /**
   * Use when the logo is adjacent to the same visible text (“HabiMate”) so SRs
   * are not given redundant labels (see Lighthouse redundant-alt guidance).
   */
  decorative?: boolean;
  /** Ignored when `decorative`; default readable name otherwise. */
  alt?: string;
};

export function SiteLogo({
  className,
  size = 40,
  priority = false,
  decorative = false,
  alt = "HabiMate",
}: SiteLogoProps) {
  return (
    <Image
      src={SITE_LOGO_PATH}
      alt={decorative ? "" : alt}
      width={size}
      height={size}
      priority={priority}
      aria-hidden={decorative ? true : undefined}
      className={cn("shrink-0 object-contain", className)}
      sizes={`${size}px`}
    />
  );
}
