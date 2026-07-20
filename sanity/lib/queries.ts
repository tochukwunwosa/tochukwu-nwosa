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
