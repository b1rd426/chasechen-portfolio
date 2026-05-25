export type Experiment = {
  title: string;
  description: string;
  tags: string[];
  status: "构思中" | "即将开始" | "开发中";
  nextStep: string;
};

export const experiments: Experiment[] = [
  {
    title: "排序算法可视化",
    description: "观察数组在不同排序算法中的实时变化过程。",
    tags: ["Algorithm", "Animation"],
    status: "即将开始",
    nextStep: "先实现冒泡排序与选择排序的步骤展示。",
  },
  {
    title: "GPA 计算器",
    description: "快速换算课程绩点与加权平均成绩的小工具。",
    tags: ["Utility", "Form"],
    status: "构思中",
    nextStep: "整理绩点规则并设计最小输入表单。",
  },
  {
    title: "AI 简历优化器",
    description: "探索如何把经历描述得更准确、更有结构。",
    tags: ["AI", "Writing"],
    status: "构思中",
    nextStep: "明确输入输出边界，暂不接入复杂 API。",
  },
  {
    title: "Markdown 笔记整理器",
    description: "将散落的学习笔记整理成便于回顾的文档结构。",
    tags: ["Markdown", "Productivity"],
    status: "构思中",
    nextStep: "尝试把课程笔记转换为清晰的目录结构。",
  },
];
