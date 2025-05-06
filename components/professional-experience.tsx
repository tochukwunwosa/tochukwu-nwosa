'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { experiencesData } from '../constants/experiencesData'
import ExperienceCard from './ui/experience-card';
// import GridBG from './ui/grid-bg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

export default function ProfessionalExperience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="experience"
      aria-label="Tochukwu Nwosa's experience."
      className="snap-start relative py-24 ">
        {/* <GridBG/> */}

      <main className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className=" text-center mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg md:text-xl font-normal tracking-normal leading-relaxed max-w-2xl mx-auto">My journey in the industry</motion.p>
        </div>
        <div className='relative'>
          {/* vertical timeline line */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-foreground/30 transform md:-translate-x-px
             before:content-[''] before:absolute before:top-0 before:w-full before:h-8 before:bg-gradient-to-b before:from-background before:to-transparent
             after:content-[''] after:absolute after:bottom-0 after:w-full after:h-8 after:bg-gradient-to-t after:from-background after:to-transparent"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiencesData.map((exp, idx) => {
              const isLeft = exp.align === "left";
              const cardPosition = isLeft
                ? "md:mr-[calc(50%+2rem)]"
                : "md:ml-[calc(50%+2rem)]";
              const circlePosition = isLeft
                ? "right-0 translate-x-[calc(100%+1rem+5px)]"
                : "left-0 -translate-x-[calc(100%+1rem+6px)]";

              return (
                <ExperienceCard key={idx} exp={exp} cardPosition={cardPosition} circlePosition={ circlePosition} />
              );
            })}
          </motion.div>
        </div>
      </main>
    </motion.section>
  );
}