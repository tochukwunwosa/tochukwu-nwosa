'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiSupabase,
  SiNestjs,
  SiCypress,
} from 'react-icons/si';
import { IconType } from 'react-icons';

interface CoreSkill {
  name: string;
  icon: IconType;
  level: 'expert' | 'proficient';
  yearsOfExperience: string;
  keyAchievement: string;
}

// CHANGED: Node.js promoted to core, Tailwind moved to supporting
// Order now reads: frontend → backend → language → styling
const CORE_SKILLS: CoreSkill[] = [
  {
    name: 'React',
    icon: FaReact,
    level: 'expert',
    yearsOfExperience: '3+ years',
    keyAchievement: '10+ production apps'
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    level: 'expert',
    yearsOfExperience: '2+ years',
    keyAchievement: '98+ PageSpeed scores'
  },
  {
    name: 'Node.js',
    icon: FaNodeJs,
    level: 'proficient',
    yearsOfExperience: '2+ years',
    keyAchievement: 'REST APIs & business logic'
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    level: 'expert',
    yearsOfExperience: '2+ years',
    keyAchievement: 'Type-safe across the stack'
  },
];

interface SupportingSkill {
  name: string;
  icon: IconType;
  context: string;
}

// CHANGED: NestJS added, Tailwind moved here, Cypress added
const SUPPORTING_SKILLS: SupportingSkill[] = [
  {
    name: 'NestJS',
    icon: SiNestjs,
    context: 'API architecture & business workflows'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    context: 'Schema design, queries, aggregation'
  },
  {
    name: 'Supabase',
    icon: SiSupabase,
    context: 'Real-time features & authentication'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    context: 'Responsive design systems, mobile-first'
  },
  {
    name: 'Cypress',
    icon: SiCypress,
    context: 'E2E testing & CI/CD pipelines'
  },
];

interface Competency {
  title: string;
  description: string;
  icon: string;
  proof: string;
}

// CHANGED: first competency now leads with fullstack, not just performance
const COMPETENCIES: Competency[] = [
  {
    title: 'Fullstack Product Development',
    description: 'Building and shipping complete products — frontend UI, REST APIs, database schema, auth systems, and deployment pipelines',
    icon: '🛠️',
    proof: 'MyTreda: 80+ businesses, 1,400+ products, built solo end-to-end'
  },
  {
    title: 'Performance Optimization',
    description: 'Core Web Vitals, code-splitting, lazy loading, and bundle optimization across frontend and backend',
    icon: '⚡',
    proof: '40% faster load times, 98+ PageSpeed scores across 10+ projects'
  },
  {
    title: 'State Management & Data',
    description: 'Redux, Zustand, React Query on the frontend — MongoDB and Supabase on the backend',
    icon: '🔄',
    proof: 'Scalable architecture serving 500+ daily users'
  },
  {
    title: 'Testing & CI/CD',
    description: 'Cypress end-to-end testing suites and automated deployment pipelines',
    icon: '✅',
    proof: '2–3 production releases weekly during active development'
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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
      className="snap-start relative py-20 md:py-24"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER — CHANGED: removed "frontend-focused" framing */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Frontend to backend — building complete products with the full stack
          </motion.p>
        </div>

        {/* CORE SKILLS */}
        <motion.div variants={fadeUp} custom={3} className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Core Technologies</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SKILLS.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  custom={idx + 4}
                  className="group relative bg-card border border-foreground/10 rounded-lg p-6 hover:border-foreground/20 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="md:flex items-start gap-4 mb-4">
                    <div className="p-3 bg-foreground/5 rounded-lg">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{skill.name}</h4>
                      <p className="text-xs text-foreground/60 uppercase tracking-wide">
                        {skill.level}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground/70">
                      <span className="font-medium text-foreground/90">{skill.yearsOfExperience}</span> experience
                    </p>
                    <p className="text-foreground/70">{skill.keyAchievement}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* COMPETENCIES */}
        <motion.div variants={fadeUp} custom={8} className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Specialized Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPETENCIES.map((comp, idx) => (
              <motion.div
                key={comp.title}
                variants={fadeUp}
                custom={idx + 9}
                className="bg-card border border-foreground/10 rounded-lg p-6 hover:border-foreground/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-3xl" role="img" aria-label={comp.title}>
                    {comp.icon}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{comp.title}</h4>
                    <p className="text-sm text-foreground/70 mb-3">{comp.description}</p>
                    <p className="text-xs font-medium text-foreground/80 bg-foreground/5 px-3 py-1.5 rounded inline-block">
                      {comp.proof}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SUPPORTING SKILLS — CHANGED: now 5 items in a 2+3 grid */}
        <motion.div variants={fadeUp} custom={13}>
          <h3 className="text-2xl font-semibold mb-8 text-center">Also Working With</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUPPORTING_SKILLS.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  custom={idx + 14}
                  className="flex items-center gap-4 bg-card border border-foreground/10 rounded-lg p-4 hover:border-foreground/20 transition-all duration-200"
                >
                  <div className="p-2 bg-foreground/5 rounded">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{skill.name}</h4>
                    <p className="text-xs text-foreground/60">{skill.context}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}