'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import GridBG from '../ui/grid-bg';
import ContactForm from './form';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}


export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="contact"
      aria-label="Contact Tochukwu Nwosa."
      className="snap-start py-24 bg-transparent">

      {/* bg */}
      <GridBG />
      {/* bg white overlay */}
      <div className="absolute inset-0 bg-gradient-to-b !from-foreground/98  !to-foreground/98 dark:!from-background/98 dark:!to-background/98 z-0  " />
      
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className="relative text-center mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-5xl font-medium tracking-tight text-primary-900 mb-4"
          >
            {`Let’s Connect and Build Something Great`}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg md:text-xl font-normal text-primary-600 tracking-normal leading-relaxed max-w-2xl mx-auto"
          >
            {`Whether you have a question, collaboration idea, or project in mind—feel free to reach out. I'm always open to meaningful conversations and exciting opportunities.`}
          </motion.p>
        </div>
        <ContactForm />
      </main>
    </motion.section>      
  )
}
