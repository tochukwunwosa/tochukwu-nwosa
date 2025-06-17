'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { projectsData } from '../constants/projectsData'
import ProjectCard from './ui/project-card';
// import GridBG from './ui/grid-bg'

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
      className="snap-start relative py-24 "
    >

      {/* <GridBG/> */}

      <motion.div
        variants={fadeUp}
        custom={1}
        className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className=" text-center mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg md:text-xl font-normal tracking-normal leading-relaxed max-w-2xl mx-auto">Explore a selection of projects that highlight my experience and capabilities.</motion.p>
        </div>
        {/* projects card */}
        <motion.div
          variants={fadeUp}
          custom={3} className='space-y-20'>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
