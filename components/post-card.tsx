import { BookOpen, Clock3 } from "lucide-react";

import { Tag } from "@/components/tag";
import type { Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2 font-medium text-brand-600">
          <BookOpen className="h-3.5 w-3.5" />
          {post.category}
        </span>
        <span className="rounded-full bg-slate-50 px-3 py-1">{post.date}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-7 text-ink-950 transition group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {post.excerpt}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <p className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <Clock3 className="h-3.5 w-3.5" />
        {post.readTime}
      </p>
    </article>
  );
}
