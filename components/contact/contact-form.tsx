"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const topics = [
  "Volunteering",
  "Donations & giving",
  "Fundraising & events",
  "Partnerships",
  "Something else",
] as const;

/** Contact form — UI only. TODO: wire to an email service or route handler. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center shadow-md">
        <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Check className="size-8" aria-hidden />
        </span>
        <h2 className="font-display text-2xl font-bold text-ink">Thank you!</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          Your message is on its way. We&apos;d love to hear from you, and we&apos;ll
          reply within a few days.
        </p>
        <Button
          className="mt-6 rounded-full font-display font-semibold"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-border bg-card p-7 shadow-md md:p-9"
      aria-label="Contact form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-first-name">First name</Label>
          <Input
            id="contact-first-name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-last-name">Last name</Label>
          <Input
            id="contact-last-name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            required
          />
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
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="contact-topic">What can we help with?</Label>
        <Select defaultValue={topics[0]}>
          <SelectTrigger id="contact-topic" className="w-full rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="contact-message">Your message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="I'd love to help because…"
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-7 h-12 w-full rounded-full font-display text-base font-semibold"
      >
        Send message
        <ArrowRight className="size-5" aria-hidden />
      </Button>
    </form>
  );
}
