import {
  ArrowRight,
  BookOpenText,
  Brain,
  Cpu,
  FlaskConical,
  GitBranch,
  Layers3,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  Terminal,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import { AnimatedTechMarquee } from "@/components/animated-tech-marquee";
import { BentoGrid } from "@/components/bento-grid";
import { Container } from "@/components/container";
import { ExperimentCard } from "@/components/experiment-card";
import { GlowCard } from "@/components/glow-card";
import { GradientButton } from "@/components/gradient-button";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SectionHeader } from "@/components/section-header";
import { SkillBadge } from "@/components/skill-badge";
import { experiments } from "@/data/experiments";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const overview = [
  {
    value: String(projects.length).padStart(2, "0"),
    label: "展示项目",
    icon: Layers3,
  },
  {
    value: String(profile.focuses.length).padStart(2, "0"),
    label: "学习方向",
    icon: Brain,
  },
  { value: "首版", label: "当前阶段", icon: Rocket },
];

const currentStatus = [
  { label: "当前主线", value: "Web 开发与作品集迭代" },
  { label: "基础学习", value: "数据结构、算法与数据库" },
  { label: "正在探索", value: "算法可视化与 AI 学习工具" },
  { label: "学习阶段", value: "华南理工大学软件工程大一" },
];

const recordLines = [
  { label: "身份", value: "Chase Chen · 华南理工大学软件工程大一学生" },
  { label: "正在构建", value: "作品集、算法实验室、AI 学习工具原型" },
  { label: "长期目标", value: "把想法逐步做成清晰、可用、能复盘的小产品" },
];

const nowBuilding = [
  {
    title: "作品集迭代",
    description:
      "把个人介绍、项目记录、博客和实验室连接成清晰的成长档案。",
    icon: Rocket,
    accent: "首版可用",
  },
  {
    title: "算法实验室",
    description:
      "从排序、二分查找等基础主题开始，把抽象步骤拆成可观察的过程。",
    icon: Workflow,
    accent: "规划中",
  },
  {
    title: "AI 工具探索",
    description:
      "围绕学习笔记、复习计划和内容整理，尝试小而实用的产品原型。",
    icon: Cpu,
    accent: "构思中",
  },
];

