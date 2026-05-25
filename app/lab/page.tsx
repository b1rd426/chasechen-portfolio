import type { Metadata } from "next";

import { Container } from "@/components/container";
import { ExperimentCard } from "@/components/experiment-card";
import { PageHero } from "@/components/page-hero";
import { experiments } from "@/data/experiments";

export const metadata: Metadata = {
  title: "实验室",
  description: "Chase Chen 的小工具、技术 Demo 与探索性实验。",
};

export default function LabPage() {
  return (
    <>
      <PageHero
        eyebrow="实验室"
        title="把小想法变成动手练习"
        description="实验室用于记录计划中的小工具与技术尝试。目标不是堆积功能，而是用清楚的小实验练习实现能力。"
      />
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {experiments.map((experiment) => (
              <ExperimentCard
                key={experiment.title}
                experiment={experiment}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
