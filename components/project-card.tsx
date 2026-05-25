import { Tag } from "@/components/tag";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift">
      <div className="mb-5 flex items-center justify-between gap-4 text-xs">
        <span className="font-medium text-brand-600">{project.category}</span>
        <span className="rounded-full border border-blue-100 bg-brand-50 px-3 py-1 font-medium text-brand-700">
          {project.status}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-ink-950">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <Tag key={technology}>{technology}</Tag>
        ))}
      </div>
      <div className="mt-6 flex-1 border-t border-slate-100 pt-5">
        <p className="text-xs font-medium text-slate-500">学习重点</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {project.learningFocus}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm">
        {project.sourceUrl ? (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-600 transition hover:text-brand-700"
          >
            GitHub 源码
          </a>
        ) : (
          <span className="text-slate-400">源码待整理</span>
        )}
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">演示待更新</span>
      </div>
    </article>
  );
}
