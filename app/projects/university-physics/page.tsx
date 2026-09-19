import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { physicsBase, physicsChapters } from "@/data/physics";
export const metadata: Metadata = {
  title: "大学物理学习动画演示",
  description: "用原创交互演示学习大学物理，按章节探索图形、公式与物理规律。",
  alternates: { canonical: physicsBase },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="项目 / 大学物理"
        title="大学物理学习动画演示"
        description="先预测，再动手验证。让几何关系、物理量与公式在同一幅图里相遇。"
      />
      <Container className="py-12">
        <div className="ph-intro">
          <p>
            沿《大学物理（下册）》第14—26章的顺序组织。每个演示围绕一种可以迁移的方法。
          </p>
          <span className="ph-pill">13 章规划 · {physicsChapters.reduce((sum,c)=>sum+c.count,0)} 项演示</span>
        </div>
        <div className="ph-chapter-grid">
          {physicsChapters.map((c) => (
            <article
              key={c.number}
              className={`ph-chapter ${c.count ? "is-ready" : ""}`}
            >
              <span className="ph-index">{c.number}</span>
              <div>
                <p className="ph-kicker">第 {c.number} 章</p>
                <h2>{c.title}</h2>
                <p>
                  {c.count
                    ? `${c.count} 项交互演示 · 可进入`
                    : "0 项演示 · 待建设"}
                </p>
                {c.count > 0 && (
                  <Link
                    className="ph-link"
                    href={`${physicsBase}/chapter-${c.number}`}
                  >
                    进入本章 →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="ph-footnote">
          本项目提供原创教学图形。题库、答案和个人学习记录保存在独立的私有学习库中。
        </p>
      </Container>
    </>
  );
}
