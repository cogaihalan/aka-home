import { Metadata } from "next";
import { prismicApiService } from "@/lib/api/prismic-service";
import HeroBanner from "@/components/ui/hero-banner";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog - AKA Store",
  description:
    "Read our latest articles, tips, and news. Discover insights and updates from AKA Store.",
};

export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;

  return (
    <>
      <HeroBanner
        imageUrl="/assets/banner-blogs.jpg"
        mobileImageUrl="/assets/banner-blogs-mobile.jpg"
        overlayOpacity={0}
        aspectRatio="16/9"
      />
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogPageContent tag={tag ?? null} />
      </Suspense>
    </>
  );
}

interface BlogPageContentProps {
  tag?: string | null;
}

async function BlogPageContent({ tag }: BlogPageContentProps) {
  const { results: allPosts } = await prismicApiService.getBlogPosts(1, 100);
  const posts = tag
    ? allPosts.filter((post) => {
        const tags = (post.data?.tags ?? []) as Array<{ tag?: string }>;
        return tags.some(
          (t) => (t.tag ?? "").toLowerCase() === tag.toLowerCase(),
        );
      })
    : allPosts;

  return (
    <section className="max-w-5xl mx-auto py-12 md:py-16">
      {tag && (
        <p className="mb-6 text-muted-foreground">
          Bài viết theo tag: <strong>{tag}</strong>
        </p>
      )}
      <BlogPostList posts={posts} />
    </section>
  );
}

function BlogListSkeleton() {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card overflow-hidden animate-pulse"
          >
            <div className="aspect-video bg-muted" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-4 bg-muted rounded w-1/2 pt-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
