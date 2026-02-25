"use client";

import Image from "next/image";
import Link from "next/link";
import { PrismicBlogPost } from "@/types/prismic";
import { isFilled } from "@prismicio/client";
import { RichTextField } from "@/components/prismic/fields";
import { PrismicNextLink } from "@prismicio/next";
import { formatDate } from "@/lib/format";
import type { JSXMapSerializer } from "@prismicio/react";

const blogBodyComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight first:mt-0">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>
  ),
  heading4: ({ children }) => (
    <h4 className="mt-4 mb-2 text-lg font-semibold">{children}</h4>
  ),
  paragraph: ({ children }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  list: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
  ),
  listItem: ({ children }) => <li className="leading-relaxed">{children}</li>,
  oListItem: ({ children }) => <li className="leading-relaxed">{children}</li>,
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="text-primary underline underline-offset-4 hover:no-underline"
    >
      {children}
    </PrismicNextLink>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  image: ({ node }) => {
    const url = node.url;
    const alt = node.alt ?? "";
    if (!url) return null;
    return (
      <figure className="my-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={url}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        {node.copyright && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {node.copyright}
          </figcaption>
        )}
      </figure>
    );
  },
  embed: ({ node }) => {
    const html = (node as { oembed?: { html?: string } }).oembed?.html;
    if (!html) return null;
    return (
      <div className="my-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <div
          className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  },
  preformatted: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
      {children}
    </pre>
  ),
};

interface BlogPostDetailProps {
  post: PrismicBlogPost;
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const data = post.data;
  const title = (data?.title as string) ?? "Untitled";
  const excerpt = data?.excerpt as string | undefined;
  const featuredImage = data?.featured_image;
  const content = data?.content;
  const author = data?.author as string | undefined;
  const publishedDate = data?.published_date
    ? formatDate(data.published_date as string)
    : post.first_publication_date
      ? formatDate(post.first_publication_date)
      : null;
  const tags = (data?.tags ?? []) as Array<{ tag?: string }>;
  const tagLabels = tags.map((t) => t.tag).filter(Boolean) as string[];

  return (
    <article className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{excerpt}</p>
        )}
        <div className="flex items-center gap-2 mt-4">
          {publishedDate && (
            <time
              dateTime={data?.published_date ?? post.first_publication_date}
              className="text-sm text-muted-foreground"
            >
              {publishedDate}
            </time>
          )}
          {" - "}
          {author && <p className="text-sm text-muted-foreground">{author}</p>}
        </div>

        {tagLabels.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Tags:</span>
            {tagLabels.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full bg-muted px-3 py-1 text-sm transition-colors hover:bg-muted/80"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {featuredImage?.url && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-8">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt ?? title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}

      {isFilled.richText(content) && (
        <div className="blog-body wysiwyg pb-8 md:pb-16">
          <RichTextField
            field={content}
            className="text-foreground"
            components={blogBodyComponents}
          />
        </div>
      )}
    </article>
  );
}
