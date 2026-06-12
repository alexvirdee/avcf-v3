import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, maxlength: 40 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
    },
  },
  { timestamps: true },
);

export type ContactSubmissionDoc = InferSchemaType<typeof contactSubmissionSchema>;

export const ContactSubmission: Model<ContactSubmissionDoc> =
  mongoose.models.ContactSubmission ??
  mongoose.model("ContactSubmission", contactSubmissionSchema);
