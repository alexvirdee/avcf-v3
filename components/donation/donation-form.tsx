"use client";

import { useState } from "react";
import { ArrowRight, Heart, Lock, ShieldCheck } from "lucide-react";
import { DonationAmountSelector } from "@/components/donation/donation-amount-selector";
import {
  DonationFrequencyToggle,
  type DonationFrequency,
} from "@/components/donation/donation-frequency-toggle";
import { DonorInfoForm } from "@/components/donation/donor-info-form";
import { Button } from "@/components/ui/button";
import { impactForAmount } from "@/lib/constants";

/**
 * Donation form — UI only, no payments are processed yet.
 *
 * TODO(donations): connect a real donation flow here. Preferred options:
 *  - Stripe Checkout: POST amount/frequency to a route handler that creates a
 *    Checkout Session (mode: "payment" | "subscription") and redirect to it.
 *  - Stripe Payment Element: replace the submit handler with Elements +
 *    confirmPayment, keeping this layout.
 *  - Donorbox / Givebutter: swap the form body for their embed, or deep-link
 *    with amount + recurring params.
 *  - PayPal Giving Fund: add as a secondary payment option.
 */
export function DonationForm() {
  const [frequency, setFrequency] = useState<DonationFrequency>("monthly");
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");

  const parsedCustom = Number.parseFloat(customAmount);
  const effectiveAmount =
    customAmount !== "" && Number.isFinite(parsedCustom) && parsedCustom > 0
      ? parsedCustom
      : (amount ?? 0);
  const impact = impactForAmount(effectiveAmount);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO(donations): create the payment session here (see options above).
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-7 shadow-md md:p-9"
      aria-label="Donation form"
    >
      <h2 className="mb-6 font-display text-2xl font-bold text-ink">
        Make your donation
      </h2>

      <div className="mb-6">
        <DonationFrequencyToggle value={frequency} onChange={setFrequency} />
      </div>

      <fieldset className="mb-6">
        <legend className="mb-3 font-display text-sm font-semibold text-ink">
          Choose an amount
        </legend>
        <DonationAmountSelector
          amount={amount}
          customAmount={customAmount}
          onSelect={(value) => {
            setAmount(value);
            setCustomAmount("");
          }}
          onCustomChange={setCustomAmount}
        />
      </fieldset>

      <p
        className="mb-6 flex items-center gap-2.5 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700"
        aria-live="polite"
      >
        <Heart className="size-4 shrink-0" aria-hidden />
        <span>
          Your {frequency === "monthly" ? "monthly " : ""}gift provides {impact}.
        </span>
      </p>

      <DonorInfoForm />

      <Button
        type="submit"
        size="lg"
        className="mt-8 h-12 w-full rounded-full font-display text-base font-semibold"
      >
        {/* Placeholder — payments are not connected yet */}
        Continue to donation
        <ArrowRight className="size-5" aria-hidden />
      </Button>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5" aria-hidden />
          Secure payment
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" aria-hidden />
          Tax-deductible
        </span>
        <span>Cancel anytime</span>
      </div>
    </form>
  );
}
