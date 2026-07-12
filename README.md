# Chase Chen Portfolio

Chase Chen 的个人技术作品集网站。作为一名软件工程大一学生，我用它记录 Web 开发学习过程、项目实践、技术文章和小型实验，并持续积累工程能力。

## 在线访问

- 网站：[https://www.chase0426.com](https://www.chase0426.com)
- GitHub：[https://github.com/b1rd426](https://github.com/b1rd426)

## 技术栈

- Next.js（App Router）
- TypeScript
- Tailwind CSS
- Vercel

## 页面结构

- `/`：个人简介、精选项目、学习记录与联系方式
- `/projects`：已完成及规划中的项目
- `/blog`：博客文章索引
- `/lab`：小工具与技术实验记录
- `/lab/sorting`：可操作的冒泡、选择与插入排序可视化
- `/about`：学习方向、技术栈与阶段目标

## 本地运行

需要 Node.js 18.18 或更高版本。

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看本地站点。

构建检查：

```bash
npm run build
npm run typecheck
npm test
```

排序算法测试覆盖空数组、单元素、重复元素、逆序数组与输入不可变性。

## 添加内容

当前站点使用本地 TypeScript 数据文件管理内容，不依赖数据库或后台系统。

### 添加项目

在 `data/projects.ts` 的 `projects` 数组中添加项目对象。可用字段包括 `status`、`featured`、`sourceUrl` 和 `demoUrl`；尚未上线的项目请不填写 `demoUrl`，页面会显示 `Demo: Coming soon`。

### 添加博客

在 `data/posts.ts` 的 `posts` 数组中添加文章卡片信息，包括标题、摘要、分类、日期、阅读时间和标签。当前版本展示文章索引，后续可逐步补充正文页面。

### 添加实验室内容

在 `data/experiments.ts` 的 `experiments` 数组中添加实验信息，包括说明、技术标签、当前状态和下一步计划。

## 部署

网站部署于 [Vercel](https://vercel.com)。将仓库导入 Vercel 后，可使用默认的 Next.js 构建配置完成部署；之后推送到部署分支会触发自动更新。

## 后续计划

- 持续补充真实完成的项目与学习复盘
- 为博客逐步增加可阅读的正文内容
- 将实验室中的规划条目按实际进度实现并更新状态
