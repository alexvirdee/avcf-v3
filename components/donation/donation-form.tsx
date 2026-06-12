"use client";

import { useState, useTransition } from "react";
import {
  ArrowRight,
  CircleAlert,
  Heart,
  LoaderCircle,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { createDonationCheckout } from "@/app/donate/actions";
import { DonationAmountSelector } from "@/components/donation/donation-amount-selector";
import {
  DonationFrequencyToggle,
  type DonationFrequency,
} from "@/components/donation/donation-frequency-toggle";
import { DonorInfoForm } from "@/components/donation/donor-info-form";
import { Button } from "@/components/ui/button";
import { impactForAmount } from "@/lib/constants";

/**
 * Donation form — creates a Stripe Checkout session server-side and redirects.
 * The webhook at /api/webhooks/stripe is the source of truth for completion.
 */
export function DonationForm() {
  const [frequency, setFrequency] = useState<DonationFrequency>("monthly");
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const parsedCustom = Number.parseFloat(customAmount);
  const effectiveAmount =
    customAmount !== "" && Number.isFinite(parsedCustom) && parsedCustom > 0
      ? parsedCustom
      : (amount ?? 0);
  const impact = impactForAmount(effectiveAmount);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createDonationCheckout({
        amount: effectiveAmount,
        frequency,
        designation: formData.get("designation") || undefined,
        donorName: formData.get("donorName") ?? "",
        donorEmail: formData.get("donorEmail") ?? "",
        message: formData.get("message") ?? "",
      });
      if (result.url) {
        window.location.assign(result.url);
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
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

      {error && (
        <p
          role="alert"
          className="mb-6 flex items-center gap-2.5 rounded-md bg-coral-50 px-4 py-3 text-sm font-medium text-coral-700"
        >
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}

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
        disabled={pending || effectiveAmount < 1}
        className="mt-8 h-12 w-full rounded-full font-display text-base font-semibold"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden />
            Opening secure checkout…
          </>
        ) : (
          <>
            {frequency === "monthly"
              ? `Give $${effectiveAmount || 0}/month`
              : `Donate $${effectiveAmount || 0}`}
            <ArrowRight className="size-5" aria-hidden />
          </>
        )}
      </Button>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5" aria-hidden />
          Secure checkout by Stripe
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
