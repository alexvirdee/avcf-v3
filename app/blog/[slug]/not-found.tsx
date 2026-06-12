import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostNotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Compass className="size-7" aria-hidden />
      </span>
      <h1 className="font-display text-2xl font-bold text-ink">
        We couldn&apos;t find that story
      </h1>
      <p className="mt-2 text-muted-foreground">
        It may have been moved or unpublished — but there are plenty more to
        read.
      </p>
      <Button asChild className="mt-6 rounded-full font-display font-semibold">
        <Link href="/blog">Browse all stories</Link>
      </Button>
    </div>
  );
}
