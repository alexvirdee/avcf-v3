"use server";

import { connectDB } from "@/lib/db";
import { sendContactConfirmation, sendContactNotification } from "@/lib/email";
import { contactFormSchema } from "@/lib/validations/contact";
import { ContactSubmission } from "@/models/ContactSubmission";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    // A filled honeypot is a bot — pretend everything went fine.
    if (fieldErrors.company) return { status: "success" };
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const { name, email, phone, subject, message } = parsed.data;

  try {
    await connectDB();
    await ContactSubmission.create({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });
  } catch (error) {
    console.error("[contact] Failed to save submission:", error);
    return {
      status: "error",
      message:
        "We couldn't send your message right now. Please try again, or email us directly.",
    };
  }

  // Email failures shouldn't fail the submission — it's already saved.
  const payload = { name, email, phone: phone || undefined, subject, message };
  const results = await Promise.allSettled([
    sendContactNotification(payload),
    sendContactConfirmation(payload),
  ]);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[contact] Email send failed:", result.reason);
    }
  }

  return { status: "success" };
}
