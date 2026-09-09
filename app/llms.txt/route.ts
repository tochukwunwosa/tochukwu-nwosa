import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/queries";
import { getProjects } from "@/lib/projects";

const BASE_URL = "https://tochukwu-nwosa.vercel.app";

export const revalidate = 60;

export async function GET() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    // Sanity not configured
  }

  const projects = await getProjects();

  const blogSection = posts.length
    ? posts
        .map((post) => {
          const summary = post.excerpt ? `: ${post.excerpt}` : "";
          return `- [${post.title}](${BASE_URL}/blog/${post.slug.current})${summary}`;
        })
        .join("\n")
    : "- No posts published yet.";

  const projectSection = projects.length
    ? projects
        .map((project) => {
          const url = project.hasCaseStudy
            ? `${BASE_URL}/projects/${project.slug}`
            : project.liveDemoLink;
          const stack = project.technologies.length
            ? ` Built with ${project.technologies.join(", ")}.`
            : "";
          return `- [${project.title}](${url}): ${project.subtitle}.${stack}`;
        })
        .join("\n")
    : "- No projects published yet.";

  const body = `# Tochukwu Nwosa

> Fullstack engineer building and shipping production web software. React and Next.js on the frontend, Node.js/NestJS/MongoDB on the backend. Writes about real bugs found and fixed in production, including MyTreda.

## Projects

${projectSection}

## Blog

${blogSection}

## About

- [About](${BASE_URL}/#about): Background, experience, and what I work on.
- [Projects](${BASE_URL}/projects): Case studies covering the problem, stack, and decisions behind each build.
- [Contact](${BASE_URL}/#contact): How to reach me.
- [Blog](${BASE_URL}/blog): Read about my experiences, bugs and solutions
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
