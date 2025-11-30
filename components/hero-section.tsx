"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, ArrowDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ResumeDownload from "@/components/resume-downlaod"
import { track } from "@/lib/analytics"


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const floatingVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

export default function HeroSection() {
  const mailRef = useRef<HTMLAnchorElement>(null)
  const linkedinRef = useRef<HTMLAnchorElement>(null)
  const githubRef = useRef<HTMLAnchorElement>(null)

  return (
    <AnimatePresence>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        id="about"
        aria-label="About Tochukwu Nwosa"
        className="relative min-h-screen py-16 md:py-24 overflow-hidden flex items-center"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent -z-10" />
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-5"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-5"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* HERO HEADER */}
          <div className="text-center space-y-8 mb-16">
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-balance"
                variants={floatingVariants}
              >
                Tochukwu Nwosa
              </motion.h1>
              <motion.div
                className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"
                variants={itemVariants}
              />
            </motion.div>

            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/90"
              variants={itemVariants}
            >
              Frontend Engineer
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              I craft high-performance, pixel-perfect digital experiences that drive business growth and user
              engagement.
            </motion.p>

            {/* METRICS ROW */}
            <motion.div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6" variants={itemVariants}>
              {[
                { value: "40%", label: "Faster Performance" },
                { value: "30%", label: "More Engagement" },
                { value: "98+", label: "PageSpeed Score" },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p className="text-sm md:text-base text-foreground/75 pt-4 font-medium" variants={itemVariants}>
              Currently: <span className="text-primary font-semibold">Brainzcode</span> (full-time) +{" "}
              <span className="text-primary font-semibold">Kinplus</span> (contract)
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div className="flex flex-wrap justify-center gap-4 pt-8" variants={itemVariants}>
              <motion.a
                ref={mailRef}
                href="mailto:tochukwunwosa28@gmail.com"
                onClick={() =>
                  track("contact:email:clicked", { source: "email-envelope-icon-hero-section" })
                }
                className="px-8 py-3.5 bg-foreground text-background rounded-lg font-semibold shadow-lg shadow-foreground/30 hover:shadow-xl hover:shadow-foreground/40 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
                Email Me
              </motion.a>

              {/* RESUME */}
              <ResumeDownload />

              <motion.a
                ref={linkedinRef}
                href="https://linkedin.com/in/nwosa-tochukwu"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event='linkedin-clicked'
                className="px-8 py-3.5 bg-foreground/10 hover:bg-foreground/15 text-foreground rounded-lg font-semibold transition-all flex items-center gap-2 border border-foreground/20 hover:border-foreground/40"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
                LinkedIn
              </motion.a>

              <motion.a
                ref={githubRef}
                href="https://github.com/tochukwunwosa"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event='github-clicked'
                className="px-8 py-3.5 bg-foreground/10 hover:bg-foreground/15 text-foreground rounded-lg font-semibold transition-all flex items-center gap-2 border border-foreground/20 hover:border-foreground/40"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
                GitHub
              </motion.a>
            </motion.div>
          </div>

          {/* ABOUT SECTION */}
          <motion.div variants={slideUpVariants} className="max-w-3xl mx-auto">
            <Card className="border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-10 space-y-6">
                {/* CONTACT INFO */}
                <motion.div
                  className="flex flex-col sm:flex-row sm:gap-6 gap-4 text-sm md:text-base pb-6 border-b border-foreground/10"
                  variants={containerVariants}
                >
                  <motion.a
                    href="mailto:tochukwunwosa28@gmail.com"
                    onClick={() =>
                      track("contact:email:clicked", { source: "about-card-hero-section" })
                    }
                    className="group flex items-center gap-2 hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                    variants={itemVariants}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <span className="group-hover:underline">
                      tochukwunwosa28@gmail.com
                    </span>
                  </motion.a>


                  <motion.div
                    className="group flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors cursor-default"
                    whileHover={{ x: 5 }}
                    variants={itemVariants}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MapPin size={16} className="text-primary" />
                    </div>
                    <span>Lagos, Nigeria</span>
                  </motion.div>
                </motion.div>

                {/* BIO */}
                <motion.div className="space-y-4 text-base leading-relaxed" variants={containerVariants}>
                  <motion.p variants={itemVariants}>
                    I&apos;m a <span className="font-semibold text-primary">Frontend Engineer</span> with{" "}
                    <span className="font-semibold">3+ years</span> building production applications that users love and
                    businesses depend on.
                  </motion.p>

                  <motion.p variants={itemVariants}>
                    Currently working full-time at <span className="font-semibold">Brainzcode</span> (digital agency)
                    while maintaining contract work at <span className="font-semibold">Kinplus</span> (LMS platform
                    serving <span className="font-semibold text-primary">500+ daily users</span>).
                  </motion.p>

                  <motion.div variants={itemVariants}>
                    <p className="font-semibold mb-3">Recent wins:</p>
                    <ul className="space-y-2.5 text-sm md:text-base">
                      {[
                        {
                          icon: "↑",
                          text: "Improved platform performance by 40% (4.5s → 2.7s load time)",
                        },
                        {
                          icon: "↑",
                          text: "Increased user engagement by 30% through UX optimization",
                        },
                        {
                          icon: "✓",
                          text: "Delivered 10+ client projects with 98+ PageSpeed scores",
                        },
                        {
                          icon: "✓",
                          text: "Elevated Lighthouse scores from 65 → 92",
                        },
                      ].map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3"
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-primary font-bold min-w-fit mt-0.5">{achievement.icon}</span>
                          <span>{achievement.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.p className="text-sm md:text-base text-foreground/75 pt-2" variants={itemVariants}>
                    <span className="font-semibold text-foreground/90">Tech stack:</span> React, Next.js, TypeScript,
                    Tailwind CSS, Performance Optimization
                  </motion.p>

                  <motion.p
                    className="font-medium text-foreground/90 pt-4 border-t border-foreground/10 text-primary"
                    variants={itemVariants}
                  >
                    Looking for remote opportunities where I can bring this impact to growing teams.
                  </motion.p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowDown className="text-foreground/40 size-5" />
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
