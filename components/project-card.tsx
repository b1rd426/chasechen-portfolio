import { ArrowUpRight, Code2, GitBranch, Sparkles } from "lucide-react";

import { Tag } from "@/components/tag";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-50/80 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="mb-5 flex items-center justify-between gap-4 text-xs">
        <span className="relative inline-flex items-center gap-2 font-medium text-brand-600">
          <Code2 className="h-3.5 w-3.5" />
          {project.category}
        </span>
        <span className="rounded-full border border-blue-100 bg-brand-50 px-3 py-1 font-medium text-brand-700">
          {project.status}
        </span>
      </div>
      <h3 className="relative text-xl font-semibold tracking-tight text-ink-950">
        {project.title}
      </h3>
      <p className="relative mt-3 text-sm leading-7 text-slate-600">
        {project.description}
      </p>
      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <Tag key={technology}>{technology}</Tag>
        ))}
      </div>
      <div className="relative mt-6 flex-1 border-t border-slate-100 pt-5">
        <p className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          学习重点
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {project.learningFocus}
        </p>
      </div>
      <div className="relative mt-6 flex flex-wrap items-center gap-3 text-sm">
        {project.sourceUrl ? (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            <GitBranch className="h-3.5 w-3.5" />
            GitHub 源码
          </a>
        ) : (
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-400">
            源码待整理
          </span>
        )}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 font-medium text-white shadow-card transition hover:bg-brand-700"
          >
            在线访问
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-400">
            Demo: Coming soon
          </span>
        )}
      </div>
    </article>
  );
}
