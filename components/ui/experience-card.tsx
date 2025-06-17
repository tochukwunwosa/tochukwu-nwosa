'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

function useCardInView() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return { ref, inView };
}

interface ExperienceCardProp {
  circlePosition: string;
  cardPosition: string;
  exp: Experience
}
export default function ExperienceCard({ exp, circlePosition, cardPosition }: ExperienceCardProp) {
  const { ref, inView } = useCardInView()
  if (!exp) return null;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={itemVariants}
      className={`group relative bg-background backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-12 border border-foreground/30 shadow-sm transition-all duration-300 md:w-[calc(50%-2rem)] ${cardPosition} hover:shadow-md hover:shadow-foreground/10 hover:-translate-y-1 hover:border-foreground/40 hover:bg-background/90`}
    >
      {/* timeline dot */}
      <motion.div
        variants={fadeUp}
        custom={1}
        className={`absolute top-1/2 w-6 h-6 rounded-full bg-foreground/50 border-4 border-background hidden md:block transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-300 ${circlePosition}`}
      />

      <div className="mb-6">
        <motion.h3
          variants={fadeUp}
          custom={2}
          className="font-title text-xl md:text-2xl font-semibold text-primary-900 mb-2"
        >
          {exp.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          custom={3}
          className="font-title text-lg font-medium text-primary-600 mb-3"
        >
          {exp.company}
        </motion.p>
        <motion.p
          variants={fadeUp}
          custom={4}
          className="font-sans text-sm uppercase tracking-wider font-medium text-primary-500"
        >
          {exp.duration.includes("Present") ? (
            <span>
              {exp.duration.replace("Present", "")}
              <span className="ml-2 inline-block bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                Present
              </span>
            </span>
          ) : (
            exp.duration
          )}
        </motion.p>
      </div>

      <ul className="space-y-4">
        {exp.bullets.map((bullet, bulletIdx) => (
          <motion.li
            key={bulletIdx}
            variants={fadeUp}
            custom={5 + bulletIdx * 0.5}
            className="flex items-start group"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 mr-3 flex-shrink-0"></span>
            <p className="font-sans text-base text-primary-700 leading-relaxed font-normal">
              {bullet}
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
