export type Project = {
  title: string;
  description: string;
  stack: string[];
  category: string;
  status: string;
  featured: boolean;
  learningFocus: string;
  sourceUrl?: string;
};

export const projects: Project[] = [
  {
    title: "个人作品集网站",
    description:
      "一个持续更新的技术成长主页，用于集中展示项目、技术文章、实验作品与学习方向。",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web 开发",
    status: "MVP",
    featured: true,
    learningFocus: "组件拆分、响应式布局与部署流程",
    sourceUrl: "https://github.com/b1rd426/chasechen-portfolio",
  },
  {
    title: "算法可视化实验室",
    description:
      "通过动画解释排序、二分查找、递归与动态规划，让抽象过程变得直观可理解。",
    stack: ["React", "TypeScript", "Visualization"],
    category: "算法",
    status: "规划中",
    featured: true,
    learningFocus: "算法步骤建模与可视化表达",
  },
  {
    title: "AI 学习助手工具",
    description:
      "面向学生的学习整理工具概念，聚焦笔记归纳、复习计划与知识总结场景。",
    stack: ["Next.js", "API", "Markdown"],
    category: "AI 应用",
    status: "构思中",
    featured: true,
    learningFocus: "从学习需求出发设计简单工具流程",
  },
];
