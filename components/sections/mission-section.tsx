import { Reveal } from "@/components/motion";

/** Centered mission statement strip. */
export function MissionSection() {
  return (
    <section className="py-20 md:py-28" aria-label="Our mission">
      <Reveal className="mx-auto max-w-[880px] px-6 text-center">
        <p className="eyebrow text-green-600">Our mission</p>
        <p className="mt-6 font-display text-2xl font-bold leading-[1.35] tracking-[-0.01em] text-ink md:text-4xl">
          To create brighter futures by investing in{" "}
          <span className="text-green-600">children</span>, supporting{" "}
          <span className="text-gold-600">families</span>, and strengthening{" "}
          <span className="text-blue-600">communities</span> — because every child
          deserves the chance to thrive.
        </p>
      </Reveal>
    </section>
  );
}
