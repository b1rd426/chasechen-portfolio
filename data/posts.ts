export type Post = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  status: "已发布" | "计划中";
  tags: string[];
};

export const posts: Post[] = [
  {
    title: "我为什么要搭建这个个人网站",
    excerpt:
      "从零开始积累真实作品、学习记录与工程实践，让成长被清晰地看见。",
    category: "项目复盘",
    date: "2026.05",
    readTime: "5 分钟阅读",
    status: "已发布",
    tags: ["Portfolio", "记录"],
  },
  {
    title: "大一软件工程学生应该如何建立作品集",
    excerpt:
      "围绕可演示项目、复盘文章和持续迭代，建立一套属于自己的成长档案。",
    category: "Web 开发",
    date: "即将发布",
    readTime: "6 分钟阅读",
    status: "计划中",
    tags: ["成长路径", "项目"],
  },
  {
    title: "第一次使用 Next.js 搭建个人网站的记录",
    excerpt:
      "记录 App Router、组件拆分、响应式设计与部署流程中的关键选择。",
    category: "Web 开发",
    date: "即将发布",
    readTime: "8 分钟阅读",
    status: "计划中",
    tags: ["Next.js", "实践"],
  },
];

export const postCategories = [
  "Web 开发",
  "数据结构与算法",
  "AI 工具开发",
  "项目复盘",
];
