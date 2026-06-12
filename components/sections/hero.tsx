"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHOTOS } from "@/lib/assets";
import { HERO_STATS } from "@/lib/constants";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  });

  return (
    <section className="px-3 pt-1 md:px-4" aria-label="Welcome">
      <div className="relative flex min-h-[620px] items-end overflow-hidden rounded-2xl shadow-xl md:min-h-[660px]">
        <Image
          src={PHOTOS.heroChildren}
          alt="Children of Prayas Schools laughing together"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-950/35 to-green-950/10"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-12 md:px-12 md:py-16">
          <motion.p
            {...enter(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 font-display text-sm font-semibold text-white backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-green-400" aria-hidden />
            In loving memory of Avtar Virdee
          </motion.p>

          <motion.h1
            {...enter(0.1)}
            className="mt-6 max-w-3xl text-4xl leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl md:text-[4.75rem]"
          >
            Small acts of <span className="text-green-300">generosity</span> create
            lifelong change.
          </motion.h1>

          <motion.p
            {...enter(0.2)}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/90"
          >
            AVCF invests in children, supports families, and strengthens communities
            — giving every child the chance to learn, grow and thrive.
          </motion.p>

          <motion.div {...enter(0.3)} className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-8 font-display text-base font-semibold"
            >
              <Link href="/donate">
                <Heart className="size-5" aria-hidden />
                Donate now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-8 font-display text-base font-semibold text-green-700 shadow-md hover:bg-white/90"
            >
              <Link href="/contact">
                Become a volunteer
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>

          <motion.dl {...enter(0.45)} className="mt-10 flex flex-wrap gap-3">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-0.5 rounded-lg border border-white/20 bg-white/15 px-6 py-3.5 backdrop-blur-md"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold leading-none text-white">
                  {stat.value}
                </dd>
                <dd className="text-sm text-white/85">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
