type SkillBadgeProps = {
  name: string;
};

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-3 py-2 text-sm font-medium text-cyan-50">
      {name}
    </span>
  );
}
