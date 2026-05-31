import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type GradientButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
};

export function GradientButton({
  href,
  children,
  className,
  external = false,
  icon,
  variant = "primary",
  ariaLabel,
}: GradientButtonProps) {
  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300",
    "motion-safe:hover:-translate-y-0.5",
    variant === "primary" &&
      "bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 text-slate-950 shadow-neon hover:shadow-lift",
    variant === "secondary" &&
      "border border-white/12 bg-white/[0.07] text-slate-100 shadow-card backdrop-blur hover:border-cyan-300/35 hover:bg-white/[0.1]",
    variant === "ghost" &&
      "text-slate-300 hover:bg-white/[0.07] hover:text-white",
    className,
  );

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {external ? <ArrowUpRight className="h-4 w-4" /> : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  );
}
