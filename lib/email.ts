import "server-only";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

let resend: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  resend ??= new Resend(key);
  return resend;
}

function getFromAddress(): string {
  // Resend's shared onboarding sender works without domain verification.
  return process.env.EMAIL_FROM ?? "AVCF <onboarding@resend.dev>";
}

/** Admin recipients come from the server-only env var, never the client. */
function getAdminRecipients(): string[] {
  return (process.env.CONTACT_FORM_RECIPIENTS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContactNotification(payload: ContactEmailPayload) {
  const client = getResend();
  const recipients = getAdminRecipients();
  if (!client || recipients.length === 0) {
    console.warn(
      "[email] Skipping admin notification — RESEND_API_KEY or CONTACT_FORM_RECIPIENTS not configured.",
    );
    return;
  }

  const { name, email, phone, subject, message } = payload;
  await client.emails.send({
    from: getFromAddress(),
    to: recipients,
    replyTo: email,
    subject: `[AVCF Contact] ${subject} — ${name}`,
    html: `
      <h2 style="font-family:sans-serif;color:#14532d;">New contact form submission</h2>
      <table style="font-family:sans-serif;color:#334155;border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td style="padding:4px 12px 4px 0;"><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>` : ""}
        <tr><td style="padding:4px 12px 4px 0;"><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <p style="font-family:sans-serif;color:#334155;white-space:pre-wrap;border-left:3px solid #22c55e;padding-left:12px;">${escapeHtml(message)}</p>
    `,
  });
}

export async function sendContactConfirmation(payload: ContactEmailPayload) {
  const client = getResend();
  if (!client || process.env.CONTACT_SEND_CONFIRMATION !== "true") return;

  await client.emails.send({
    from: getFromAddress(),
    to: payload.email,
    subject: `Thank you for reaching out to ${SITE.shortName}`,
    html: `
      <p style="font-family:sans-serif;color:#334155;">Hi ${escapeHtml(payload.name)},</p>
      <p style="font-family:sans-serif;color:#334155;">
        Thank you for getting in touch with the ${SITE.name}. We've received your
        message about “${escapeHtml(payload.subject)}” and will reply within a few days.
      </p>
      <p style="font-family:sans-serif;color:#334155;">
        With gratitude,<br/>The AVCF team
      </p>
    `,
  });
}
