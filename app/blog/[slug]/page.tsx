import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from '@/components/portable-text'

export const revalidate = 60

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(postSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const post: Post = await client.fetch(postBySlugQuery, { slug })
    if (!post) return {}

    const ogImage = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : null

    const metaTitle = post.seo?.metaTitle || post.title
    const metaDescription = post.seo?.metaDescription || post.excerpt

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: post.tags,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: `/blog/${slug}`,
        type: 'article',
        publishedTime: post.publishedAt,
        images: ogImage
          ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: ogImage ? [ogImage] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let post: Post | null = null
  try {
    const { slug } = await params
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    notFound()
  }

  if (!post) notFound()

  const coverUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: coverUrl,
    datePublished: post.publishedAt,
    url: `https://tochukwu-nwosa.vercel.app/blog/${post.slug.current}`,
    author: {
      '@type': 'Person',
      name: 'Tochukwu Nwosa',
      url: 'https://tochukwu-nwosa.vercel.app',
    },
    publisher: {
      '@type': 'Person',
      name: 'Tochukwu Nwosa',
      url: 'https://tochukwu-nwosa.vercel.app',
    },
  })
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
    <article className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Blog
        </Link>

        {/* Cover image */}
        {coverUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5 mb-8">
            <Image
              src={coverUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-foreground/50 pb-8 border-b border-foreground/10 mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          {post.estimatedReadTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.estimatedReadTime} min read
            </span>
          )}
        </div>

        {/* Body */}
        {post.body && (
          <div className="prose-content">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        {/* Bottom back link */}
        <div className="mt-16 pt-8 border-t border-foreground/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
    </>
  )
}
