import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion";
import { VolunteerCallout } from "@/components/sections/volunteer-callout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Avtar Virdee Children's Foundation — donors, volunteers and partners alike.",
};

export default function ContactPage() {
  const contactItems = [
    {
      icon: Mail,
      title: "Email us",
      line: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: Phone,
      title: "Call us",
      line: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Find us",
      line: SITE.location,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a human"
        description="We'd love to hear from you — donors, volunteers and partners alike. We usually reply within a few days."
      />

      <section className="pb-20 md:pb-28" aria-label="Contact details and form">
        <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-6 md:grid-cols-[1fr_1.2fr] md:gap-14 md:px-8">
          <Reveal className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-5 rounded-lg border border-border bg-card p-5 shadow-sm"
              >
                <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <item.icon className="size-[22px]" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-ink">
                    {item.title}
                  </h2>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-green-700"
                    >
                      {item.line}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.line}</p>
                  )}
                </div>
              </div>
            ))}
            <p className="mt-2 rounded-lg bg-green-50 p-5 text-sm leading-relaxed text-green-800">
              Asking about volunteering? Many of our roles are remote — tutoring
              online, fundraising in your own community, or lending professional
              skills like design and admin.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <VolunteerCallout />
    </>
  );
}
