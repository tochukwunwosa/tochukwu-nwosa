import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'

export interface SanityImage {
  asset: { _ref: string; _type: string }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface PostSeo {
  metaTitle?: string
  metaDescription?: string
  noindex?: boolean
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  tags?: string[]
  estimatedReadTime?: number
  seo?: PostSeo
}

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  tags,
  estimatedReadTime
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  tags,
  estimatedReadTime,
  seo
}`

export const postSlugsQuery = groq`*[_type == "post"]{ "slug": slug.current }`

export const postSlugsForSitemapQuery = groq`*[_type == "post"]{ "slug": slug.current, _updatedAt }`

/* -------------------------------------------------------------------------
 * Projects & case studies
 * ---------------------------------------------------------------------- */

export type StackCategory = 'frontend' | 'backend' | 'data' | 'infra' | 'tooling'

export interface StackItem {
  _key?: string
  name: string
  category: StackCategory
  why?: string
}

export interface Decision {
  _key?: string
  title: string
  body?: PortableTextBlock[]
}

export interface Outcome {
  _key?: string
  value: string
  label: string
}

export interface Project {
  _id: string
  _updatedAt?: string
  title: string
  slug: { current: string }
  subtitle: string
  description: string
  mainImage?: SanityImage
  category: 'product' | 'client'
  featured: boolean
  order?: number
  liveDemoLink: string
  githubLink?: string
  technologies?: string[]
  metrics?: string[]
  hasCaseStudy?: boolean
  role?: string
  timeline?: string
  status?: string
  overview?: PortableTextBlock[]
  problem?: PortableTextBlock[]
  stack?: StackItem[]
  decisions?: Decision[]
  challenges?: PortableTextBlock[]
  outcomes?: Outcome[]
  results?: PortableTextBlock[]
  retrospective?: PortableTextBlock[]
  publishedAt?: string
  seo?: PostSeo
}

/** Card-level fields — everything the homepage and projects index need. */
const projectCardFields = `
  _id,
  title,
  slug,
  subtitle,
  description,
  mainImage,
  category,
  featured,
  order,
  liveDemoLink,
  githubLink,
  technologies,
  metrics,
  hasCaseStudy
`

export const projectsQuery = groq`*[_type == "project"] | order(order asc, title asc) {
  ${projectCardFields}
}`

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc, title asc) {
  ${projectCardFields}
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  ${projectCardFields},
  _updatedAt,
  role,
  timeline,
  status,
  overview,
  problem,
  stack,
  decisions,
  challenges,
  outcomes,
  results,
  retrospective,
  publishedAt,
  seo
}`

/** Only projects with a published case study get their own route. */
export const projectSlugsQuery = groq`*[_type == "project" && hasCaseStudy == true]{ "slug": slug.current }`

export const projectSlugsForSitemapQuery = groq`*[_type == "project" && hasCaseStudy == true]{
  "slug": slug.current,
  _updatedAt
}`
