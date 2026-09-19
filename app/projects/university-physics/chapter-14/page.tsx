import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { physicsBase, physicsDemos } from "@/data/physics";
export const metadata: Metadata = {
  title: "第14章 · 真空中的静电场",
  alternates: { canonical: `${physicsBase}/chapter-14` },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="大学物理 / 第14章"
        title="真空中的静电场"
        description="先看清谁产生场、在哪里观察，再决定用微元叠加还是高斯定理。"
      />
      <Container className="py-12">
        <Link className="ph-link" href={physicsBase}>
          ← 全部章节
        </Link>
        <div className="ph-demo-grid">
          {physicsDemos.map((d, i) => (
            <Link
              className="ph-demo-card"
              href={`${physicsBase}/chapter-14/${d.slug}`}
              key={d.slug}
            >
              <div className="ph-card-art" aria-hidden="true">
                {d.slug === "finite-rod" ? (
                  <svg viewBox="0 0 400 140">
                    <path d="M45 75H245" stroke="#60a5fa" strokeWidth="15" />
                    {[60, 90, 120, 150, 180, 210, 240].map((x) => (
                      <path
                        key={x}
                        d={`M${x} 60v30`}
                        stroke="#111827"
                        strokeWidth="2"
                      />
                    ))}
                    <circle cx="330" cy="75" r="7" fill="#fbbf24" />
                    <path
                      d="M330 75h40m-8-6 8 6-8 6"
                      stroke="#34d399"
                      strokeWidth="3"
                      fill="none"
                    />
                    <text x="300" y="112" fill="#fbbf24" fontSize="18">
                      P
                    </text>
                  </svg>
                ) : d.slug === "gauss-sphere" ? (
                  <svg viewBox="0 0 400 140">
                    <circle
                      cx="200"
                      cy="70"
                      r="52"
                      fill="#60a5fa22"
                      stroke="#60a5fa"
                    />
                    <circle cx="200" cy="70" r="30" fill="#050b17" />
                    <circle
                      cx="200"
                      cy="70"
                      r="62"
                      fill="none"
                      stroke="#fbbf24"
                      strokeDasharray="5 5"
                    />
                    <path
                      d="M200 70h85m-8-6 8 6-8 6"
                      stroke="#34d399"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                ) : d.slug === "field-superposition" ? (
                  <svg viewBox="0 0 400 140">
                    <circle cx="110" cy="107" r="13" fill="#60a5fa"/><circle cx="290" cy="107" r="13" fill="#c4b5fd"/>
                    <path d="M110 107L200 65L290 107" stroke="#64748b" strokeDasharray="4 4" fill="none"/>
                    <path d="M200 65l38-25m-10 0h10v10" stroke="#60a5fa" strokeWidth="3" fill="none"/>
                    <path d="M200 65l-38-25m0 10V40h10" stroke="#c4b5fd" strokeWidth="3" fill="none"/>
                    <path d="M200 65V15m-6 8 6-8 6 8" stroke="#34d399" strokeWidth="3" fill="none"/>
                    <circle cx="200" cy="65" r="5" fill="#fbbf24"/>
                  </svg>
                ) : d.slug === "flux-angle" ? (
                  <svg viewBox="0 0 400 140">
                    <path d="M40 40H355m-8-5 8 5-8 5M40 70H355m-8-5 8 5-8 5M40 100H355m-8-5 8 5-8 5" stroke="#34d399" strokeWidth="2" fill="none"/>
                    <path d="M170 30L225 110" stroke="#60a5fa" strokeWidth="7"/>
                    <path d="M198 70l45-30m-10 0h10v10" stroke="#fbbf24" strokeWidth="3" fill="none"/>
                    <text x="260" y="128" fill="#fbbf24">ES cosθ</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 400 140">
                    <path d="M35 112H368M45 125V20" stroke="#475569" fill="none"/>
                    <path d="M55 100C130 100 142 24 200 24S270 100 350 100" stroke="#c4b5fd" strokeWidth="3" fill="none"/>
                    <path d="M225 37L297 99" stroke="#34d399" strokeWidth="3"/>
                    <circle cx="256" cy="63" r="6" fill="#fbbf24"/>
                    <text x="287" y="45" fill="#34d399">Eₓ = −U′</text>
                  </svg>
                )}
              </div>
              <p className="ph-kicker">
                0{i + 1} / {d.tag}
              </p>
              <h2>{d.title}</h2>
              <p>{d.description}</p>
              <span className="ph-link">开始探索 →</span>
            </Link>
          ))}
        </div>
        <div className="ph-panel">
          <h2>先选方法</h2>
          <p>
            距离和方向逐点变化、缺少足够对称性：从一个电荷微元开始。电荷分布具有球对称性：先选同心高斯面，再逐段统计包围电荷。
          </p>
        </div>
      </Container>
    </>
  );
}
