import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { PHOTOS } from "@/lib/assets";

/** Photographic donate CTA panel with the deep-green brand gradient. */
export function DonationCallout() {
  return (
    <section className="py-20 md:py-28" aria-label="Donate">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <div className="relative grid items-center gap-8 overflow-hidden rounded-2xl p-10 shadow-green md:grid-cols-[1.4fr_1fr] md:p-14">
            <Image
              src={PHOTOS.donors}
              alt=""
              fill
              sizes="(min-width: 768px) 1200px, 100vw"
              className="object-cover"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-green-800/45"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl text-white md:text-[2.875rem] md:leading-[1.1]">
                Your gift today becomes a child&apos;s tomorrow.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">
                Just $25 provides a month of meals and learning materials. Give
                once, or join as a monthly partner.
              </p>
            </div>
            <div className="relative flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-white font-display text-base font-semibold text-green-700 shadow-md hover:bg-white/90"
              >
                <Link href="/donate">
                  <Heart className="size-5" aria-hidden />
                  Support the mission
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/45 bg-transparent font-display text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Volunteer your time</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
