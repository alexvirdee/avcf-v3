import Image from "next/image";
import { LOGOS } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Use the white mark + light text on dark surfaces (e.g. the footer). */
  onDark?: boolean;
  size?: "md" | "lg";
  className?: string;
}

/**
 * AVCF primary lockup — the 2026 elephant-A mark with the AVCF wordmark.
 * Mark clear space = the ear's diameter; minimum mark width 20px.
 */
export function Logo({ onDark = false, size = "md", className }: LogoProps) {
  const markSize = size === "lg" ? 52 : 42;
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={onDark ? LOGOS.markWhite : LOGOS.mark}
        alt=""
        aria-hidden
        width={markSize}
        height={markSize}
        priority={!onDark}
      />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display font-extrabold leading-none tracking-[-0.02em]",
            size === "lg" ? "text-[26px]" : "text-[22px]",
            onDark ? "text-white" : "text-ink",
          )}
        >
          AVCF
        </span>
        <span
          className={cn(
            "mt-1 font-sans font-semibold uppercase tracking-[0.18em]",
            size === "lg" ? "text-[7.5px]" : "text-[6.5px]",
            onDark ? "text-green-300" : "text-green-600",
          )}
        >
          Avtar Virdee Children&apos;s Foundation
        </span>
      </span>
    </span>
  );
}
