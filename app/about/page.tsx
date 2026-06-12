import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { DonationCallout } from "@/components/sections/donation-callout";
import { GallerySection } from "@/components/sections/gallery-section";
import { LegacySection } from "@/components/sections/legacy-section";
import { PHOTOS } from "@/lib/assets";
import { VOLUNTEERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story and legacy of the Avtar Virdee Children's Foundation and the Prayas Schools it supports.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About AVCF"
        title="A family's promise to every child"
        description="The Avtar Virdee Children's Foundation was founded in loving memory of Avtar Virdee, who devoted his life to teaching children with special needs."
      />

      <LegacySection />

      {/* Prayas Schools */}
      <section id="prayas" className="bg-ivory-deep py-20 md:py-28" aria-label="Prayas Schools">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Prayas Schools"
              tone="secondary"
              title="Another chance at education"
              description="Prayas provides children in need with free education, food, uniforms and health services. Most students have learning disabilities, mental challenges or physical handicaps — and state-run schools in India do not admit them."
            />
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              At Prayas, students are given another chance at education and an
              enjoyable life as productive members of society. AVCF funds
              classrooms, teachers, meals, transport and therapy facilities — so
              every child can learn, grow and thrive.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="aspect-[5/4] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={PHOTOS.classroom}
                alt="Students learning together at a Prayas school"
                width={960}
                height={768}
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Volunteers / who we are */}
      <section className="py-20 md:py-28" aria-label="Our volunteers">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Who we are"
              title="Run by family, powered by volunteers"
              description="Avtar Virdee's own grandchildren volunteer their time to keep AVCF running and continue the foundation's support of Prayas Schools in India."
            />
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {VOLUNTEERS.map((person) => (
              <StaggerItem key={person.name} className="text-center">
                <div className="mx-auto aspect-square w-full max-w-[160px] overflow-hidden rounded-2xl shadow-sm">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={320}
                    height={320}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-ink">
                  {person.name}
                </h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <GallerySection />
      <DonationCallout />
    </>
  );
}
