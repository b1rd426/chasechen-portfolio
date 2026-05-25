import { Tag } from "@/components/tag";
import type { Experiment } from "@/data/experiments";

export function ExperimentCard({
  experiment,
}: {
  experiment: Experiment;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-indigo-200">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-500 to-indigo-300" />
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink-950">
          {experiment.title}
        </h3>
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
      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">下一步计划</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {experiment.nextStep}
        </p>
      </div>
    </article>
  );
}
