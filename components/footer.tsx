import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="garden-footer">
      <div><Link href="/" className="garden-footer-name">CHASE CHEN</Link><p>代码、思考与沿途的风景。</p></div>
      <nav aria-label="页脚导航"><Link href="/projects">作品</Link><Link href="/blog">手记</Link><Link href="/about">关于</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></nav>
      <span>BUILT WITH CURIOSITY.</span>
    </footer>
  );
}
