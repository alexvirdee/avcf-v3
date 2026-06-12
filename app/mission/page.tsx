import type { Metadata } from "next";
import {
  Eye,
  GraduationCap,
  HandHeart,
  Heart,
  Lightbulb,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { DonationCallout } from "@/components/sections/donation-callout";
import { ImpactMetrics } from "@/components/sections/impact-metrics";
import { ImpactSection } from "@/components/sections/impact-section";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mission & Values",
  description:
    "AVCF's mission, values, and areas of impact — creating brighter futures through education, opportunity and community support.",
};

const values = [
  { icon: Heart, tone: "care", title: "Compassion", description: "We lead with kindness — every child is treated with dignity and warmth." },
  { icon: Lightbulb, tone: "accent", title: "Hope", description: "We see potential, not limitation, in every child we serve." },
  { icon: Sprout, tone: "primary", title: "Opportunity", description: "We open real pathways — education, skills and support that last." },
  { icon: ShieldCheck, tone: "secondary", title: "Trust", description: "100% of public donations go directly to the children." },
  { icon: Users, tone: "primary", title: "Community", description: "Families, volunteers and donors working as one team." },
  { icon: GraduationCap, tone: "secondary", title: "Education", description: "Learning is the foundation of every brighter future." },
  { icon: HandHeart, tone: "accent", title: "Generosity", description: "Small acts of generosity can create lifelong change." },
  { icon: Eye, tone: "care", title: "Long-term impact", description: "We invest in outcomes that outlast any single gift." },
] as const;

const valueTones = {
  primary: "bg-green-50 text-green-600",
  secondary: "bg-blue-50 text-blue-600",
  accent: "bg-gold-50 text-gold-600",
  care: "bg-coral-50 text-coral-500",
} as const;

export default function MissionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mission & values"
        title="Brightening futures, one child at a time"
        description={SITE.mission}
      />

      {/* Values grid */}
      <section className="py-12 md:py-16" aria-label="Our values">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="What guides us"
              title="The values behind every decision"
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                  <span
                    className={cn(
                      "mb-4 flex size-11 items-center justify-center rounded-md",
                      valueTones[value.tone],
                    )}
                  >
                    <value.icon className="size-[22px]" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-normal text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ImpactSection />
      <ImpactMetrics />
      <DonationCallout />
    </>
  );
}
