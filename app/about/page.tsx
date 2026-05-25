import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { SkillBadge } from "@/components/skill-badge";
import { Tag } from "@/components/tag";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解 Chase Chen 的学习方向、技术栈与阶段目标。",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="关于我"
        title="你好，我是 Chase Chen"
        description={profile.intro}
      />
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="当前学习方向"
                title="从基础开始积累"
                description="我以 Web 开发作为动手实践的主线，同时学习数据结构、算法和数据库基础，并关注 AI 工具在学习场景中的简单应用。"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {profile.focuses.map((focus) => (
                  <Tag key={focus}>{focus}</Tag>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
              <p className="text-sm font-medium text-brand-600">阶段目标</p>
              <ul className="mt-6 space-y-5">
                {profile.goals.map((goal, index) => (
                  <li key={goal} className="flex gap-4 text-slate-700">
                    <span className="text-sm font-semibold text-brand-600">
                      0{index + 1}
                    </span>
                    <span className="leading-7">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-y border-slate-200 bg-white/60 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="技术栈"
            title="使用中与学习中的技术"
            description="这里区分正在项目中使用的工具和仍在学习的基础方向，随着实践积累持续更新。"
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2">
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
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="联系"
            title="联系方式"
            description="目前最适合了解我学习进度的地方是 GitHub。我会在那里更新这个网站和未来完成的小项目。"
          />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            github.com/b1rd426
          </a>
        </Container>
      </section>
    </>
  );
}
