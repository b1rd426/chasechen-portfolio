# Chase Chen Portfolio

个人技术作品集网站，用于展示项目、技术博客、实验作品和软件工程学习成长记录。

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel

## Pages

- `/` 首页：个人简介、精选项目、最新博客、技能栈与联系方式
- `/projects` 项目页：项目作品列表
- `/blog` 博客页：文章列表与分类
- `/lab` 实验室页：小工具与技术实验
- `/about` 关于我页：学习方向、技能、目标与联系入口

## Local Development

确保本地已安装 Node.js 18.18 或更高版本，然后运行：

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

生产构建检查：

```bash
npm run build
npm run start
```

## Content Management

站点 MVP 使用本地 TypeScript 数据文件，不需要数据库或后台系统。

### 添加新项目

编辑 `data/projects.ts`，在 `projects` 数组中新增对象：

```ts
{
  title: "项目名称",
  description: "项目说明",
  stack: ["Next.js", "TypeScript"],
  category: "Web 开发",
  status: "开发中",
  featured: true,
  learningFocus: "希望通过项目练习的重点",
}
```

`featured: true` 的项目会显示在首页精选项目区域。

### 添加新博客

编辑 `data/posts.ts`，在 `posts` 数组中新增对象：

```ts
{
  title: "文章标题",
  excerpt: "文章摘要",
  category: "项目复盘",
  date: "2026.06",
  readTime: "5 分钟阅读",
  tags: ["Next.js", "复盘"],
}
```

MVP 版本提供文章列表展示，后续可按需扩展 Markdown / MDX 详情页。

### 添加新实验

编辑 `data/experiments.ts`，向 `experiments` 数组添加实验卡片数据。每项实验包含技术方向 `tags` 与下一步计划 `nextStep`，便于真实记录推进过程。

## Deploy To Vercel

1. 将项目推送到 GitHub 仓库。
2. 登录 [Vercel](https://vercel.com)，选择 **Add New Project**。
3. 导入 GitHub 上的 `chasechen-portfolio` 仓库。
4. Vercel 会自动识别 Next.js 配置，保留默认构建设置并点击 **Deploy**。
5. 后续每次推送到部署分支，Vercel 会自动重新部署。

此 MVP 不依赖环境变量、数据库或外部 API。
