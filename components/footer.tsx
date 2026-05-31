import { GitBranch } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <Container className="flex flex-col gap-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">Chase Chen</p>
          <p className="mt-1">软件工程学生 · 项目与学习记录</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="focus-ring rounded-full px-1 transition hover:text-cyan-100" href="/projects">
            项目
          </Link>
          <Link className="focus-ring rounded-full px-1 transition hover:text-cyan-100" href="/blog">
            博客
          </Link>
          <Link className="focus-ring rounded-full px-1 transition hover:text-cyan-100" href="/about">
            关于我
          </Link>
          <a
            className="focus-ring inline-flex rounded-full px-1 items-center gap-1.5 transition hover:text-cyan-100"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="打开 Chase Chen 的 GitHub"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>
          <span>联系：通过 GitHub</span>
        </div>
      </Container>
    </footer>
  );
}
