import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SortingVisualizer } from "@/components/sorting-visualizer";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "可交互的冒泡、选择与插入排序可视化，支持单步、速度控制和手动数组。";

export const metadata = createPageMetadata({
  title: "排序算法可视化",
  description,
  path: "/lab/sorting",
});

export default function SortingPage() {
  return (
    <>
      <PageHero
        eyebrow="算法实验"
        title="亲手观察排序算法的每一步"
        description="输入一组数字，逐步查看比较、交换与有序区间如何变化。算法层先生成完整步骤序列，界面只负责播放和解释。"
      />
      <section className="py-10 sm:py-14">
        <Container>
          <SortingVisualizer />
        </Container>
      </section>
    </>
  );
}
