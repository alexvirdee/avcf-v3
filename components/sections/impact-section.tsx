import { ProgramCard } from "@/components/cards/program-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { IMPACT_AREAS } from "@/lib/constants";

/** Areas of impact — four pillar cards on the sunken ivory surface. */
export function ImpactSection() {
  return (
    <section className="bg-ivory-deep py-20 md:py-28" aria-label="Areas of impact">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Areas of impact"
            title="Where your support goes furthest"
            description="Every program is chosen to give children a real, lasting path forward — not a hand-out, but a hand up."
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_AREAS.map((area) => (
            <StaggerItem key={area.title}>
              <ProgramCard
                icon={area.icon}
                tone={area.tone}
                title={area.title}
                description={area.description}
                className="h-full"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
