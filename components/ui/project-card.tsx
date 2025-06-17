'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  if (!project) return null;

  return (
    <motion.div 
      ref={ref} 
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} 
      transition={{ duration: 0.4 }}
      className='space-y-10 group relative border-b-2 border-foreground/5 dark:border-foreground/10 pb-12 last:border-none'
    >
      <motion.div 
        variants={fadeUp} 
        custom={1} 
        className="flex flex-col lg:flex-row gap-8 items-center"
      >
        {/* overlay */}
        <div className='hidden lg:block absolute inset-0 bg-foreground/30 hover:bg-foreground/0 dark:bg-background/30 dark:hover:bg-background/0 transition-all duration-500' />
        {/* image */}
        <motion.div 
          variants={slideLeft} 
          custom={1} 
          className='w-full lg:w-1/2 aspect-video relative overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-in-out'
        >
          <Image src={project.image} width={400} height={400} alt='image of project' className='border w-full h-full  transform transition-all duration-700' />
        </motion.div>
        <div className='w-full lg:w-1/2 space-y-6'>
          <motion.h3 variants={fadeUp} custom={2} className="text-3xl font-bold transition-all duration-300">{project.title}</motion.h3>
          <motion.p variants={fadeUp} custom={3} className="text-lg leading-relaxed">{project.description}</motion.p>
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-wrap gap-3"
          >
            {project.technologies.map((tech: string, idx: number) => (
              <motion.span 
                variants={fadeUp}
                custom={idx + 1} 
                key={tech}
                className="px-4 py-2 text-sm font-medium bg-foreground/10 rounded-lg"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
          <div
            className="relative flex w-fit gap-6 pt-4"
          >
            {
              project.githubLink ?
                <motion.a

                  variants={fadeUp}
                  custom={5} 
                  className="flex items-center gap-2 text-foreground/70 hover:text-foreground/90 hover:scale-105 transition-all duration-300"
                  tabIndex={0}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub link"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  <span className="font-medium">View Code</span>
                </motion.a>
                : null
            }

            <motion.a
              variants={fadeUp}
              custom={6}
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground/90 transition-all hover:scale-105 duration-300"
              tabIndex={0}
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
              </svg>
              <span className="font-medium">Live Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
