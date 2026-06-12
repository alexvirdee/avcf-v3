import "server-only";
import { createClient, type ContentfulClientApi, type Entry } from "contentful";
import type { Document } from "@contentful/rich-text-types";

/**
 * Contentful blog integration.
 *
 * Expected content type (id configurable via CONTENTFUL_BLOG_CONTENT_TYPE,
 * default "blogPost") with fields:
 *   title (Text) · slug (Text, unique) · excerpt (Text) · body (Rich text)
 *   featuredImage (Asset) · author (Text) · category (Text) · date (Date)
 */

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  body: Document | null;
  featuredImage: { url: string; alt: string; width: number; height: number } | null;
  author: string;
  category: string;
  date: string | null;
}

const CONTENT_TYPE = process.env.CONTENTFUL_BLOG_CONTENT_TYPE ?? "blogPost";

let client: ContentfulClientApi<undefined> | null = null;

export function isContentfulConfigured(): boolean {
  return Boolean(
    process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN,
  );
}

function getClient(): ContentfulClientApi<undefined> {
  client ??= createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
  });
  return client;
}

/* eslint-disable @typescript-eslint/no-explicit-any -- Contentful's generic
   entry typing requires a full skeleton type; we normalize defensively. */
function mapPost(entry: Entry<any>): BlogPost {
  const fields = entry.fields as Record<string, any>;
  const image = fields.featuredImage?.fields?.file;
  return {
    title: String(fields.title ?? "Untitled"),
    slug: String(fields.slug ?? entry.sys.id),
    excerpt: String(fields.excerpt ?? ""),
    body: (fields.body as Document) ?? null,
    featuredImage: image?.url
      ? {
          url: `https:${image.url}`,
          alt: String(fields.featuredImage?.fields?.title ?? fields.title ?? ""),
          width: image.details?.image?.width ?? 1200,
          height: image.details?.image?.height ?? 675,
        }
      : null,
    author: String(fields.author ?? "AVCF team"),
    category: String(fields.category ?? "News"),
    date: fields.date ?? entry.sys.createdAt ?? null,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isContentfulConfigured()) return [];
  const response = await getClient().getEntries({
    content_type: CONTENT_TYPE,
    order: ["-fields.date", "-sys.createdAt"] as never,
    limit: 50,
  });
  return response.items.map(mapPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isContentfulConfigured()) return null;
  const response = await getClient().getEntries({
    content_type: CONTENT_TYPE,
    "fields.slug": slug,
    limit: 1,
  } as never);
  const entry = response.items[0];
  return entry ? mapPost(entry) : null;
}
