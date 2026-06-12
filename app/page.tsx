import { DonationCallout } from "@/components/sections/donation-callout";
import { FaqSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { Hero } from "@/components/sections/hero";
import { ImpactMetrics } from "@/components/sections/impact-metrics";
import { ImpactSection } from "@/components/sections/impact-section";
import { LegacySection } from "@/components/sections/legacy-section";
import { MissionSection } from "@/components/sections/mission-section";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { VolunteerCallout } from "@/components/sections/volunteer-callout";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionSection />
      <LegacySection />
      <ImpactSection />
      <ProgramsPreview />
      <ImpactMetrics />
      <GallerySection />
      <TestimonialsSection />
      <DonationCallout />
      <VolunteerCallout />
      <FaqSection />
    </>
  );
}
