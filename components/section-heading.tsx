import { cn } from "@/lib/utils";

const eyebrowTones = {
  primary: "text-green-600",
  secondary: "text-blue-600",
  accent: "text-gold-600",
  care: "text-coral-500",
} as const;

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: keyof typeof eyebrowTones;
  light?: boolean;
  className?: string;
}

/** Standard eyebrow + title + description lockup that opens every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "primary",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", light ? "text-green-300" : eyebrowTones[tone])}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-[2.875rem] md:leading-[1.1]",
          light && "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-lg leading-relaxed",
            light ? "text-white/80" : "text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
