import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  primary: { fg: "text-green-600", chip: "bg-green-50" },
  secondary: { fg: "text-blue-600", chip: "bg-blue-50" },
  accent: { fg: "text-gold-600", chip: "bg-gold-50" },
  care: { fg: "text-coral-500", chip: "bg-coral-50" },
} as const;

interface ImpactCardProps {
  value: string;
  label: string;
  note?: string;
  icon?: LucideIcon;
  tone?: keyof typeof tones;
  className?: string;
}

/** Impact metric tile — big number + label, used in the annual impact band. */
export function ImpactCard({
  value,
  label,
  note,
  icon: Icon,
  tone = "primary",
  className,
}: ImpactCardProps) {
  const t = tones[tone];
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-8 text-center shadow-sm",
        className,
      )}
    >
      {Icon && (
        <div
          className={cn(
            "mx-auto mb-4 flex size-12 items-center justify-center rounded-md",
            t.chip,
            t.fg,
          )}
        >
          <Icon className="size-[22px]" aria-hidden />
        </div>
      )}
      <p
        className={cn(
          "font-display text-4xl font-extrabold leading-none tracking-tight",
          t.fg,
        )}
      >
        {value}
      </p>
      <p className="mt-2 font-display text-lg font-semibold text-ink">{label}</p>
      {note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}
