import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { GardenScene } from "@/components/garden-scene";
import { profile } from "@/data/profile";
import { posts } from "@/data/posts";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const work = [
  {
    number: "01", title: "个人作品集", english: "A PLACE TO BEGIN",
    description: "把项目、学习与思考，放进一座持续生长的个人花园。",
    image: "kage-approach.webp", href: "/projects", label: "Web 开发 · 首版可用",
    className: "garden-work-main",
  },
  {
    number: "02", title: "算法实验室", english: "MAKE THE INVISIBLE VISIBLE",
    description: "从排序开始，让抽象的步骤变得可以观察。",
    image: "kage-lantern-court.webp", href: "/lab/sorting-visualizer", label: "算法 · 排序演示可用",
    className: "",
  },
  {
    number: "03", title: "物理的直觉", english: "UNDERSTAND THROUGH EXPLORATION",
    description: "在图形、公式与交互之间，理解看不见的场。",
    image: "kage-moonwater.webp", href: "/projects/university-physics", label: "物理 · 首版可用",
    className: "",
  },
];

export default function HomePage() {
  const published = posts.filter((post) => post.status === "已发布" && post.slug);
  return (
    <div className="garden-home">
      <GardenScene />
      <section id="arrival" className="garden-arrival garden-chapter">
        <div className="garden-hero-meta">
          <span>PERSONAL GARDEN / PORTFOLIO 2026</span>
          <span>代码 · 思考 · 探索</span>
        </div>
        <div className="garden-hero-intro">
          <p className="garden-eyebrow" data-reveal>始于好奇，行于实践</p>
          <h1 data-reveal>把想法，<br /><span>慢慢做成现实。</span></h1>
          <p data-reveal>你好，我是 Chase Chen。<br />在代码与世界之间，探索、学习、创造。</p>
          <a className="garden-text-link" href="#work" data-reveal>走进我的作品 <ArrowUpRight size={17} /></a>
        </div>
        <div className="garden-hero-signature" data-parallax="0.035" aria-hidden="true">
          <p className="garden-wordmark">Chase Chen<span>.</span></p>
          <p className="garden-signature-note">在持续生长的花园里，<br />留下每一次认真探索的痕迹。</p>
        </div>
        <div className="garden-hero-bottom">
          <a href="#about" className="garden-scroll-link"><span className="garden-scroll-line" />向下探索 <ArrowDown size={13} /></a>
          <span>LEARNING. BUILDING. BECOMING.</span>
          <span className="garden-edition">SCUT / SOFTWARE ENGINEERING</span>
        </div>
      </section>
      <section id="about" className="garden-chapter garden-about">
        <div className="garden-section-label" data-reveal><b>01</b><span>THE PATH / 关于我</span></div>
        <div className="garden-story-grid">
          <h2 data-reveal>从一个问题，<br />走到一次<br /><em>真正的实现。</em></h2>
          <div className="garden-story-copy" data-reveal>
            <p className="garden-lead">学习的意义，<br />在于亲手把它变成可以触碰的东西。</p>
            <p>{profile.intro}</p>
            <p>从一行代码开始，做小实验，记录遇到的问题，再带着新的理解继续向前。</p>
            <Link href="/about" className="garden-text-link">更多关于我 <ArrowUpRight size={17} /></Link>
            <div className="garden-facts"><span>华南理工大学</span><span>软件工程</span><span>持续学习中</span></div>
          </div>
        </div>
        <img className="garden-foreground garden-pine" data-parallax="-0.055" src="/garden/pine-tree.webp" alt="" width="1024" height="1438" loading="lazy" />
        <div className="garden-about-foot">保持好奇。认真完成。持续生长。<span>ONE STEP AT A TIME.</span></div>
      </section>
      <section id="work" className="garden-chapter garden-work">
        <div className="garden-section-label" data-reveal><b>02</b><span>SELECTED WORK / 作品</span></div>
        <div className="garden-section-top" data-reveal>
          <h2>沿途的作品。</h2>
          <Link href="/projects" className="garden-text-link">全部项目 <ArrowUpRight size={17} /></Link>
        </div>
        <p className="garden-section-description" data-reveal>一些正在生长的想法，一些已经可以亲手体验的小实验。</p>
        <div className="garden-work-grid">
          {work.map((item) => (
            <Link href={item.href} className={`garden-work-card ${item.className}`} key={item.number} data-reveal>
              <img src={`/garden/${item.image}`} alt="" width="1400" height="900" loading="lazy" />
              <span className="garden-card-number">{item.number} / {item.english}</span>
              <span className="garden-card-arrow"><ArrowUpRight size={21} /></span>
              <div className="garden-card-copy"><span>{item.label}</span><h3>{item.title}</h3><p>{item.description}</p></div>
            </Link>
          ))}
        </div>
        <img className="garden-foreground garden-maple" data-parallax="0.09" src="/garden/maple-leaves.webp" alt="" width="1536" height="1024" loading="lazy" />
      </section>
      <section id="journal" className="garden-chapter garden-journal">
        <div className="garden-section-label" data-reveal><b>03</b><span>FIELD NOTES / 学习手记</span></div>
        <div className="garden-journal-grid">
          <div data-reveal>
            <h2>写下过程，<br /><em>也留下思考。</em></h2>
            <p className="garden-section-description">记录第一次理解的瞬间，<br />也记录走过弯路之后的答案。</p>
            <Link href="/blog" className="garden-text-link">翻开手记 <ArrowUpRight size={17} /></Link>
          </div>
          <div className="garden-note-list" data-reveal>
            {published.map((post) => (
              <Link href={`/blog/${post.slug}`} className="garden-note" key={post.slug}>
                <div className="garden-note-meta"><span>{post.category} / {post.date}</span><ArrowUpRight size={20} /></div>
                <h3>{post.title}</h3><p>{post.excerpt}</p><span className="garden-note-time">{post.readTime}</span>
              </Link>
            ))}
            <div className="garden-learning">
              <p className="garden-eyebrow">CURRENT EXPLORATIONS / 正在探索</p>
              {profile.focuses.map((focus, index) => (
                <div key={focus}><span>0{index + 1}</span><p>{focus}</p><i /></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="garden-chapter garden-contact">
        <div className="garden-section-label" data-reveal><b>04</b><span>THE NEXT CHAPTER / 下一程</span></div>
        <p className="garden-contact-pre" data-reveal>花园还在生长，故事仍在继续。</p>
        <h2 data-reveal>下一个想法，<br /><em>从这里开始。</em></h2>
        <a href={profile.github} target="_blank" rel="noreferrer" className="garden-contact-link">在 GitHub 找到我 <ArrowUpRight size={24} /></a>
        <Link href="/lab" className="garden-contact-secondary">或者，先去实验室逛逛 <ArrowRight size={16} /></Link>
        <img className="garden-foreground garden-sakura" data-parallax="-0.07" src="/garden/sakura-branch.webp" alt="" width="1536" height="1024" loading="lazy" />
        <p className="garden-contact-end">THANK YOU FOR WANDERING.</p>
      </section>
    </div>
  );
}
