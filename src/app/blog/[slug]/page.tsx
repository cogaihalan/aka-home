import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prismicApiService } from "@/lib/api/prismic-service";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { results } = await prismicApiService.getBlogPosts(1, 100);
    return results
      .map((post) => ({
        slug: post.uid ?? post.id,
      }))
      .filter((p) => p.slug);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await prismicApiService.getBlogPostByUID(slug);
    if (!post) {
      return {
        title: "Post not found - AKA Store",
        description: "The requested blog post could not be found.",
      };
    }

    const title =
      (post.data?.meta_title as string) ??
      (post.data?.title as string) ??
      "Blog - AKA Store";
    const description =
      (post.data?.meta_description as string) ??
      (post.data?.excerpt as string) ??
      "Read more on the AKA Store blog.";
    const image = post.data?.featured_image?.url;

    return {
      title: `${title} - AKA Store`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: image ? [image] : [],
        type: "article",
        publishedTime: post.data?.published_date
          ? new Date(post.data.published_date as string).toISOString()
          : undefined,
        authors: post.data?.author ? [post.data.author as string] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return {
      title: "Blog - AKA Store",
      description: "Read our latest articles and updates.",
    };
  }
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prismicApiService.getBlogPostByUID(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
