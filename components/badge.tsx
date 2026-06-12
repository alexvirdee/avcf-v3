import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pill badge with the brand dot, used as a page/category marker. */
export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-1.5 font-display text-sm font-semibold text-green-700",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-green-500" aria-hidden />
      {children}
    </span>
  );
}
