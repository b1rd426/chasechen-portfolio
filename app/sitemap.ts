import type { MetadataRoute } from "next";

import { experiments } from "@/data/experiments";
import { physicsRoutes } from "@/data/physics";
import { posts } from "@/data/posts";

const baseUrl = "https://www.chase0426.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/blog", "/lab", "/about"];
  const blogRoutes = posts
    .filter((post) => post.slug)
    .map((post) => `/blog/${post.slug}`);
  const labRoutes = experiments
    .filter((experiment) => experiment.demoUrl?.startsWith("/"))
    .map((experiment) => experiment.demoUrl as string);

  return Array.from(new Set([...staticRoutes, ...blogRoutes, ...labRoutes, ...physicsRoutes])).map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
