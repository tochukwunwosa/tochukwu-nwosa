'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { projectsData } from '../constants/projectsData'
import ProjectCard from './ui/project-card';

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
      className="snap-start  py-24 bg-transparent "
    >

      {/* bg white overlay */}
      <div className='bg-overlay'/>
      <motion.div
        variants={fadeUp}
        custom={1}
        className=' z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl md:text-5xl font-title font-semibold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>
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