const featuredProjects = projects.filter((project) => project.featured);
const labPreview = experiments.slice(0, 3);
const signalItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "组件拆分",
  "响应式页面",
  "算法可视化",
  "AI 工具探索",
  "项目复盘",
  "华工软工大一",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-300/14 blur-3xl" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <RevealOnScroll>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-cyan-100 shadow-card backdrop-blur">
                <Sparkles className="h-4 w-4" />
                软件工程学生 · Web 开发 · 算法实验 · AI 工具
              </p>
              <h1 className="text-balance mt-7 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Chase Chen
                <span className="text-gradient block">
                  把想法快速做成可用产品
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {profile.intro}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <GradientButton href="/projects" icon={<Layers3 className="h-4 w-4" />}>
                  查看项目
                </GradientButton>
                <GradientButton
                  href="/lab"
                  variant="secondary"
                  icon={<FlaskConical className="h-4 w-4" />}
                >
                  进入实验室
                </GradientButton>
                <GradientButton
                  href="/blog"
                  variant="secondary"
                  icon={<BookOpenText className="h-4 w-4" />}
                >
                  阅读博客
                </GradientButton>
                <GradientButton
                  href={profile.github}
                  external
                  variant="ghost"
                  icon={<GitBranch className="h-4 w-4" />}
                  ariaLabel="打开 Chase Chen 的 GitHub"
                >
                  GitHub
                </GradientButton>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {overview.map((item) => (
                  <div
                    key={item.label}
                    className="border-l border-white/10 pl-4"
                  >
                    <item.icon className="mb-2 h-4 w-4 text-cyan-200" />
                    <p className="text-xl font-semibold text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <GlowCard className="motion-safe:animate-[float-slow_7s_ease-in-out_infinite] p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <Terminal className="h-3.5 w-3.5" />
                    成长记录
                  </span>
                </div>
                <div className="space-y-4 text-sm leading-7 text-slate-300">
                  {recordLines.map((line) => (
                    <div key={line.label}>
                      <p className="text-xs font-semibold text-cyan-200">
                        {line.label}
                      </p>
                      <p className="mt-1 text-slate-100">{line.value}</p>
                    </div>
                  ))}
                </div>
                <dl className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                  {currentStatus.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-semibold text-slate-500">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-slate-100">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </GlowCard>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <AnimatedTechMarquee items={signalItems} />

      <section className="py-14 sm:py-18 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeader
              eyebrow="当前主线"
              title="正在建设的三个方向"
              description="首页先让访问者快速理解我是谁，再通过项目、实验和学习记录看到持续动手的轨迹。"
            />
            <BentoGrid className="mt-9">
              {nowBuilding.map((item, index) => (
                <GlowCard
                  key={item.title}
                  interactive
                  tone={index === 0 ? "cyan" : index === 1 ? "violet" : "emerald"}
                  className="md:col-span-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-cyan-100">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
                      {item.accent}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </GlowCard>
              ))}
            </BentoGrid>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-14 sm:py-18 lg:py-20">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeader
                eyebrow="项目实践"
                title="精选项目"
                description="项目卡片保留真实状态：已上线的给链接，尚未完成的只展示计划和学习重点。"
              />
              <Link
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-1 text-sm font-semibold text-cyan-100 transition hover:text-white"
                href="/projects"
              >
                查看全部项目
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  className={index === 0 ? "lg:col-span-6" : "lg:col-span-3"}
                />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-14 sm:py-18 lg:py-20">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeader
                eyebrow="实验室"
                title="让实验室成为学习的仪表盘"
                description="实验室聚焦算法可视化、学习效率工具和 AI 辅助流程，展示下一步要验证的小实验。"
              />
              <Link
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-1 text-sm font-semibold text-cyan-100 transition hover:text-white"
                href="/lab"
              >
                进入实验室
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {labPreview.map((experiment) => (
                <ExperimentCard
                  key={experiment.title}
                  experiment={experiment}
                />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-14 sm:py-18 lg:py-20">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeader
                eyebrow="学习记录"
                title="博客与学习记录"
                description="博客区更克制一些，用来记录项目复盘、Web 开发实践和逐步形成的学习方法。"
              />
              <Link
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-1 text-sm font-semibold text-cyan-100 transition hover:text-white"
                href="/blog"
              >
                浏览文章
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-14 sm:py-18 lg:py-20">
        <Container>
          <RevealOnScroll>
            <SectionHeader
              eyebrow="技术栈"
              title="目前使用与学习的工具"
              description="仍处于基础积累阶段，所以这里把项目中正在实践的技术和系统学习的方向分开呈现。"
            />
            <BentoGrid className="mt-9">
              {profile.skillGroups.map((group) => {
                const GroupIcon = group.title === "正在学习" ? Brain : Rocket;

                return (
                  <GlowCard key={group.title} className="md:col-span-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-cyan-100">
                        <GroupIcon className="h-4 w-4" />
                      </span>
                      <h3 className="font-semibold text-white">
                        {group.title}
                      </h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <SkillBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </GlowCard>
                );
              })}
            </BentoGrid>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <RevealOnScroll>
            <GlowCard className="p-7 sm:p-8" tone="pink">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                    <Target className="h-4 w-4" />
                    下一步
                  </p>
                  <h2 className="text-balance mt-4 text-2xl font-semibold text-white sm:text-3xl">
                    继续把真实学习过程沉淀成作品
                  </h2>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                    这个网站会随着项目、实验和学习笔记持续更新。最适合查看进度的入口是 GitHub，也可以从项目页看到每个作品的当前状态。
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <GradientButton
                    href={profile.github}
                    external
                    icon={<GitBranch className="h-4 w-4" />}
                    ariaLabel="打开 Chase Chen 的 GitHub"
                  >
                    前往 GitHub
                  </GradientButton>
                  <GradientButton
                    href="/projects"
                    variant="secondary"
                    icon={<Lightbulb className="h-4 w-4" />}
                  >
                    查看项目路线
                  </GradientButton>
                </div>
              </div>
            </GlowCard>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
