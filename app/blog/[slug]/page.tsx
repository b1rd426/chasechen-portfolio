import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Tag } from "@/components/tag";
import { posts } from "@/data/posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const publishedPosts = posts.filter((post) => post.slug && post.sections);

export function generateStaticParams() {
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Chase Chen Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = publishedPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="editorial-page">
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
      />
      <section className="py-14 sm:py-20">
        <Container className="editorial-reading">
          <div>
            <Link
              href="/blog"
              className="focus-ring mb-8 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-[#d5bc98] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              返回博客
            </Link>
            <article className="editorial-article">
              <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#b6a58b]" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#b6a58b]" />
                  {post.readTime}
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-9">
                {post.sections?.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}
