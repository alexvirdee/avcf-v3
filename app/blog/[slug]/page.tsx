import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { formatPostDate } from "@/components/blog/blog-card";
import { RichText } from "@/components/blog/rich-text";
import { DonationCallout } from "@/components/sections/donation-callout";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentful";

export const revalidate = 300;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Story not found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: post.featuredImage
      ? { images: [{ url: post.featuredImage.url }] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const date = formatPostDate(post.date);

  return (
    <>
      <article className="pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="mx-auto max-w-[760px] px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-green-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All stories
          </Link>

          <p className="eyebrow mt-8 text-green-600">{post.category}</p>
          <h1 className="mt-3 text-3xl md:text-[2.875rem] md:leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
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

        {post.featuredImage && (
          <div className="mx-auto mt-10 max-w-[1000px] px-6">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                priority
                sizes="(min-width: 1000px) 1000px, 100vw"
                className="w-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-[760px] px-6 text-lg">
          {post.body ? (
            <RichText document={post.body} />
          ) : (
            <p className="text-muted-foreground">{post.excerpt}</p>
          )}
        </div>
      </article>

      <DonationCallout />
    </>
  );
}
