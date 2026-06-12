import Image from "next/image";
import { Quote } from "lucide-react";
import type { Story } from "@/lib/constants";
import { cn } from "@/lib/utils";

const tones = {
  primary: "text-green-500",
  secondary: "text-blue-500",
  accent: "text-gold-500",
} as const;

/** Testimonial / community story card. */
export function StoryCard({ story, className }: { story: Story; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-card p-8 shadow-sm",
        className,
      )}
    >
      <Quote className={cn("size-7", tones[story.tone])} aria-hidden />
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
        “{story.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5">
        {story.image ? (
          <Image
            src={story.image}
            alt={story.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex size-12 items-center justify-center rounded-full bg-green-50 font-display font-bold text-green-700"
            aria-hidden
          >
            {story.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-display font-bold text-ink">{story.name}</p>
          <p className="text-sm text-muted-foreground">{story.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
