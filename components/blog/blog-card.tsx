import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ImageIcon, User } from "lucide-react";
import type { BlogPost } from "@/lib/contentful";
import { cn } from "@/lib/utils";

export function formatPostDate(date: string | null): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Blog listing card — photo, category badge, title, excerpt, author/date. */
export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  const date = formatPostDate(post.date);
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/9] bg-muted">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <ImageIcon className="size-8" aria-hidden />
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-green-50 px-3 py-1 font-display text-sm font-semibold text-green-700">
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h2 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-green-700">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 flex-1 leading-normal text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" aria-hidden />
              {post.author}
            </span>
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden />
                <time dateTime={post.date ?? undefined}>{date}</time>
              </span>
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
