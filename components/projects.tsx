'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { projectsData } from '@/constants/projectsData'
import ProjectCard from '@/components/ui/project-card';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="project"
      aria-label="Tochukwu Nwosa's projects"
      className="snap-start relative py-20 md:py-24"
    >
      <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Personal products and client work showcasing performance optimization,
            modern architecture, and user-focused design
          </motion.p>
        </div>

        {/* PROJECTS */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className='space-y-16 md:space-y-20'
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* FOOTER CTA */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="text-center mt-16 md:mt-20 pt-12 border-t border-foreground/5"
        >
          <p className="text-base md:text-lg text-foreground/70 mb-6">
            Want to see more? Check out my other work on GitHub.
          </p>
          <Link
            href="https://github.com/tochukwunwosa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>View All Projects on GitHub</span>
          </Link>
        </motion.div>
      </div>
    </motion.section >
  )
}