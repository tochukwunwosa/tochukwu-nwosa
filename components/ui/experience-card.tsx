"use client";
import { motion, type MotionValue, useTransform } from "framer-motion";
import type { Experience } from "@/constants/experiencesData";

interface ExperienceCardProps {
  exp: Experience;
  cardPosition: string;
  circlePosition: string;
  index: number;
  totalItems: number;
  scrollProgress: MotionValue<number>;
}

export default function ExperienceCard({
  exp,
  cardPosition,
  circlePosition,
  index,
  totalItems,
  scrollProgress,
}: ExperienceCardProps) {
  
  // Calculate progress for this specific dot
  const dotThreshold = totalItems > 1 ? index / (totalItems - 1) : 0;

  // Dot fills when line reaches it
  const dotOpacity = useTransform(
    scrollProgress,
    [0, dotThreshold],
    [0.3, 1]
  );

  const dotScale = useTransform(
    scrollProgress,
    [0, dotThreshold],
    [0.85, 1]
  );


  // Type badge styling
  const typeStyles = {
    "full-time": "bg-foreground/5 text-foreground/80 border-foreground/20",
    contract: "bg-foreground/5 text-foreground/80 border-foreground/20",
    internship: "bg-foreground/5 text-foreground/80 border-foreground/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pl-16 md:pl-0 ${cardPosition}`}
    >
      {/* TIMELINE DOT - Desktop */}
      <div className={`absolute top-8 ${circlePosition}`}>
        <motion.div
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="relative flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-foreground border-2 border-background shadow-sm" />
        </motion.div>
      </div>

      {/* TIMELINE DOT - Mobile */}
      <div className="absolute left-8 top-8 -translate-x-1/2 md:hidden">
        <motion.div
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background"
        />
      </div>

      {/* CARD */}
      <div className="group relative">
        <div
          className="relative bg-card border border-foreground/10 rounded-lg p-6 md:p-8 hover:border-foreground/20 transition-all duration-200 hover:shadow-sm"
        >
          {/* HEADER */}
          <div className="mb-4">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-semibold mb-1">
                  {exp.title}
                </h3>
                <p className="text-base md:text-lg font-medium text-foreground/80">
                  {exp.company}
                </p>
              </div>

              {/* TYPE BADGE */}
              <span
                className={`px-2.5 py-0.5 text-xs font-medium rounded border ${typeStyles[exp.type]} uppercase tracking-wide`}
              >
                {exp.type}
              </span>
            </div>

            {/* LOCATION & DATE */}
            <div className="flex flex-wrap gap-2 text-sm text-foreground/60 mt-1">
              <span>{exp.location}</span>
              <span className="text-foreground/30">•</span>
              <span>{exp.duration}</span>
            </div>
          </div>

          {/* BULLETS */}
          <ul className="space-y-2 mb-4">
            {exp.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm leading-relaxed"
              >
                <span className="text-foreground/50 mt-0.5 flex-shrink-0">
                  •
                </span>
                <span className="text-foreground/80">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* TECHNOLOGIES */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="pt-3 border-t border-foreground/5 flex flex-wrap gap-1.5">
              {exp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-xs font-medium bg-foreground/5 text-foreground/70 rounded border border-foreground/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
