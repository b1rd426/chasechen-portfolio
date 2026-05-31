import { Sparkles } from "lucide-react";

type AnimatedTechMarqueeProps = {
  items: string[];
};

export function AnimatedTechMarquee({ items }: AnimatedTechMarqueeProps) {
  const loopedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-3">
      <p className="sr-only">技术栈滚动展示：{items.join("、")}</p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent"
      />
      <div
        aria-hidden="true"
        className="flex w-max gap-3 motion-safe:animate-[marquee-x_28s_linear_infinite] motion-safe:hover:[animation-play-state:paused]"
      >
        {loopedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-semibold text-slate-300 shadow-card backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
