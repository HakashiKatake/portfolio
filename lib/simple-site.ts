import fs from "node:fs";
import path from "node:path";
import type { Blog, PortfolioData, Project } from "@/components/types";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveProjectId(project: Project): string {
  return project.id ?? slugify(project.name);
}

export function resolveBlogSlug(blog: Blog): string {
  return blog.slug ?? slugify(blog.title);
}

export function getProjectById(data: PortfolioData, id: string): Project | undefined {
  return data.projects.find((project) => resolveProjectId(project) === id);
}

export function getBlogBySlug(data: PortfolioData, slug: string): Blog | undefined {
  return data.blogs.find((blog) => resolveBlogSlug(blog) === slug);
}

export function getSortedProjects(data: PortfolioData): Project[] {
  return [...data.projects].sort((a, b) => {
    const yearA = a.year ?? 0;
    const yearB = b.year ?? 0;
    if (yearA !== yearB) {
      return yearB - yearA;
    }
    return a.name.localeCompare(b.name);
  });
}

export function getFeaturedProjects(data: PortfolioData): Project[] {
  return getSortedProjects(data).filter((project) => Boolean(project.featured));
}

export function getSortedBlogs(data: PortfolioData): Blog[] {
  return [...data.blogs].sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    return timeB - timeA;
  });
}

export function getGameProjects(data: PortfolioData): Project[] {
  return getSortedProjects(data);
}

export function formatDate(date?: string): string {
  if (!date) {
    return "Undated";
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "Undated";
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isPublicAssetAvailable(assetPath?: string): boolean {
  if (!assetPath || !assetPath.startsWith("/")) {
    return false;
  }

  const normalizedPath = assetPath.replace(/^\/+/, "");
  const filePath = path.join(process.cwd(), "public", normalizedPath);
  return fs.existsSync(filePath);
}

export function hasPlayableBuild(project: Project): boolean {
  return Boolean(project.demo);
}

export function getProjectStats(data: PortfolioData): {
  totalProjects: number;
  totalGames: number;
  totalBlogs: number;
  totalJams: number;
} {
  return {
    totalProjects: data.projects.length,
    totalGames: getGameProjects(data).length,
    totalBlogs: data.blogs.length,
    totalJams: data.gameJams.length,
  };
}
