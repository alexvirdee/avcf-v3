"use client";

import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-coral-50 text-coral-500">
        <CloudOff className="size-7" aria-hidden />
      </span>
      <h1 className="font-display text-2xl font-bold text-ink">
        We couldn&apos;t load the blog
      </h1>
      <p className="mt-2 text-muted-foreground">
        Something went wrong while fetching our stories. Please try again in a
        moment.
      </p>
      <Button
        onClick={reset}
        className="mt-6 rounded-full font-display font-semibold"
      >
        Try again
      </Button>
    </div>
  );
}
