'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/queries'
import { ArrowRight, Clock } from 'lucide-react'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostCard({ post, index }: { post: Post; index: number }) {
  const coverUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).height(450).url()
    : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Link
        href={`/blog/${post.slug.current}`}
        className="group flex flex-col h-full bg-card border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/25 hover:shadow-md transition-all duration-200"
      >
        {/* Cover image */}
        <div className="relative w-full aspect-video bg-foreground/5 overflow-hidden">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-foreground/5 to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 gap-3">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-foreground/65 leading-relaxed line-clamp-2 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Footer meta */}
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-foreground/8 text-xs text-foreground/50">
            <span>{formatDate(post.publishedAt)}</span>
            <div className="flex items-center gap-3">
              {post.estimatedReadTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.estimatedReadTime} min
                </span>
              )}
              <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
