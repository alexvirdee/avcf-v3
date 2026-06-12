import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { Donation } from "@/models/Donation";

export const runtime = "nodejs";

/**
 * Stripe webhook — the single source of truth for donation status.
 * Configure the endpoint in Stripe for these events:
 *   checkout.session.completed
 *   checkout.session.async_payment_succeeded
 *   checkout.session.async_payment_failed
 *   checkout.session.expired
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("[stripe-webhook] Signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Async payment methods stay pending until async_payment_succeeded.
      if (session.payment_status === "paid") {
        await updateDonation(session, "completed");
      }
      break;
    }
    case "checkout.session.async_payment_succeeded":
      await updateDonation(event.data.object, "completed");
      break;
    case "checkout.session.async_payment_failed":
      await updateDonation(event.data.object, "failed");
      break;
    case "checkout.session.expired":
      await updateDonation(event.data.object, "canceled");
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function updateDonation(
  session: Stripe.Checkout.Session,
  status: "completed" | "failed" | "canceled",
) {
  try {
    await connectDB();
    const result = await Donation.findOneAndUpdate(
      { stripeSessionId: session.id },
      {
        status,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
        stripeSubscriptionId:
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id,
        // Backfill donor details Stripe collected during checkout.
        ...(session.customer_details?.email
          ? { donorEmail: session.customer_details.email }
          : {}),
      },
    );
    if (!result) {
      console.warn(
        `[stripe-webhook] No donation found for session ${session.id}`,
      );
    }
  } catch (error) {
    console.error("[stripe-webhook] Failed to update donation:", error);
    // Rethrow so Stripe retries the delivery.
    throw error;
  }
}
