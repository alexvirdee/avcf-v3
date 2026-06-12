import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/constants";
import { cn } from "@/lib/utils";

const categoryTones = {
  primary: "bg-green-50 text-green-700",
  secondary: "bg-blue-50 text-blue-700",
  accent: "bg-gold-50 text-gold-700",
  care: "bg-coral-50 text-coral-600",
} as const;

const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Fundraising cause card — photo, category badge, progress meter and donate CTA. */
export function CauseCard({ program, className }: { program: Program; className?: string }) {
  const pct = Math.min(100, Math.round((program.raised / program.goal) * 100));
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 font-display text-sm font-semibold",
            categoryTones[program.tone],
          )}
        >
          {program.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-ink">{program.title}</h3>
        <p className="mt-2 flex-1 leading-normal text-muted-foreground">
          {program.description}
        </p>

        <div className="mt-6">
          <div
            className="h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${formatUsd(program.raised)} raised of ${formatUsd(program.goal)} goal`}
          >
            <div
              className="h-full rounded-full bg-green-500 transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <p className="font-mono text-sm font-semibold text-ink">
              {formatUsd(program.raised)}{" "}
              <span className="font-sans font-normal text-muted-foreground">raised</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {pct}% of {formatUsd(program.goal)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-ink">{program.donors}</span> donors
          </p>
          <Button asChild size="sm" className="rounded-full font-display font-semibold">
            <Link href="/donate">
              <Heart className="size-3.5" aria-hidden />
              Donate
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
