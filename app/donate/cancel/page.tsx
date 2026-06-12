import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Donation canceled",
  description: "Your donation was not completed — no payment was taken.",
};

export default function DonateCancelPage() {
  return (
    <section className="px-6 py-20 md:py-28" aria-label="Donation canceled">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-10 text-center shadow-md md:p-12">
        <span className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <HandHeart className="size-10" aria-hidden />
        </span>
        <h1 className="text-3xl md:text-4xl">No worries at all</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Your donation was canceled and no payment was taken. Whenever
          you&apos;re ready, the children of Prayas Schools will be here — and
          so will we.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full font-display font-semibold">
            <Link href="/donate">
              Try again
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full font-display font-semibold"
          >
            <Link href="/contact">Talk to us instead</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
