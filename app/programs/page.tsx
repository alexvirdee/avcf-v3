import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { CauseCard } from "@/components/cards/cause-card";
import { PageHeader } from "@/components/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { DonationCallout } from "@/components/sections/donation-callout";
import { ImpactSection } from "@/components/sections/impact-section";
import { VolunteerCallout } from "@/components/sections/volunteer-callout";
import { EVENTS, PROGRAMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "AVCF's programs and initiatives — active causes supporting the children of Prayas Schools in India.",
};

const eventTones = {
  primary: "bg-green-50 text-green-700",
  accent: "bg-gold-50 text-gold-700",
} as const;

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs & initiatives"
        title="Give to a cause close to your heart"
        description="100% of your gift goes directly to the children of Prayas Schools in India — for education, meals, health and care."
      />

      {/* Active causes */}
      <section className="pb-20 md:pb-28" aria-label="Active causes">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <Stagger className="grid gap-6 md:grid-cols-3">
            {PROGRAMS.map((program) => (
              <StaggerItem key={program.title}>
                <CauseCard program={program} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ImpactSection />

      {/* Upcoming events */}
      <section className="py-20 md:py-28" aria-label="Upcoming events">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Upcoming events" title="Come be part of it" />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {EVENTS.map((event) => (
              <StaggerItem key={event.title}>
                <article className="flex h-full items-start gap-6 rounded-lg border border-border bg-card p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className={cn(
                      "flex size-[72px] shrink-0 flex-col items-center justify-center rounded-lg font-display",
                      eventTones[event.tone],
                    )}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {event.month}
                    </span>
                    <span className="text-3xl font-extrabold leading-none">
                      {event.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 leading-normal text-muted-foreground">
                      {event.description}
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden />
                        {event.location}
                      </span>
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <VolunteerCallout />
      <DonationCallout />
    </>
  );
}
