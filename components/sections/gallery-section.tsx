import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { GALLERY } from "@/lib/assets";
import { cn } from "@/lib/utils";

/** Success-stories photo gallery — real moments from Prayas Schools. */
export function GallerySection() {
  return (
    <section className="py-20 md:py-28" aria-label="Photo gallery">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Success stories"
            title="Moments that say it all"
            description="Real days, real children, real progress — from the classrooms and courtyards of Prayas Schools."
          />
        </Reveal>
        <Stagger className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-4">
          {GALLERY.map((photo) => (
            <StaggerItem
              key={photo.src}
              className={cn(photo.span === 2 && "col-span-2")}
            >
              <figure className="relative size-full overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-950/65 to-transparent px-4 pb-3 pt-9 font-display text-sm font-semibold text-white">
                  {photo.label}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
