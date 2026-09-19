import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProjectPreview } from "@/components/project-preview";
import { StatusBadge } from "@/components/status-badge";
import { experiments } from "@/data/experiments";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "实验室",
  description: "Chase Chen 的小工具、技术演示与探索性实验。",
  path: "/lab",
});
export default function LabPage() {
  return (
    <div className="editorial-page">
      <PageHero
        eyebrow="实验室 / SMALL EXPERIMENTS"
        title="让好奇心，有一个着落。"
        description="拖动一个参数，观察一次变化。从可以亲手操作的小实验里，理解背后的原理。"
      />
      <section className="editorial-section">
        <Container>
          <div className="editorial-section-heading">
            <h2>动手试一试</h2>
            <span>交互实验</span>
          </div>
          <div className="editorial-lab-grid">
            {experiments
              .filter((item) => item.demoUrl)
              .map((item) => (
                <article className="editorial-project" key={item.title}>
                  <Link
                    href={item.demoUrl!}
                    className="project-preview-link focus-ring"
                    aria-label={`体验${item.title}`}
                  >
                    <ProjectPreview
                      kind={
                        item.demoUrl === "/lab/sorting" ? "sorting" : "physics"
                      }
                    />
                    <ArrowUpRight size={20} />
                  </Link>
                  <div className="editorial-project-body">
                    <div className="editorial-meta">
                      <span>{item.tags[0]}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <h2>
                      <Link href={item.demoUrl!}>{item.title}</Link>
                    </h2>
                    <p>{item.description}</p>
                    <Link href={item.demoUrl!} className="garden-text-link">
                      开始探索 <ArrowUpRight size={16} />
                    </Link>
                    <details className="editorial-detail">
                      <summary>下一步计划</summary>
                      <p>{item.nextStep}</p>
                    </details>
                  </div>
                </article>
              ))}
          </div>
          <div className="editorial-planned">
            <h2>想法簿</h2>
            {experiments
              .filter((item) => !item.demoUrl)
              .map((item) => (
                <article key={item.title}>
                  <div>
                    <StatusBadge status={item.status} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <details className="editorial-detail">
                      <summary>下一步计划</summary>
                      <p>{item.nextStep}</p>
                    </details>
                  </div>
                  <span>{item.tags.join(" / ")}</span>
                </article>
              ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
