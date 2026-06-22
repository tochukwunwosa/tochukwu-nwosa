import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity/lib/queries'
import BlogList from '@/components/blog/blog-list'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | Tochukwu Nwosa',
  description:
    'Thoughts on building products, fullstack engineering, and shipping software.',
  openGraph: {
    title: 'Blog | Tochukwu Nwosa',
    description:
      'Thoughts on building products, fullstack engineering, and shipping software.',
  },
}

export default async function BlogPage() {
  let posts: Post[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    // Sanity not yet configured — shows empty state
  }

  return <BlogList posts={posts} />
}
