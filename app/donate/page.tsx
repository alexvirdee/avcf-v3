import type { Metadata } from "next";
import Image from "next/image";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/badge";
import { DonationForm } from "@/components/donation/donation-form";
import { ImpactExplanation } from "@/components/donation/impact-explanation";
import { Reveal } from "@/components/motion";
import { FaqSection } from "@/components/sections/faq-section";
import { PHOTOS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support the mission — every gift goes directly to the children of Prayas Schools for education, meals, health and care.",
};

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "100% to the children",
    description:
      "Public donations fund the children directly. The foundation's running costs are covered by the Virdee family.",
  },
  {
    icon: Lock,
    title: "Secure & private",
    description:
      "Payments will be processed by a trusted provider. We never store card details ourselves.",
  },
  {
    icon: Sparkles,
    title: "You'll see the impact",
    description:
      "Donors receive photo updates and the annual report — what was raised, and what changed for the children.",
  },
] as const;

export default function DonatePage() {
  return (
    <>
      <section className="py-14 md:py-20" aria-label="Donate">
        <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-6 md:grid-cols-[1fr_1.05fr] md:gap-14 md:px-8">
          {/* Left — context */}
          <Reveal className="md:sticky md:top-24">
            <Badge>Educate Children · Prayas Schools</Badge>
            <h1 className="mt-5 text-4xl md:text-[2.875rem] md:leading-[1.1]">
              Help a child learn and thrive
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every gift goes directly to the children of Prayas Schools — for
              education, meals, health and care.
            </p>
            <div className="my-7 aspect-[16/10] overflow-hidden rounded-xl shadow-md">
              <Image
                src={PHOTOS.classroom}
                alt="A child learning at a Prayas school"
                width={960}
                height={600}
                priority
                className="size-full object-cover"
              />
            </div>
            <ImpactExplanation />
          </Reveal>

          {/* Right — the form */}
          <Reveal delay={0.15}>
            <DonationForm />
          </Reveal>
        </div>
      </section>

      {/* Trust & security */}
      <section className="bg-ivory-deep py-16 md:py-20" aria-label="Why give with confidence">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {trustPoints.map((point) => (
              <Reveal key={point.title}>
                <div className="flex h-full items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-sm">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-green-50 text-green-600">
                    <point.icon className="size-[22px]" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-bold text-ink">
                      {point.title}
                    </h2>
                    <p className="mt-1 text-sm leading-normal text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
