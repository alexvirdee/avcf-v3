import Image from "next/image";
import Link from "next/link";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types";
import type { ReactNode } from "react";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold text-ink">{text}</strong>,
    [MARKS.CODE]: (text) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="my-5 leading-relaxed text-foreground">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mb-4 mt-10 text-2xl md:text-3xl">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mb-3 mt-8 text-xl md:text-2xl">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <h4 className="mb-2 mt-6 text-lg">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="my-5 list-disc space-y-2 pl-6 marker:text-green-500">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-green-600">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => (
      <li className="leading-relaxed text-foreground [&>p]:my-0">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className="my-7 rounded-r-lg border-l-4 border-green-500 bg-green-50/60 py-3 pl-6 pr-4 font-display text-lg text-green-900 [&>p]:my-1">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-10 border-border" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data?.target?.fields?.file;
      if (!file?.url) return null;
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl shadow-md">
            <Image
              src={`https:${file.url}`}
              alt={String(node.data?.target?.fields?.title ?? "")}
              width={file.details?.image?.width ?? 1200}
              height={file.details?.image?.height ?? 675}
              className="w-full object-cover"
            />
          </div>
          {node.data?.target?.fields?.description && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {String(node.data.target.fields.description)}
            </figcaption>
          )}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const href = String(node.data.uri ?? "#");
      const isInternal = href.startsWith("/") || href.includes("avcf");
      return (
        <Link
          href={href}
          className="font-semibold text-green-700 underline decoration-green-300 underline-offset-2 transition-colors hover:text-green-600"
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </Link>
      );
    },
  },
};

/** Renders a Contentful rich-text document in AVCF article styling. */
export function RichText({ document }: { document: Document }): ReactNode {
  return <div>{documentToReactComponents(document, options)}</div>;
}
