import { FlaskConical, ListChecks } from "lucide-react";

import { Tag } from "@/components/tag";
import type { Experiment } from "@/data/experiments";

export function ExperimentCard({
  experiment,
}: {
  experiment: Experiment;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lift">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-400 to-sky-300" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
            <FlaskConical className="h-4 w-4" />
          </span>
          <h3 className="text-lg font-semibold text-ink-950 transition group-hover:text-brand-700">
            {experiment.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          {experiment.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        {experiment.description}
      </p>
      <p className="mt-6 text-xs font-medium text-slate-500">技术方向</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {experiment.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
          <ListChecks className="h-3.5 w-3.5 text-brand-500" />
          下一步计划
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {experiment.nextStep}
        </p>
      </div>
    </article>
  );
}
