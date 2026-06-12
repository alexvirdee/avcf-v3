import type { Metadata } from "next";
import Link from "next/link";
import { Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your gift to the Avtar Virdee Children's Foundation.",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

/**
 * Friendly confirmation only — the Stripe webhook is the source of truth for
 * payment status. We retrieve the session purely to personalize the message.
 */
async function getSessionSummary(sessionId: string | undefined) {
  if (!sessionId || !isStripeConfigured()) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return {
      amount:
        session.amount_total != null
          ? `$${(session.amount_total / 100).toLocaleString("en-US")}`
          : null,
      monthly: session.mode === "subscription",
      name:
        session.metadata?.donorName ||
        session.customer_details?.name ||
        null,
    };
  } catch {
    return null;
  }
}

export default async function DonateSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;
  const summary = await getSessionSummary(session_id);
  const firstName = summary?.name?.split(" ")[0];

  return (
    <section className="px-6 py-20 md:py-28" aria-label="Donation received">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-10 text-center shadow-md md:p-12">
        <span className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Check className="size-10" aria-hidden />
        </span>
        <h1 className="text-3xl md:text-4xl">
          Thank you{firstName ? `, ${firstName}` : ""}!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {summary?.amount ? (
            <>
              Your {summary.monthly ? "monthly " : ""}gift of{" "}
              <strong className="text-ink">{summary.amount}</strong> is on its
              way to the children of Prayas Schools.
            </>
          ) : (
            <>Your gift is on its way to the children of Prayas Schools.</>
          )}{" "}
          A receipt will arrive in your inbox once your payment is confirmed.
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Heart className="size-4 text-green-600" aria-hidden />
          100% of your gift goes directly to the children.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full font-display font-semibold">
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full font-display font-semibold"
          >
            <Link href="/blog">Read our stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
