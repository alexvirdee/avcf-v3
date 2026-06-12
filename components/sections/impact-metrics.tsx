import { ImpactCard } from "@/components/cards/impact-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { IMPACT_METRICS } from "@/lib/constants";

/** Annual impact band — white metric cards on the deep-green inverse surface. */
export function ImpactMetrics() {
  return (
    <section className="bg-green-900 py-16 md:py-20" aria-label="Annual impact">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow text-green-300">Annual impact</p>
          <h2 className="mt-3 text-3xl text-white md:text-[2.875rem] md:leading-[1.1]">
            The difference we made together this year
          </h2>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_METRICS.map((metric) => (
            <StaggerItem key={metric.label}>
              <ImpactCard
                value={metric.value}
                label={metric.label}
                icon={metric.icon}
                tone={metric.tone}
                className="h-full"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
