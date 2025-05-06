'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaGithub
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGraphql
} from 'react-icons/si';
// import GridBG from './ui/grid-bg'
import { IconType } from 'react-icons';

interface TechnicalSkill {
  name: string;
  icon: IconType;
}

const TECHNICAL_SKILLS: TechnicalSkill[] = [
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: FaJs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'GitHub', icon: FaGithub },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
};

export default function TechnicalSkills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="skill"
      aria-label="Tochukwu Nwosa's technical skills"
      className="snap-start relative py-24 "
    >

       {/* <GridBG/> */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          custom={1}
          className="text-center mb-16" >
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-title font-semibold mb-12 text-center">Technical Skills
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg tracking-medium leading-relaxed max-w-2xl mx-auto">A comprehensive list of technologies and tools I work with
          </motion.p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={3}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {TECHNICAL_SKILLS.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                variants={fadeUp}
                custom={idx + 1}
                key={idx}
                tabIndex={0}
                aria-label={skill.name}
                className="flex items-center justify-between w-full group bg-background/50 dark:bg-background/80 backdrop-blur-sm border border-foreground/30 rounded-full p-3 shadow-sm hover:border-foreground/40 transition-all duration-300 hover:bg-background/80 hover:scale-105 hover:shadow-md"
              >
                <h3 className="text-base md:text-lg px-2">{skill.name}</h3>
                <Icon aria-hidden="true" className="size-6 text-foreground" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}