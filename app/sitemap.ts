import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  postSlugsForSitemapQuery,
  projectSlugsForSitemapQuery,
} from "@/sanity/lib/queries";

const BASE_URL = "https://tochukwu-nwosa.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; _updatedAt: string }[] = [];
  let projects: { slug: string; _updatedAt: string }[] = [];
  try {
    [posts, projects] = await Promise.all([
      client.fetch(postSlugsForSitemapQuery),
      client.fetch(projectSlugsForSitemapQuery),
    ]);
  } catch {
    // Sanity not configured
  }

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectUrls,
    ...postUrls,
  ];
}
