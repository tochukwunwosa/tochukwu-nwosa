import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/queries";

const BASE_URL = "https://tochukwu-nwosa.vercel.app";

export const revalidate = 60;

export async function GET() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    // Sanity not configured
  }

  const blogSection = posts.length
    ? posts
        .map((post) => {
          const summary = post.excerpt ? `: ${post.excerpt}` : "";
          return `- [${post.title}](${BASE_URL}/blog/${post.slug.current})${summary}`;
        })
        .join("\n")
    : "- No posts published yet.";

  const body = `# Tochukwu Nwosa

> Fullstack engineer building and shipping production web software. React and Next.js on the frontend, Node.js/NestJS/MongoDB on the backend. Writes about real bugs found and fixed in production, including MyTreda.

## Blog

${blogSection}

## About

- [About](${BASE_URL}/#about): Background, experience, and what I work on.
- [Projects](${BASE_URL}/#project): Shipped projects, including MyTreda.
- [Contact](${BASE_URL}/#contact): How to reach me.
- [Blog](${BASE_URL}/blog): Read about my experiences, bugs and solutions
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
