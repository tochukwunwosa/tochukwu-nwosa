'use client'

import { motion } from 'framer-motion'
import { Star, Linkedin, Briefcase } from 'lucide-react'
import { Testimonial } from '@/constants/testimonialsData'
import { track } from '@/lib/analytics'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  })
}

const relationshipStyles = {
  client: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    label: "Client"
  },
  colleague: {
    badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    label: "Colleague"
  },
  manager: {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    label: "Manager"
  }
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const relationship = relationshipStyles[testimonial.relationship]

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <div className="h-full bg-card border border-foreground/10 rounded-xl p-6 md:p-8 hover:border-foreground/20 transition-all duration-200 hover:shadow-md flex flex-col">

        {/* HEADER */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-foreground/5 border border-foreground/10">
            {/* Placeholder - replace with actual image */}
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-foreground/40">
              {testimonial.name.charAt(0)}
            </div>
            {/* When you have real images, use this: */}
            {/* <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            /> */}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-base md:text-lg">
                {testimonial.name}
              </h3>
              {testimonial.linkedin && (
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('testimonial:linkedin:clicked', { name: testimonial.name })}
                  className="text-foreground/40 hover:text-foreground transition-colors flex-shrink-0"
                  aria-label={`${testimonial.name}'s LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-foreground/70 mb-2">
              {testimonial.role} at {testimonial.company}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-medium rounded border ${relationship.badge}`}>
                {relationship.label}
              </span>
              {testimonial.projectContext && (
                <span className="flex items-center gap-1 text-xs text-foreground/60">
                  <Briefcase className="w-3 h-3" />
                  {testimonial.projectContext}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-foreground/20'
                }`}
            />
          ))}
          <span className="text-xs text-foreground/60 ml-2">{testimonial.date}</span>
        </div>

        {/* CONTENT */}
        <blockquote className="text-sm md:text-base leading-relaxed text-foreground/80 flex-1">
          {"${testimonial.content}"}
        </blockquote>

        {/* DECORATION */}
        <div className="absolute top-6 right-6 text-6xl text-foreground/5 font-serif leading-none select-none">
          &apos;
        </div>
      </div>
    </motion.div >
  )
}