import Link from "next/link";

import { Container } from "@/components/container";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SkillBadge } from "@/components/skill-badge";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const overview = [
  { value: String(projects.length).padStart(2, "0"), label: "展示项目" },
  { value: String(profile.focuses.length).padStart(2, "0"), label: "学习方向" },
  { value: "MVP", label: "当前阶段" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/40">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 top-14 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-brand-700 shadow-card">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                软件工程学生 · 持续学习与实践
              </p>
              <h1 className="text-balance mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-5xl lg:text-[3.45rem]">
                学习工程基础，
                <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">
                  把想法逐步做成项目
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {profile.intro}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700"
                >
                  查看项目
                </Link>
                <Link
                  href="/blog"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-500 hover:text-brand-700"
                >
                  阅读博客
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">{profile.name}</p>
                  <p className="mt-1 font-semibold text-ink-950">
                    {profile.role}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  记录中
                </span>
              </div>
              <dl className="mt-5 space-y-4">
                {profile.quickFacts.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <dt className="text-slate-500">{detail.label}</dt>
                    <dd className="text-right font-medium text-slate-800">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                {overview.map((item) => (
                  <div key={item.label}>
                    <p className="text-lg font-semibold text-ink-950">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="项目实践"
              title="精选项目"
              description="从小而明确的目标开始，练习需求梳理、实现过程与项目复盘。"
            />
            <Link
              className="shrink-0 text-sm font-medium text-brand-600 transition hover:text-brand-700"
              href="/projects"
            >
              查看全部项目 -&gt;
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="学习记录"
              title="最新博客"
              description="记录搭建项目时的选择、遇到的问题，以及正在建立的学习方法。"
            />
            <Link
              className="shrink-0 text-sm font-medium text-brand-600 transition hover:text-brand-700"
              href="/blog"
            >
              浏览文章 -&gt;
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="技术栈"
            title="目前使用与学习的工具"
            description="我仍处于基础积累阶段。以下技术分别代表已经在项目中练习的内容，以及正在系统学习的方向。"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {profile.skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <p className="mb-5 text-sm font-medium text-slate-500">
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill} name={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card sm:p-8">
              <SectionHeading eyebrow="学习路径" title="正在逐步建立的方向" />
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {profile.learningPath.map((item, index) => (
                  <div key={item.title}>
                    <span className="text-sm font-semibold text-brand-600">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-semibold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-brand-50 p-7 sm:p-8">
              <p className="text-sm font-medium text-brand-700">联系方式</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-950">
                查看我的代码记录
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                目前可以通过 GitHub 了解这个网站和后续小项目的更新进度。
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-medium text-brand-700 shadow-card transition hover:text-brand-600"
              >
                前往 GitHub -&gt;
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
