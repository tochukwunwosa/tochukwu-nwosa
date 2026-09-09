'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { ProjectCardData } from '@/lib/projects'

export default function ProjectIndexCard({
  project,
  index,
}: {
  project: ProjectCardData
  index: number
}) {
  const href = project.hasCaseStudy ? `/projects/${project.slug}` : project.liveDemoLink
  const isExternal = !project.hasCaseStudy

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group flex flex-col h-full bg-card border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/25 hover:shadow-md transition-all duration-200"
      >
        {/* Cover image */}
        <div className="relative w-full aspect-video bg-foreground/5 overflow-hidden">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-foreground/5 to-transparent" />
          )}
          <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-medium rounded bg-background/85 backdrop-blur border border-foreground/10 uppercase tracking-wide">
            {project.category === 'product' ? 'Personal' : 'Client'}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 gap-3">
          <div>
            <h2 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
              {project.title}
            </h2>
            <p className="text-sm text-foreground/70 mt-1">{project.subtitle}</p>
          </div>

          <p className="text-sm text-foreground/65 leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-foreground/8 text-xs">
            <span className="text-foreground/50">
              {project.hasCaseStudy ? 'Case study' : 'Live site'}
            </span>
            <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {project.hasCaseStudy ? (
                <>
                  Read <ArrowRight className="w-3 h-3" />
                </>
              ) : (
                <>
                  Visit <ExternalLink className="w-3 h-3" />
                </>
              )}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
