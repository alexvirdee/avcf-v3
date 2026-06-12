import { StoryCard } from "@/components/cards/story-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { STORIES } from "@/lib/constants";

/** Community voices — testimonial story cards. */
export function TestimonialsSection() {
  return (
    <section className="bg-ivory-deep py-20 md:py-28" aria-label="Community stories">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            tone="care"
            eyebrow="Voices"
            title="Stories from our community"
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {STORIES.map((story) => (
            <StaggerItem key={story.name}>
              <StoryCard story={story} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
