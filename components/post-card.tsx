import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import Link from "next/link";

import { GlowCard } from "@/components/glow-card";
import { StatusBadge } from "@/components/status-badge";
import { Tag } from "@/components/tag";
import type { Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <GlowCard as="article" interactive tone="emerald" className="h-full p-6">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 font-semibold text-cyan-100">
            <BookOpen className="h-3.5 w-3.5" />
            {post.category}
          </span>
          <StatusBadge status={post.status} />
        </div>
        <h3 className="mt-5 text-lg font-semibold leading-7 text-white transition group-hover:text-cyan-100">
          {post.slug ? (
            <Link className="focus-ring rounded-sm" href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
          {post.slug ? (
            <Link
              className="focus-ring ml-auto inline-flex items-center gap-1 rounded-full text-cyan-100 transition hover:text-white"
              href={`/blog/${post.slug}`}
              aria-label={`阅读 ${post.title}`}
            >
              阅读全文
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </GlowCard>
  );
}
