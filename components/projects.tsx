'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import GridBG from './ui/grid-bg'
import ProjectCard from './ui/project-card'
import ProjectsData from '../constants/ProjectsData.json'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="project"
      aria-label="Tochukwu Nwosa's projects"
      className="relative py-24 bg-transparent "
    >
      <GridBG />

      {/* bg white overlay */}
      <div className="absolute inset-0 bg-gradient-to-b !from-foreground/98  !to-foreground/98 dark:!from-background/98 dark:!to-background/98" />
      <motion.div
        variants={fadeUp}
        custom={1}
        className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl md:text-5xl font-title font-semibold mb-12 text-center">Featured Projects</motion.h2>
        {/* projects card */}
        <motion.div
          variants={fadeUp}
          custom={3} className='space-y-20'>
          {ProjectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
