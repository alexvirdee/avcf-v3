"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function Navbar() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 12,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-ivory/85 backdrop-blur-md backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="AVCF home" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-display text-base font-semibold transition-colors hover:text-green-700",
                pathname === link.href ? "text-green-700" : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="rounded-full font-display font-semibold">
            <Link href="/donate">
              <Heart className="size-4" aria-hidden />
              Donate
            </Link>
          </Button>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-ivory px-5 pb-6 pt-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-3 py-3 font-display text-lg font-semibold",
                    pathname === link.href
                      ? "bg-green-50 text-green-700"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            size="lg"
            className="mt-4 w-full rounded-full font-display font-semibold"
          >
            <Link href="/donate" onClick={() => setOpen(false)}>
              <Heart className="size-4" aria-hidden />
              Donate
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
