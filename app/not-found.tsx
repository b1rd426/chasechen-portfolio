import { Home, Layers3 } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";
import { GlowCard } from "@/components/glow-card";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-16 sm:py-20">
      <Container>
        <GlowCard className="mx-auto max-w-2xl p-8 text-center sm:p-12" tone="violet">
          <p className="text-sm font-semibold tracking-[0.24em] text-cyan-200">
            404
          </p>
          <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
            这个页面暂时不存在
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            链接可能已经更新，或者对应内容仍在整理中。你可以返回首页，或继续查看当前公开的项目。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-neon transition hover:bg-cyan-200"
            >
              <Home className="h-4 w-4" />
              返回首页
            </Link>
            <Link
              href="/projects"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-card transition hover:border-cyan-300/35 hover:text-white"
            >
              <Layers3 className="h-4 w-4" />
              查看项目
            </Link>
          </div>
        </GlowCard>
      </Container>
    </section>
  );
}
