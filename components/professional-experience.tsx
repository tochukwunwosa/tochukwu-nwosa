'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import GridBG from "./ui/grid-bg";
import ExperiencesData from '../constants/ExperiencesData.json'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

export default function ProfessionalExperience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="experience"
      aria-label="Tochukwu Nwosa's experience."
      className="relative py-24 bg-transparent">
      {/* bg */}
      <GridBG />
      {/* bg white overlay */}
      <div className="absolute inset-0 bg-gradient-to-b !from-foreground/98  !to-foreground/98 dark:!from-background/98 dark:!to-background/98" />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="relative text-center mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-5xl font-medium tracking-tight text-primary-900 mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg md:text-xl font-normal text-primary-600 tracking-normal leading-relaxed max-w-2xl mx-auto">My journey in the industry</motion.p>
        </div>
        <div className='relative'>
          {/* vertical timeline line */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-foreground/30 transform md:-translate-x-px"
          />

          {ExperiencesData.map((exp, idx) => {
            const isLeft = exp.align === "left";
            const cardPosition = isLeft
              ? "md:mr-[calc(50%+2rem)]"
              : "md:ml-[calc(50%+2rem)]";
            const circlePosition = isLeft
              ? "right-0 translate-x-[calc(100%+1rem+5px)]"
              : "left-0 -translate-x-[calc(100%+1rem+6px)]";

            // Create a separate ref for each experience card
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: '-50px' });

            return (
              <motion.div
                key={idx}
                ref={cardRef}
                initial="hidden"
                animate={cardInView ? "visible" : "hidden"}
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
                    {exp.duration}
                  </motion.p>
                </div>

                <ul className="space-y-4">
                  {exp.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      custom={5 + idx * 0.5}
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
            );
          })}
        </div>
      </main>
    </motion.div>
  );
}