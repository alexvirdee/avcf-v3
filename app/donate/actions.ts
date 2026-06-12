"use server";

import { connectDB } from "@/lib/db";
import { getSiteUrl, getStripe, isStripeConfigured } from "@/lib/stripe";
import { donationCheckoutSchema } from "@/lib/validations/donation";
import { Donation } from "@/models/Donation";

export interface CheckoutResult {
  url?: string;
  error?: string;
}

/**
 * Creates a Stripe Checkout session server-side and records the donation as
 * `pending` in MongoDB. The Stripe webhook (app/api/webhooks/stripe) is the
 * source of truth that marks it completed/failed/canceled — never the
 * success page.
 */
export async function createDonationCheckout(
  input: unknown,
): Promise<CheckoutResult> {
  const parsed = donationCheckoutSchema.safeParse(input);
  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Please check your donation details and try again.",
    };
  }

  if (!isStripeConfigured()) {
    return {
      error:
        "Online donations aren't quite ready yet. Please contact us to give directly — we'd love to hear from you.",
    };
  }

  const { amount, frequency, designation, donorName, donorEmail, message } =
    parsed.data;
  const amountCents = Math.round(amount * 100);
  const siteUrl = getSiteUrl();
  const monthly = frequency === "monthly";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: monthly ? "subscription" : "payment",
      ...(monthly ? {} : { submit_type: "donate" }),
      customer_email: donorEmail || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            ...(monthly ? { recurring: { interval: "month" as const } } : {}),
            product_data: {
              name: monthly ? "Monthly gift to AVCF" : "Donation to AVCF",
              description: designation
                ? `Designation: ${designation}`
                : "Supporting the children of Prayas Schools",
            },
          },
        },
      ],
      metadata: {
        designation: designation ?? "",
        donorName: donorName ?? "",
      },
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate/cancel`,
    });

    if (!session.url) {
      return { error: "We couldn't start the checkout. Please try again." };
    }

    await connectDB();
    await Donation.create({
      amountCents,
      currency: "usd",
      frequency,
      designation,
      donorName: donorName || undefined,
      donorEmail: donorEmail || undefined,
      message: message || undefined,
      status: "pending",
      stripeSessionId: session.id,
    });

    return { url: session.url };
  } catch (error) {
    console.error("[donate] Failed to create checkout session:", error);
    return {
      error:
        "We couldn't start the donation right now. Please try again in a moment.",
    };
  }
}
