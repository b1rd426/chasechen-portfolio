import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { StatusBadge } from "@/components/status-badge";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "项目",
  description: "Chase Chen 的软件工程项目与持续构建记录。",
  path: "/projects",
});
export default function ProjectsPage() {
  const available = projects
    .filter((p) => p.detailUrl || p.demoUrl)
    .sort(
      (a, b) =>
        Number(b.preview === "portfolio") - Number(a.preview === "portfolio"),
    );
  const planned = projects.filter((p) => !p.detailUrl && !p.demoUrl);
  return (
    <div className="editorial-page">
      <PageHero
        eyebrow="作品 / SELECTED WORK"
        title="沿途，把想法做成作品。"
        description="从个人网站到交互实验，每一次动手，都让抽象的知识更具体一些。"
      />
      <section className="editorial-section">
        <Container>
          <div className="editorial-section-heading">
            <h2>可以亲手体验</h2>
            <span>0{available.length} 件作品</span>
          </div>
          <div className="editorial-project-grid">
            {available.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="editorial-planned">
            <h2>下一颗种子</h2>
            {planned.map((project) => (
              <article key={project.title}>
                <div>
                  <StatusBadge status={project.status} />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <span>{project.category}</span>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
