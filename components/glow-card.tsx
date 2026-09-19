import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
type GlowCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  interactive?: boolean;
  tone?: "cyan" | "violet" | "pink" | "emerald";
};
export function GlowCard({
  as: Component = "div",
  children,
  className,
  interactive = false,
  tone: _tone,
  ...props
}: GlowCardProps) {
  return (
    <Component
      className={cn(
        "garden-panel",
        interactive && "garden-panel-interactive",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
