import { GitBranch } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
      <Container className="flex flex-col gap-4 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-slate-800">Chase Chen</p>
          <p className="mt-1">软件工程学生的项目与学习记录</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link className="transition hover:text-brand-600" href="/about">
            关于我
          </Link>
          <a
            className="inline-flex items-center gap-1.5 transition hover:text-brand-600"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>
          <span>联系：GitHub</span>
        </div>
      </Container>
    </footer>
  );
}
