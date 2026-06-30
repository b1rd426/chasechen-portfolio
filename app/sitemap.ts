import type { MetadataRoute } from "next";

import { experiments } from "@/data/experiments";
import { posts } from "@/data/posts";

const baseUrl = "https://www.chase0426.com";
const lastModified = new Date("2026-06-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/blog", "/lab", "/about"];
  const blogRoutes = posts
    .filter((post) => post.slug)
    .map((post) => `/blog/${post.slug}`);
  const labRoutes = experiments
    .filter((experiment) => experiment.demoUrl?.startsWith("/"))
    .map((experiment) => experiment.demoUrl as string);

  return [...staticRoutes, ...blogRoutes, ...labRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
