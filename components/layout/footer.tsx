import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/constants";

const columns = [
  {
    heading: "Foundation",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our mission", href: "/mission" },
      { label: "Programs", href: "/programs" },
      { label: "Prayas Schools", href: "/about#prayas" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/contact" },
      { label: "Fundraise", href: "/contact" },
      { label: "Partner with us", href: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-8 pt-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onDark size="lg" />
            <p className="mt-5 max-w-xs leading-relaxed text-white/70">
              Helping children succeed through compassion, opportunity, and
              community. In loving memory of Avtar Virdee.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="mb-4 font-display text-base font-bold tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="mb-4 font-display text-base font-bold tracking-wide text-white">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-white/70">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0" aria-hidden />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Registered charity.
          </p>
          <p>Privacy · Terms · Cookie policy</p>
        </div>
      </div>
    </footer>
  );
}
