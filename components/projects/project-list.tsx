'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, FolderGit2 } from 'lucide-react'
import type { ProjectCardData } from '@/lib/projects'
import ProjectIndexCard from './project-index-card'

export default function ProjectList({ projects }: { projects: ProjectCardData[] }) {
  const products = projects.filter((p) => p.category === 'product')
  const clients = projects.filter((p) => p.category === 'client')

  const groups = [
    { title: 'Personal products', items: products },
    { title: 'Client work', items: clients },
  ].filter((group) => group.items.length > 0)

  return (
    <section className="min-h-screen py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back to portfolio */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Projects</h1>
          <p className="text-lg text-foreground/60 max-w-xl">
            Products I built and client work I shipped. The ones with a case study go
            into the problem, the stack, and the decisions behind them.
          </p>
        </motion.div>

        {/* Groups */}
        {projects.length > 0 ? (
          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50 mb-6">
                  {group.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {group.items.map((project, index) => (
                    <ProjectIndexCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center border border-foreground/8 rounded-xl bg-foreground/2"
          >
            <div className="p-4 rounded-full bg-foreground/5 mb-4">
              <FolderGit2 className="w-8 h-8 text-foreground/30" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
            <p className="text-foreground/50 text-sm max-w-xs">
              Projects will appear here once published via the Sanity Studio.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
