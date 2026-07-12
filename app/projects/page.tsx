import { Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { GlowCard } from "@/components/glow-card";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

const description = "Chase Chen 的软件工程项目与持续构建记录。";

export const metadata = createPageMetadata({
  title: "项目",
  description,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="项目"
        title="从练习开始，逐步完成可展示的作品"
        description="这里记录我正在完成或计划探索的项目。每个条目说明使用的技术和学习重点，后续会随着实现进度更新源码与演示。"
      />
      <section className="py-14 sm:py-20">
        <Container>
          <RevealOnScroll>
            <GlowCard className="mb-10 p-5">
              <p className="flex items-center gap-3 text-sm leading-7 text-slate-300">
                <Sparkles className="h-4 w-4 shrink-0 text-cyan-200" />
                当前以课程基础和 Web 开发练习为主，项目状态会随实际进度更新；没有演示链接的项目不会伪装成已上线。
              </p>
            </GlowCard>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
