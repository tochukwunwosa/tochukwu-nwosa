'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import ContactForm from './form';
// import GridBG from '../ui/grid-bg'

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
      className="snap-start relative py-24">

         {/* <GridBG/> */}
      
      <main className='max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className="text-center mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4"
          >
            {`Let’s Connect and Build Something Great`}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg md:text-xl font-normal tracking-normal leading-relaxed max-w-2xl mx-auto"
          >
            {`Whether you have a question, collaboration idea, or project in mind—feel free to reach out. I'm always open to meaningful conversations and exciting opportunities.`}
          </motion.p>
        </div>
        <ContactForm />
      </main>
    </motion.section>      
  )
}
