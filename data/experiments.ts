export type Experiment = {
  title: string;
  description: string;
  tags: string[];
  status: "构思中" | "即将开始" | "开发中" | "可用版本";
  nextStep: string;
  demoUrl?: string;
};

export const experiments: Experiment[] = [
  {
    title: "排序算法可视化",
    description: "观察冒泡、选择与插入排序的比较、交换和有序区变化。",
    tags: ["算法", "React", "单元测试"],
    status: "可用版本",
    nextStep: "继续补充更多算法，并保持步骤生成器可独立测试。",
    demoUrl: "/lab/sorting",
  },
  {
    title: "GPA 计算器",
    description: "快速换算课程绩点与加权平均成绩的小工具。",
    tags: ["工具", "表单"],
    status: "构思中",
    nextStep: "整理绩点规则并设计最小输入表单。",
  },
  {
    title: "AI 简历优化器",
    description: "探索如何把经历描述得更准确、更有结构。",
    tags: ["AI", "写作"],
    status: "构思中",
    nextStep: "明确输入输出边界，暂不接入复杂 API。",
  },
  {
    title: "Markdown 笔记整理器",
    description: "将散落的学习笔记整理成便于回顾的文档结构。",
    tags: ["Markdown", "效率工具"],
    status: "构思中",
    nextStep: "尝试把课程笔记转换为清晰的目录结构。",
  },
];
