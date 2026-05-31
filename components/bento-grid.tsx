import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-6", className)}>
      {children}
    </div>
  );
}
