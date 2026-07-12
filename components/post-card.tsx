import { BookOpen, Clock3 } from "lucide-react";

import { GlowCard } from "@/components/glow-card";
import { StatusBadge } from "@/components/status-badge";
import { Tag } from "@/components/tag";
import type { Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <GlowCard as="article" tone="emerald" className="h-full p-6">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 font-semibold text-cyan-100">
            <BookOpen className="h-3.5 w-3.5" />
            {post.category}
          </span>
          <StatusBadge status={post.status} />
        </div>
        <h3 className="mt-5 text-lg font-semibold leading-7 text-white">
          {post.title}
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
        </div>
      </div>
    </GlowCard>
  );
}
