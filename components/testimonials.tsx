'use client'

import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import { testimonialsData } from '@/constants'
import TestimonialCard from './ui/testimonial-card'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="testimonials"
      aria-label="Client testimonials and recommendations"
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
            Testimonials & Recommendations
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            What clients, colleagues, and managers say about working with me
          </motion.p>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* CALL TO ACTION */}
        <motion.div
          variants={fadeUp}
          custom={testimonialsData.length + 1}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-foreground/5 border border-foreground/10 rounded-xl">
            <p className="text-base md:text-lg text-foreground/70 max-w-xl">
              Interested in working together? I&apos;d love to hear about your project.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="#contact"
                className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="https://linkedin.com/in/nwosa-tochukwu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-foreground/20 rounded-lg font-semibold hover:border-foreground/40 transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div >
      </div >
    </motion.section >
  )
}