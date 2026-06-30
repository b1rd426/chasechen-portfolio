export type Post = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  status: "已发布" | "计划中";
  tags: string[];
  slug?: string;
  sections?: {
    title: string;
    paragraphs: string[];
  }[];
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
    tags: ["作品集", "记录"],
    slug: "why-build-this-site",
    sections: [
      {
        title: "为什么先做个人网站",
        paragraphs: [
          "我希望有一个地方能持续记录自己真正做过的项目，而不是只把学习过程散落在聊天记录、课程作业和本地文件里。作品集网站对我来说不是最终成果展示柜，更像一个可以反复更新的工程练习场。",
          "第一版先解决最基础的问题：让别人快速知道我是谁、正在学什么、已经做了什么、下一步准备做什么。这样每次完成一个小项目或写下一篇复盘，都能被放到同一个清晰入口里。",
        ],
      },
      {
        title: "第一版重点练习了什么",
        paragraphs: [
          "技术上，我用 Next.js App Router、TypeScript 和 Tailwind CSS 完成页面结构、组件拆分、响应式布局和静态部署。内容上，我刻意保留项目的真实状态：已上线的给链接，规划中的只写计划，不把还没完成的东西包装成成果。",
          "这个过程让我更熟悉从需求拆解到页面实现的完整链路，也提醒我作品集真正有价值的部分不是视觉效果本身，而是每个项目背后的实现过程、取舍和复盘。",
        ],
      },
      {
        title: "接下来怎么迭代",
        paragraphs: [
          "下一步我会优先补真实可交互的实验和项目复盘文章，让网站从“个人介绍页”逐步变成“可验证的成长记录”。排序算法可视化、学习工具原型和博客正文会是近期的主要更新方向。",
        ],
      },
    ],
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
