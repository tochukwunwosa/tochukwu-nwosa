'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import GridBG from './ui/grid-bg'
import Image from 'next/image';
import GithubIcon from '@/public/github_dark.svg';
import TypeScriptIcon from '@/public/typescript.svg';
import JavaScriptIcon from '@/public/javascript.svg';
import ReactIcon from '@/public/react_dark.svg';
import NextJsIcon from '@/public/nextjs_icon_dark.svg';
import TailwindCSSIcon from '@/public/tailwindcss.svg';
import NodejsIcon from '@/public/nodejs.svg';
import ExpressjsIcon from '@/public/expressjs_dark.svg';
import MongoDBIcon from '@/public/mongodb.svg';
import PostgressQLIcon from '@/public/postgresql.svg';
import GraphQLIcon from '@/public/graphql.svg';

import { ElementType } from 'react';

interface TechnicalSkills {
  name: string;
  icon?: ElementType;
}

const TECHNICAL_SKILLS: TechnicalSkills[] = [
  { name: 'React', icon: ReactIcon },
  { name: 'Next.js', icon: NextJsIcon },
  { name: 'TypeScript', icon: TypeScriptIcon },
  { name: 'JavaScript', icon: JavaScriptIcon },
  { name: 'Tailwind CSS', icon: TailwindCSSIcon },
  { name: 'Node.js', icon: NodejsIcon },
  { name: 'Express.js', icon: ExpressjsIcon },
  { name: 'MongoDB', icon: MongoDBIcon },
  { name: 'PostgreSQL', icon: PostgressQLIcon },
  { name: 'GraphQL', icon: GraphQLIcon },
  { name: 'GitHub', icon: GithubIcon },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}
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
      className="relative py-24 bg-transparent"
    >
      {/* bg */}
      <GridBG />

      {/* bg white overlay */}
      <div className="absolute inset-0 bg-gradient-to-b !from-foreground/98 !to-foreground/98 dark:!from-background/98 dark:!to-background/98" />
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          custom={1}
          className="text-center mb-16" >
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-title font-semibold text-primary-800 mb-12 text-center">Technical Skills
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-lg text-primary-600 tracking-medium leading-relaxed max-w-2xl mx-auto">A comprehensive list of technologies and tools I work with
          </motion.p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={3}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {TECHNICAL_SKILLS.map((skill, idx) => {
            const Icon = skill.icon
            return (
            <motion.div
              variants={fadeUp}
              custom={idx + 1}
              key={idx}
              tabIndex={0}
              aria-label={skill.name}
              className={`disabled flex items-center space-x-2 w-[200px] group bg-background/50 dark:bg-background/80 backdrop-blur-sm border border-foreground/30 rounded-full p-3 shadow-sm hover:border-foreground/40 transition-all duration-300 hover:bg-background/80 hover:scale-105 hover:shadow-md`}
            >
                <h3 className="text-base md:text-lg px-2">{skill.name}</h3>
                {Icon && <Icon aria-hidden="true" className="size-6 text-foreground" />}           
            </motion.div>
          )})}

        </motion.div>
      </div>
    </motion.section>
  )
}
