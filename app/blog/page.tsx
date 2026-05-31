import type { Metadata } from "next";
import { Tags } from "lucide-react";

import { Container } from "@/components/container";
import { GlowCard } from "@/components/glow-card";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { Tag } from "@/components/tag";
import { postCategories, posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "关于 Web 开发、算法、AI 应用与项目复盘的文章记录。",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="博客"
        title="记录学习过程与项目复盘"
        description="这里用于整理技术学习中的思考与项目搭建过程。第一版先建立文章索引，内容会随实际学习进度持续补充。"
      />
      <section className="py-14 sm:py-20">
        <Container>
          <RevealOnScroll>
            <GlowCard className="mb-10 p-5">
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Tags className="h-4 w-4 text-cyan-200" />
                文章方向
              </p>
              <div className="flex flex-wrap gap-2">
                {postCategories.map((category) => (
                  <Tag key={category}>{category}</Tag>
                ))}
              </div>
            </GlowCard>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
