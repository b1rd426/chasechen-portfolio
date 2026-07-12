import { FlaskConical, Route } from "lucide-react";

import { Container } from "@/components/container";
import { ExperimentCard } from "@/components/experiment-card";
import { GlowCard } from "@/components/glow-card";
import { PageHero } from "@/components/page-hero";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SectionHeader } from "@/components/section-header";
import { experiments } from "@/data/experiments";
import { createPageMetadata } from "@/lib/metadata";

const description = "Chase Chen 的小工具、技术演示与探索性实验。";

export const metadata = createPageMetadata({
  title: "实验室",
  description,
  path: "/lab",
});

export default function LabPage() {
  const roadmap = ["想法拆解", "最小演示", "交互优化", "复盘记录"];

  return (
    <>
      <PageHero
        eyebrow="实验室"
        title="把小想法变成动手练习"
        description="实验室用于记录计划中的小工具与技术尝试。目标不是堆积功能，而是用清楚的小实验练习实现能力。"
      />
      <section className="py-14 sm:py-20">
        <Container>
          <RevealOnScroll>
            <div className="mb-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <GlowCard className="p-6" tone="violet">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                  <FlaskConical className="h-4 w-4" />
                  实验重点
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  从小实验验证想法
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  这里优先记录算法可视化、Web 小工具和 AI 学习助手方向。每个实验都保留真实状态和下一步，不把规划中的内容包装成已完成。
                </p>
              </GlowCard>
              <GlowCard className="p-6" tone="pink">
                <SectionHeader
                  eyebrow="推进路线"
                  title="实验推进节奏"
                  description="先把边界拆清楚，再做最小可演示版本，最后补交互与复盘。"
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  {roadmap.map((step, index) => (
                    <div key={step} className="border-l border-white/10 pl-4">
                      <Route className="mb-3 h-4 w-4 text-cyan-200" />
                      <p className="text-xs font-semibold text-slate-400">
                        0{index + 1}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-100">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {experiments.map((experiment) => (
                <ExperimentCard
                  key={experiment.title}
                  experiment={experiment}
                />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
