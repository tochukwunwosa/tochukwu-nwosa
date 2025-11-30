'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image'
import type { Project } from '@/constants/projectsData';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (!project) return null;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className='group relative border-b border-foreground/5 pb-12 last:border-none'
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* IMAGE */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className='w-full lg:w-1/2 relative overflow-hidden rounded-lg border border-foreground/10'
        >
          <Link
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-video relative overflow-hidden group/image"
          >
            <Image
              src={project.image}
              width={666}
              height={375}
              alt={`Screenshot of ${project.title}`}
              className='w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105'
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-foreground/0 group-hover/image:bg-foreground/5 transition-colors duration-300" />

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-foreground text-background text-xs font-semibold rounded">
                Featured
              </div>
            )}
          </Link>
        </motion.div>

        {/* CONTENT */}
        <div className='w-full lg:w-1/2 space-y-4'>

          {/* Category badge */}
          <motion.div variants={fadeUp} custom={2}>
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-foreground/5 text-foreground/70 rounded border border-foreground/10 uppercase tracking-wide">
              {project.category === "product" ? "Personal Project" : "Client Work"}
            </span>
          </motion.div>

          {/* Title & Subtitle */}
          <motion.div variants={fadeUp} custom={2}>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {project.title}
            </h3>
            <p className="text-base md:text-lg text-foreground/80 font-medium">
              {project.subtitle}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-sm md:text-base leading-relaxed text-foreground/70"
          >
            {project.description}
          </motion.p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-3 pt-2"
            >
              {project.metrics.map((metric, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold text-foreground/80"
                >
                  ✓ {metric}
                </span>
              ))}
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="flex flex-wrap gap-2"
          >
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-foreground/5 text-foreground/70 rounded border border-foreground/10"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            variants={fadeUp}
            custom={6}
            className="flex flex-wrap gap-4 pt-2"
          >

            <Link
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event={`project:open:${project.title}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group/link"
            >
              <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Live Demo</span>
            </Link>

            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event={`project:github:${project.title}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group/link"
              >
                <svg className="w-4 h-4 transition-transform group-hover/link:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>View Code</span>
              </Link>
            )}
          </motion.div>
        </div >
      </div >
    </motion.div >
  )
}