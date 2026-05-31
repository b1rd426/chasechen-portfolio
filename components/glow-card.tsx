import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { ShineBorder } from "@/components/shine-border";
import { cn } from "@/lib/cn";

type GlowCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  interactive?: boolean;
  tone?: "cyan" | "violet" | "pink" | "emerald";
};

const toneGlow = {
  cyan: "from-cyan-400/22 via-blue-500/8 to-transparent",
  violet: "from-violet-400/22 via-fuchsia-500/8 to-transparent",
  pink: "from-pink-400/20 via-violet-500/8 to-transparent",
  emerald: "from-emerald-400/18 via-cyan-500/8 to-transparent",
};

export function GlowCard({
  as: Component = "div",
  children,
  className,
  interactive = false,
  tone = "cyan",
  ...props
}: GlowCardProps) {
  return (
    <Component
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-5 text-slate-100 shadow-card backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:content-['']",
        interactive &&
          "transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.075] hover:shadow-lift",
        className,
      )}
      {...props}
    >
      <ShineBorder />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br blur-3xl transition duration-500 group-hover:opacity-100",
          toneGlow[tone],
        )}
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
