import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logo file in `public/` — swap filename if you add e.g. `logo.svg`. */
export const SITE_LOGO_PATH = "/icon.png";

type SiteLogoProps = {
  className?: string;
  /** Pixel size (width & height); logo is assumed square. */
  size?: number;
  priority?: boolean;
};

export function SiteLogo({
  className,
  size = 40,
  priority = false,
}: SiteLogoProps) {
  return (
    <Image
      src={SITE_LOGO_PATH}
      alt="HabiMate"
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 object-contain", className)}
      sizes={`${size}px`}
    />
  );
}
