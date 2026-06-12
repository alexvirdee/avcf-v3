import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CauseCard } from "@/components/cards/cause-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/constants";

/** Active causes preview — fundraising cards with progress. */
export function ProgramsPreview() {
  return (
    <section className="py-20 md:py-28" aria-label="Active causes">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Active causes"
            title="Give to a cause close to your heart"
            description="100% of your gift goes directly to the children of Prayas Schools in India."
          />
          <Button
            asChild
            variant="ghost"
            className="rounded-full font-display font-semibold"
          >
            <Link href="/programs">
              See all programs
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program) => (
            <StaggerItem key={program.title}>
              <CauseCard program={program} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
