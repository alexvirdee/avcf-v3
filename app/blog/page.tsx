import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/motion";
import { getBlogPosts, isContentfulConfigured } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and stories from the Avtar Virdee Children's Foundation and the classrooms of Prayas Schools.",
};

// Refresh from Contentful every 5 minutes.
export const revalidate = 300;

function EmptyState({ configured }: { configured: boolean }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-10 text-center shadow-sm">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Newspaper className="size-7" aria-hidden />
      </span>
      <h2 className="font-display text-xl font-bold text-ink">
        {configured ? "Stories are on their way" : "Blog not connected yet"}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {configured
          ? "We haven't published any posts yet — check back soon for news from the schools."
          : "Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to publish stories here."}
      </p>
    </div>
  );
}

export default async function BlogPage() {
  const configured = isContentfulConfigured();
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="News & stories"
        title="From the classrooms of Prayas"
        description="Updates from the foundation — what your support is building, one story at a time."
      />
      <section className="pb-20 md:pb-28" aria-label="Blog posts">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          {posts.length === 0 ? (
            <EmptyState configured={configured} />
          ) : (
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  );
}
