import { cn } from "@/lib/cn";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const statusStyles: Record<string, string> = {
  已完成: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Done: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  MVP: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  首版可用: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  可用版本: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  开发中: "border-blue-300/35 bg-blue-300/10 text-blue-100",
  Building: "border-blue-300/35 bg-blue-300/10 text-blue-100",
  规划中: "border-violet-300/35 bg-violet-300/10 text-violet-100",
  Planned: "border-violet-300/35 bg-violet-300/10 text-violet-100",
  即将开始: "border-pink-300/35 bg-pink-300/10 text-pink-100",
  "Coming Soon": "border-pink-300/35 bg-pink-300/10 text-pink-100",
  构思中: "border-slate-300/25 bg-white/[0.06] text-slate-200",
  已发布: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  计划中: "border-violet-300/35 bg-violet-300/10 text-violet-100",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        statusStyles[status] ??
          "border-white/15 bg-white/[0.06] text-slate-200",
        className,
      )}
    >
      {status}
    </span>
  );
}
