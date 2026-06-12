import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { FAQS } from "@/lib/constants";

/** FAQ accordion — good to know before you give. */
export function FaqSection() {
  return (
    <section className="bg-ivory-deep py-20 md:py-28" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-[860px] px-6">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title="Good to know before you give"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-lg border border-border bg-card px-6 shadow-xs data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg font-bold text-ink hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
