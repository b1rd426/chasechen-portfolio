import { FlaskConical, ListChecks } from "lucide-react";

import { GlowCard } from "@/components/glow-card";
import { StatusBadge } from "@/components/status-badge";
import { TechBadge } from "@/components/tech-badge";
import type { Experiment } from "@/data/experiments";

export function ExperimentCard({
  experiment,
}: {
  experiment: Experiment;
}) {
  return (
    <GlowCard as="article" interactive tone="pink" className="h-full p-6">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-200/20 bg-violet-300/10 text-violet-100">
              <FlaskConical className="h-4 w-4" />
            </span>
            <h3 className="text-lg font-semibold text-white transition group-hover:text-cyan-100">
              {experiment.title}
            </h3>
          </div>
          <StatusBadge status={experiment.status} className="shrink-0" />
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          {experiment.description}
        </p>
        <p className="mt-6 text-xs font-semibold text-slate-400">技术方向</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <TechBadge key={tag}>{tag}</TechBadge>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <ListChecks className="h-3.5 w-3.5 text-cyan-200" />
            下一步计划
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            {experiment.nextStep}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            {experiment.demoUrl ? "演示已连接" : "演示待实现"}
          </p>
        </div>
      </div>
    </GlowCard>
  );
}
