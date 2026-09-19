import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { ProjectPreview } from "@/components/project-preview";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const href = project.detailUrl || project.demoUrl;
  return (
    <article className={cn("editorial-project", className)}>
      {project.preview &&
        (href ? (
          <Link
            href={href}
            className="project-preview-link focus-ring"
            aria-label={`体验${project.title}`}
          >
            <ProjectPreview kind={project.preview} />
            <ArrowUpRight size={20} />
          </Link>
        ) : (
          <ProjectPreview kind={project.preview} />
        ))}
      <div className="editorial-project-body">
        <div className="editorial-meta">
          <span>{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h2>
          {href ? <Link href={href}>{project.title}</Link> : project.title}
        </h2>
        <p>{project.description}</p>
        <p className="editorial-stack">{project.stack.join(" / ")}</p>
        <div className="editorial-project-foot">
          {href && (
            <Link href={href} className="garden-text-link">
              进入作品 <ArrowUpRight size={16} />
            </Link>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="editorial-source"
            >
              查看源码 ↗
            </a>
          )}
        </div>
        <details className="editorial-detail">
          <summary>学习重点</summary>
          <p>{project.learningFocus}</p>
        </details>
      </div>
    </article>
  );
}
