import { cn } from "@/lib/cn";

type ShineBorderProps = {
  className?: string;
};

export function ShineBorder({ className }: ShineBorderProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-lg opacity-0 transition duration-500 group-hover:opacity-100",
        "before:absolute before:inset-[-1px] before:rounded-lg before:bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0),rgba(34,211,238,0.65),rgba(168,85,247,0.75),rgba(236,72,153,0.55),rgba(34,211,238,0))] before:content-['']",
        "after:absolute after:inset-px after:rounded-lg after:bg-surface/95 after:content-['']",
        className,
      )}
    />
  );
}
