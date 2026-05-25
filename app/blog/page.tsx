import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
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
          <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="mb-4 text-sm font-medium text-slate-500">
              文章方向
            </p>
            <div className="flex flex-wrap gap-2">
              {postCategories.map((category) => (
                <Tag key={category}>{category}</Tag>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
