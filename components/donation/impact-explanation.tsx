import { Heart } from "lucide-react";
import { IMPACT_TIERS } from "@/lib/constants";

/** "What your gift provides" cards shown alongside the donation form. */
export function ImpactExplanation() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {IMPACT_TIERS.map((tier) => (
        <div
          key={tier.amount}
          className="flex items-start gap-3.5 rounded-lg border border-border bg-card p-4 shadow-xs"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Heart className="size-4" aria-hidden />
          </span>
          <div>
            <p className="font-display text-lg font-extrabold leading-tight text-green-700">
              ${tier.amount}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
              provides {tier.impact}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
