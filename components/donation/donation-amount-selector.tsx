"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DONATION_AMOUNTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DonationAmountSelectorProps {
  amount: number | null;
  customAmount: string;
  onSelect: (amount: number) => void;
  onCustomChange: (value: string) => void;
}

/** Suggested amount grid plus custom amount input. */
export function DonationAmountSelector({
  amount,
  customAmount,
  onSelect,
  onCustomChange,
}: DonationAmountSelectorProps) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Donation amount"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {DONATION_AMOUNTS.map((value) => {
          const active = amount === value && customAmount === "";
          return (
            <motion.button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(value)}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className={cn(
                "rounded-md border-[1.5px] py-3.5 font-display text-lg font-bold transition-colors duration-150",
                active
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-input bg-card text-foreground hover:border-green-300",
              )}
            >
              ${value}
            </motion.button>
          );
        })}
      </div>
      <div className="relative mt-3">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-muted-foreground"
          aria-hidden
        >
          $
        </span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          aria-label="Custom donation amount in dollars"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value)}
          className={cn(
            "h-12 w-full rounded-md border-[1.5px] bg-card pl-9 pr-4 font-display text-lg font-bold text-foreground outline-none transition-colors placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring",
            customAmount !== ""
              ? "border-green-500 bg-green-50"
              : "border-input hover:border-green-300",
          )}
        />
      </div>
    </div>
  );
}
