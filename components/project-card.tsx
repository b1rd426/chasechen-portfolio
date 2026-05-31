import { ArrowUpRight, Code2, GitBranch, Sparkles } from "lucide-react";

import { GlowCard } from "@/components/glow-card";
import { StatusBadge } from "@/components/status-badge";
import { TechBadge } from "@/components/tech-badge";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <GlowCard
      as="article"
      interactive
      tone={project.status === "首版可用" ? "cyan" : "violet"}
      className={cn("h-full p-6", className)}
    >
      <div className="flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4 text-xs">
          <span className="inline-flex items-center gap-2 font-semibold text-cyan-100">
            <Code2 className="h-3.5 w-3.5" />
            {project.category}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="text-xl font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <TechBadge key={technology}>{technology}</TechBadge>
          ))}
        </div>
        <div className="mt-6 flex-1 border-t border-white/10 pt-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
            学习重点
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            {project.learningFocus}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`查看 ${project.title} 的 GitHub 源码`}
              className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-medium text-slate-100 transition hover:border-cyan-300/35 hover:text-cyan-100"
            >
              <GitBranch className="h-3.5 w-3.5" />
              GitHub 源码
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-slate-500">
              源码待整理
            </span>
          )}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`在线访问 ${project.title}`}
              className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-cyan-300 px-3 py-1.5 font-semibold text-slate-950 shadow-neon transition hover:bg-cyan-200"
            >
              在线访问
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-slate-500">
              演示待上线
            </span>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
