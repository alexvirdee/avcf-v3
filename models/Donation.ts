import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * A donation attempt. Created as `pending` when the Stripe Checkout session is
 * created; the Stripe webhook is the source of truth that moves it to
 * `completed`, `failed`, or `canceled`.
 */
const donationSchema = new Schema(
  {
    amountCents: { type: Number, required: true, min: 100 },
    currency: { type: String, default: "usd" },
    frequency: { type: String, enum: ["once", "monthly"], required: true },
    designation: { type: String, trim: true, maxlength: 100 },
    donorName: { type: String, trim: true, maxlength: 120 },
    donorEmail: { type: String, trim: true, lowercase: true },
    message: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "canceled"],
      default: "pending",
      index: true,
    },
    stripeSessionId: { type: String, required: true, unique: true },
    stripePaymentIntentId: { type: String },
    stripeSubscriptionId: { type: String },
  },
  { timestamps: true },
);

export type DonationDoc = InferSchemaType<typeof donationSchema>;

export const Donation: Model<DonationDoc> =
  mongoose.models.Donation ?? mongoose.model("Donation", donationSchema);
