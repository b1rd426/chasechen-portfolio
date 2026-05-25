type SkillBadgeProps = {
  name: string;
};

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
      {name}
    </span>
  );
}
