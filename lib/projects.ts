import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import type { Project as SanityProject } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { projectsData } from '@/constants/projectsData'

/**
 * Normalised shape the cards render, so a card does not care whether the
 * project came from Sanity or from the local fallback list.
 */
export interface ProjectCardData {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  imageUrl: string | null
  imageAlt: string
  category: 'product' | 'client'
  featured: boolean
  liveDemoLink: string
  githubLink?: string
  technologies: string[]
  metrics: string[]
  hasCaseStudy: boolean
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function fromSanity(project: SanityProject): ProjectCardData {
  return {
    id: project._id,
    slug: project.slug.current,
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    imageUrl: project.mainImage
      ? urlFor(project.mainImage).width(888).height(500).url()
      : null,
    imageAlt: project.mainImage?.alt || `Screenshot of ${project.title}`,
    category: project.category,
    featured: project.featured,
    liveDemoLink: project.liveDemoLink,
    githubLink: project.githubLink,
    technologies: project.technologies ?? [],
    metrics: project.metrics ?? [],
    hasCaseStudy: Boolean(project.hasCaseStudy),
  }
}

/**
 * Local fallback. Kept so the homepage still renders before content is
 * migrated into Sanity, and if a fetch fails at build time. Once every
 * project lives in Sanity this list — and `constants/projectsData.ts` —
 * can be deleted.
 */
function fromLocal(): ProjectCardData[] {
  return projectsData.map((project) => ({
    id: String(project.id),
    slug: slugify(project.title),
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    imageUrl: project.image,
    imageAlt: `Screenshot of ${project.title}`,
    category: project.category,
    featured: project.featured,
    liveDemoLink: project.liveDemoLink,
    githubLink: project.githubLink,
    technologies: project.technologies,
    metrics: project.metrics ?? [],
    hasCaseStudy: false,
  }))
}

export async function getProjects(): Promise<ProjectCardData[]> {
  try {
    const projects: SanityProject[] = await client.fetch(projectsQuery)
    if (projects?.length) return projects.map(fromSanity)
  } catch {
    // Sanity not configured or unreachable — fall through to the local list.
  }
  return fromLocal()
}
