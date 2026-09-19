import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/data/posts";
export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className={`editorial-post ${post.slug ? "editorial-post-published" : ""}`}
    >
      <div className="editorial-post-date">
        <span>{post.slug ? post.date : "酝酿中"}</span>
        <span>{post.category}</span>
      </div>
      <div>
        <h2>
          {post.slug ? (
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          ) : (
            post.title
          )}
        </h2>
        <p>{post.excerpt}</p>
        {post.slug && (
          <div className="editorial-post-foot">
            <span>{post.readTime}</span>
            <Link className="garden-text-link" href={`/blog/${post.slug}`}>
              阅读全文 <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
