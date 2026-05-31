import { cn } from "@/lib/cn";

type TechBadgeProps = {
  children: string;
  className?: string;
};

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-3 py-1 text-xs font-medium text-cyan-50",
        className,
      )}
    >
      {children}
    </span>
  );
}
