import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { physicsBase } from "@/data/physics";
export const metadata: Metadata = {title:"第15章 · 静电场中的导体和电介质",
  alternates:{canonical:physicsBase+"/chapter-15"}};
export default function Page() {return <>
  <PageHero eyebrow="大学物理 / 第15章" title="静电场中的导体和电介质"
    description="先看电荷能否移动、哪些条件被固定，再解释场、电势与能量的变化。"/>
  <Container className="py-12"><Link className="ph-link" href={physicsBase}>← 全部章节</Link>
    <div className="ph-demo-grid"><Link className="ph-demo-card" href={physicsBase+"/chapter-15/capacitor"}>
      <div className="ph-card-art"><svg viewBox="0 0 400 140" aria-hidden="true"><rect x="70" y="70" width="260" height="40" fill="#a78bfa55"/><path d="M60 30H340 M60 110H340" stroke="#60a5fa" strokeWidth="7"/><text x="200" y="62" textAnchor="middle" fill="#93c5fd">+ + + + +</text><text x="200" y="97" textAnchor="middle" fill="#c4b5fd">介质</text></svg></div>
      <p className="ph-kicker">01 / 几何 · 约束 · 能量</p><h2>电容器：接电源与断电源</h2>
      <p>同样插入介质，为何能量变化不同？比较两种填充几何，逐项核对电场、电荷与电源功。</p><span className="ph-link">开始探索 →</span>
    </Link></div><div className="ph-panel"><h2>先选判断入口</h2><p>导体问题先找等势与电荷约束；介质问题先区分自由电荷与束缚电荷；电容器变化先确定几何，再确定电源连接条件。</p></div>
  </Container></>;}
