import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "关于我",
  description: "了解 Chase Chen 的学习方向、技术栈与阶段目标。",
  path: "/about",
});
export default function AboutPage() {
  return (
    <div className="editorial-page">
      <PageHero
        eyebrow="关于 / THE PATH"
        title="你好，我是 Chase Chen。"
        description={profile.intro}
      />
      <section className="editorial-section">
        <Container>
          <div className="editorial-about-grid">
            <div>
              <p className="garden-eyebrow">当前的方向</p>
              <h2>
                从基础出发，
                <br />
                在实践中生长。
              </h2>
              <p>
                我以 Web
                开发作为动手实践的主线，同时学习数据结构、算法与数据库，探索 AI
                工具在学习场景中的应用。
              </p>
              <div className="editorial-focuses">
                {profile.focuses.map((focus) => (
                  <span key={focus}>{focus}</span>
                ))}
              </div>
            </div>
            <div className="editorial-goals">
              <p className="garden-eyebrow">一步一步，认真完成</p>
              {profile.goals.map((goal, i) => (
                <div key={goal}>
                  <span>0{i + 1}</span>
                  <p>{goal}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="editorial-skills">
            <div className="editorial-section-heading">
              <h2>手边的工具</h2>
              <span>在使用中学习</span>
            </div>
            {profile.skillGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.skills.join(" / ")}</p>
              </div>
            ))}
          </div>
          <div className="editorial-contact">
            <h2>交流，从一个想法开始。</h2>
            <p>项目进展与代码更新，都留在 GitHub。</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="garden-text-link"
            >
              github.com/b1rd426 <ArrowUpRight size={18} />
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
