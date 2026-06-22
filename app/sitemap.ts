import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postSlugsForSitemapQuery } from "@/sanity/lib/queries";

const BASE_URL = "https://tochukwu-nwosa.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; _updatedAt: string }[] = [];
  try {
    posts = await client.fetch(postSlugsForSitemapQuery);
  } catch {
    // Sanity not configured
  }

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postUrls,
  ];
}
