"use client";

import { cn } from "@/lib/utils";

export type DonationFrequency = "monthly" | "once";

interface DonationFrequencyToggleProps {
  value: DonationFrequency;
  onChange: (value: DonationFrequency) => void;
}

/** Monthly / one-time segmented toggle. */
export function DonationFrequencyToggle({
  value,
  onChange,
}: DonationFrequencyToggleProps) {
  const options: { id: DonationFrequency; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "once", label: "One-time" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Donation frequency"
      className="flex gap-1 rounded-md bg-muted p-1"
    >
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex-1 rounded-[10px] py-2.5 font-display text-base font-bold transition-all duration-150",
              active
                ? "bg-card text-green-700 shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
