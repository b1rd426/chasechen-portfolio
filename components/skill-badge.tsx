type SkillBadgeProps = {
  name: string;
};

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="garden-tag">
      {name}
    </span>
  );
}
