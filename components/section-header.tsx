import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold text-cyan-200">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-2xl font-semibold text-white sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-7 text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
