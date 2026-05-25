import { Tag } from "@/components/tag";
import type { Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-200 hover:border-slate-300 hover:shadow-lift">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
        <span className="font-medium text-brand-600">{post.category}</span>
        <span>{post.date}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-7 text-ink-950">
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
      <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
        {post.readTime}
      </p>
    </article>
  );
}
