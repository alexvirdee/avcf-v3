import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { VOLUNTEER_ROLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-green-50 text-green-600",
  accent: "bg-gold-50 text-gold-600",
  care: "bg-coral-50 text-coral-500",
} as const;

/** Get involved — volunteer roles and CTA. */
export function VolunteerCallout() {
  return (
    <section className="py-20 md:py-28" aria-label="Volunteer">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Get involved"
            tone="accent"
            title="Give your time. Change a life."
            description="Volunteers are the heart of AVCF — Avtar Virdee's own grandchildren volunteer their time to keep the foundation running. Whether you have an hour a week or a weekend a month, there's a place for you."
          />
          <div className="mt-8 flex items-center gap-2.5 text-muted-foreground">
            <Users className="size-5 text-green-600" aria-hidden />
            <p>
              Join <span className="font-semibold text-ink">240+</span> active
              volunteers worldwide
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-full px-8 font-display text-base font-semibold"
          >
            <Link href="/contact">
              Become a volunteer
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </Reveal>

        <Stagger className="flex flex-col gap-4">
          {VOLUNTEER_ROLES.map((role) => (
            <StaggerItem key={role.title}>
              <div className="flex items-center gap-5 rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-md",
                    tones[role.tone],
                  )}
                >
                  <role.icon className="size-[22px]" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
