import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  primary: { fg: "text-green-600", chip: "bg-green-50" },
  secondary: { fg: "text-blue-600", chip: "bg-blue-50" },
  accent: { fg: "text-gold-600", chip: "bg-gold-50" },
  care: { fg: "text-coral-500", chip: "bg-coral-50" },
} as const;

interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: keyof typeof tones;
  linkLabel?: string;
  className?: string;
}

/** Area-of-impact card — icon chip, title, description. Lifts gently on hover. */
export function ProgramCard({
  icon: Icon,
  title,
  description,
  tone = "primary",
  linkLabel,
  className,
}: ProgramCardProps) {
  const t = tones[tone];
  return (
    <div
      className={cn(
        "group rounded-lg border border-border bg-card p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "mb-6 flex size-14 items-center justify-center rounded-lg",
          t.chip,
          t.fg,
        )}
      >
        <Icon className="size-7" aria-hidden />
      </div>
      <h3 className="mb-2 font-display text-xl font-bold text-ink">{title}</h3>
      <p className="leading-normal text-muted-foreground">{description}</p>
      {linkLabel && (
        <p
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 font-display text-base font-semibold",
            t.fg,
          )}
        >
          {linkLabel}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </p>
      )}
    </div>
  );
}
