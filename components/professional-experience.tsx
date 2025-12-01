"use client"
import { useRef } from "react"
import { motion, useScroll, useSpring, useInView } from "framer-motion"
import { experiencesData } from "@/constants/experiencesData"
import ExperienceCard from "@/components/ui/experience-card"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function ProfessionalExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Track scroll through timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })

  // Smooth the animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="experience"
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
            Professional Experience
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            3+ years building products that users love
          </motion.p>
        </div>

        {/* TIMELINE */}
        <div ref={timelineRef} className="relative">

          {/* Background line - thin, subtle */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 md:-translate-x-0.5" />

          {/* Progressive line - fills on scroll */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-px bg-foreground md:-translate-x-0.5"
            style={{
              height: "100%",
              scaleY: smoothProgress,
              transformOrigin: "top"
            }}
          />

          {/* CARDS */}
          <div className="space-y-12 md:space-y-16">
            {experiencesData.map((exp, index) => {
              const isLeft = exp.align === "left"
              const cardPosition = isLeft
                ? "md:mr-[calc(50%+2.5rem)]"
                : "md:ml-[calc(50%+2.5rem)]"
              const circlePosition = isLeft
                ? "right-0 translate-x-[calc(100%+2rem)] md:block hidden"
                : "left-0 -translate-x-[calc(100%+2.25rem)] md:block hidden"

              return (
                <ExperienceCard
                  key={index}
                  exp={exp}
                  cardPosition={cardPosition}
                  circlePosition={circlePosition}
                  index={index}
                  totalItems={experiencesData.length}
                  scrollProgress={smoothProgress}
                />
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}