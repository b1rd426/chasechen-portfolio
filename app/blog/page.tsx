import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { posts } from "@/data/posts";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "手记",
  description: "关于 Web 开发、算法、AI 应用与项目复盘的文章记录。",
  path: "/blog",
});
export default function BlogPage() {
  return (
    <div className="editorial-page">
      <PageHero
        eyebrow="手记 / FIELD NOTES"
        title="写下过程，也留下思考。"
        description="记录第一次理解的瞬间，也记录走过弯路之后的答案。"
      />
      <section className="editorial-section">
        <Container>
          <div className="editorial-section-heading">
            <h2>最近写下</h2>
            <span>学习与实践的记录</span>
          </div>
          {posts
            .filter((post) => post.status === "已发布" && post.slug)
            .map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          <div className="editorial-upcoming">
            <div className="editorial-section-heading">
              <h2>还在酝酿</h2>
              <span>待完成后发布</span>
            </div>
            {posts
              .filter((post) => post.status !== "已发布")
              .map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
