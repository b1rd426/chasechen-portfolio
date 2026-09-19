import { cn } from "@/lib/cn";

type TechBadgeProps = {
  children: string;
  className?: string;
};

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "garden-tag",
        className,
      )}
    >
      {children}
    </span>
  );
}
