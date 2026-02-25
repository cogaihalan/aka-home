"use client";

import Link from "next/link";
import Image from "next/image";
import { PrismicBlogPost } from "@/types/prismic";
import { formatDate } from "@/lib/format";

interface BlogPostListProps {
  posts: PrismicBlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  if (!posts?.length) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 py-16 text-center">
        <p className="text-muted-foreground">Hiện tại chưa có bài viết nào.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {posts.map((post) => {
        const uid = post.uid ?? "";
        const title = (post.data?.title as string) ?? "Không có tiêu đề";
        const excerpt = (post.data?.excerpt as string) ?? "";
        const featuredImage = post.data?.featured_image;
        const publishedDate = post.data?.published_date
          ? formatDate(post.data.published_date as string)
          : post.first_publication_date
            ? formatDate(post.first_publication_date)
            : null;
        const author = (post.data?.author as string) ?? null;

        return (
          <article
            key={post.id}
            className="group flex flex-col rounded-lg border bg-card overflow-hidden transition-shadow hover:shadow-md"
          >
            <Link href={`/blog/${uid}`} className="flex flex-1 flex-col">
              {featuredImage?.url ? (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.alt ?? title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-muted" />
              )}
              <div className="flex flex-1 flex-col p-6">
                {publishedDate && (
                  <time
                    dateTime={
                      post.data?.published_date ?? post.first_publication_date
                    }
                    className="text-sm text-muted-foreground"
                  >
                    {publishedDate}
                  </time>
                )}
                <h2 className="mt-2 text-xl font-semibold tracking-tight line-clamp-2">
                  {title}
                </h2>
                {excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {excerpt}
                  </p>
                )}
                {author && (
                  <p className="mt-4 text-sm text-muted-foreground font-medium">
                    {author}
                  </p>
                )}
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
