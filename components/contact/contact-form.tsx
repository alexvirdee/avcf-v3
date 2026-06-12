"use client";

import { useActionState } from "react";
import { ArrowRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const subjects = [
  "Volunteering",
  "Donations & giving",
  "Fundraising & events",
  "Partnerships",
  "Something else",
] as const;

const initialState: ContactFormState = { status: "idle" };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="text-sm font-medium text-coral-600">{errors[0]}</p>;
}

/** Contact form — validates with Zod server-side, saves to MongoDB, notifies AVCF admins. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );
  const errors = state.fieldErrors;

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center shadow-md">
        <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Check className="size-8" aria-hidden />
        </span>
        <h2 className="font-display text-2xl font-bold text-ink">Thank you!</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          Your message is on its way. We&apos;d love to hear from you, and
          we&apos;ll reply within a few days.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-xl border border-border bg-card p-7 shadow-md md:p-9"
      aria-label="Contact form"
    >
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mb-6 flex items-center gap-2.5 rounded-md bg-coral-50 px-4 py-3 text-sm font-medium text-coral-700"
        >
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      )}

      {/* Honeypot — hidden from humans, bots fill it in. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            required
            aria-invalid={Boolean(errors?.name)}
          />
          <FieldError errors={errors?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">
            Phone <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44 7700 900000"
            aria-invalid={Boolean(errors?.phone)}
          />
          <FieldError errors={errors?.phone} />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@email.com"
          required
          aria-invalid={Boolean(errors?.email)}
        />
        <FieldError errors={errors?.email} />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue={subjects[0]}
          aria-invalid={Boolean(errors?.subject)}
          className={cn(
            "border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          )}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <FieldError errors={errors?.subject} />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="contact-message">Your message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="I'd love to help because…"
          required
          aria-invalid={Boolean(errors?.message)}
        />
        <FieldError errors={errors?.message} />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-7 h-12 w-full rounded-full font-display text-base font-semibold"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="size-5" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
