import { z } from "zod";
import { DONATION_DESIGNATIONS } from "@/lib/constants";

export const donationCheckoutSchema = z.object({
  amount: z
    .number({ message: "Please choose a donation amount" })
    .min(1, "Donations start at $1")
    .max(100_000, "For gifts over $100,000, please contact us directly"),
  frequency: z.enum(["once", "monthly"]),
  designation: z.enum(DONATION_DESIGNATIONS).optional(),
  donorName: z
    .string()
    .trim()
    .max(120, "That name looks a little long")
    .optional()
    .or(z.literal("")),
  donorEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(500, "Please keep your message under 500 characters")
    .optional()
    .or(z.literal("")),
});

export type DonationCheckoutInput = z.infer<typeof donationCheckoutSchema>;
