import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "项目",
  description: "Chase Chen 的软件工程项目与持续构建记录。",
};

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
          <div className="mb-10 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-card">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />
            当前以课程基础和 Web 开发练习为主，项目状态会随实际进度更新。
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
