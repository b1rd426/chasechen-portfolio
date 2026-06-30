import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SortingVisualizer } from "@/components/sorting-visualizer";

export const metadata: Metadata = {
  title: "排序算法可视化",
  description: "用步骤动画观察冒泡排序的比较、交换与完成过程。",
  alternates: {
    canonical: "/lab/sorting-visualizer",
  },
};

export default function SortingVisualizerPage() {
  return (
    <>
      <PageHero
        eyebrow="实验室"
        title="排序算法可视化"
        description="从冒泡排序开始，把数组比较、交换和已排序区间拆成可观察的步骤。"
      />
      <section className="py-14 sm:py-20">
        <Container>
          <RevealOnScroll>
            <SortingVisualizer />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
