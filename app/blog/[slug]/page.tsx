import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

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
    return {
      title: `${post.title}`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.mainImage
          ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
          : [],
      },
    }
  } catch {
    return {}
  }
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5">
            <Image
              src={urlFor(value).width(1000).url()}
              alt={value.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-foreground/45 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-12 mb-4 tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-10 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-8 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-foreground/80">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/50 pl-5 my-8 text-foreground/65 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-foreground/80">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-foreground/10 text-sm font-mono text-foreground/90">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/70 transition-colors"
      >
        {children}
      </a>
    ),
  },
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

  return (
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
  )
}
