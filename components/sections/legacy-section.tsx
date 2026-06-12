import Image from "next/image";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { PHOTOS } from "@/lib/assets";
import { TIMELINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const dotTones = {
  primary: "bg-green-500",
  secondary: "bg-blue-500",
  accent: "bg-gold-500",
  care: "bg-coral-400",
} as const;

/** Our story — legacy of Avtar Virdee with a milestone timeline. */
export function LegacySection() {
  return (
    <section className="py-20 md:py-28" aria-label="Our story">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-8">
        <Reveal className="relative">
          <div className="aspect-[5/4] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={PHOTOS.celebration}
              alt="Children at Prayas Schools celebrating together"
              width={960}
              height={768}
              className="size-full object-cover"
            />
          </div>
          <p className="absolute -top-4 right-4 rounded-lg border border-border bg-card px-5 py-3 font-display text-sm font-bold text-green-700 shadow-lg md:-right-3">
            Since 2009
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionHeading
            eyebrow="Our story"
            title="Built on one teacher's belief in every child"
            description="AVCF was founded in memory of Avtar Virdee, who devoted his life to teaching children with special needs. His family carries that mission forward today, supporting Prayas Schools in India."
          />
          <ol className="mt-10 space-y-7">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative flex gap-5">
                <span
                  className={cn(
                    "mt-1.5 size-3 shrink-0 rounded-full",
                    dotTones[item.tone],
                  )}
                  aria-hidden
                />
                <div>
                  <p className="font-mono text-sm font-semibold text-muted-foreground">
                    {item.year}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 leading-normal text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
