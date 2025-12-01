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
} from 'react-icons/si';
import { IconType } from 'react-icons';

// Core expertise
interface CoreSkill {
  name: string;
  icon: IconType;
  level: 'expert' | 'proficient';
  yearsOfExperience: string;
  keyAchievement: string;
}

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
    name: 'TypeScript',
    icon: SiTypescript,
    level: 'expert',
    yearsOfExperience: '2+ years',
    keyAchievement: 'Type-safe architecture'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    level: 'expert',
    yearsOfExperience: '2+ years',
    keyAchievement: 'Responsive design systems'
  },
];

// Supporting skills
interface SupportingSkill {
  name: string;
  icon: IconType;
  context: string;
}

const SUPPORTING_SKILLS: SupportingSkill[] = [
  {
    name: 'Node.js',
    icon: FaNodeJs,
    context: 'API integration & backend communication'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    context: 'Database design for LMS platform'
  },
  {
    name: 'Supabase',
    icon: SiSupabase,
    context: 'Real-time features & authentication'
  },
];

// Specialized competencies
interface Competency {
  title: string;
  description: string;
  icon: string;
  proof: string;
}

const COMPETENCIES: Competency[] = [
  {
    title: 'Performance Optimization',
    description: 'Expert in Core Web Vitals, code-splitting, lazy loading, and bundle optimization',
    icon: '⚡',
    proof: '40% faster load times, 98+ PageSpeed scores'
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first development with pixel-perfect implementation across all devices',
    icon: '📱',
    proof: 'WCAG accessibility standards, cross-browser compatibility'
  },
  {
    title: 'State Management',
    description: 'Redux, Zustand, React Query for complex application state',
    icon: '🔄',
    proof: 'Scalable architecture for 500+ daily users'
  },
  {
    title: 'Testing & CI/CD',
    description: 'Cypress end-to-end testing, automated deployment pipelines',
    icon: '✅',
    proof: 'Stable releases, maintained code quality'
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

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Specialized in performance-focused frontend development with proven results
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

        {/* SUPPORTING SKILLS */}
        <motion.div variants={fadeUp} custom={13}>
          <h3 className="text-2xl font-semibold mb-8 text-center">Additional Technologies</h3>
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