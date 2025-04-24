'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FileTextIcon } from './ui/icons/file-text';

export default function ResumeDownload() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative lg:inline-block group mt-10 mx-auto w-fit"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="rest"
      animate={isHovered ? 'hover' : 'rest'}
    >
      {/* Ping effect */}
      <motion.div
        className="absolute inset-0 rounded-md bg-foreground opacity-20 z-0"
        style={{ scale: 1 }}
        animate={{
          scale: [1, 1.4],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Border behind on hover */}
      <motion.div
        variants={{
          rest: { opacity: 0, y: 0 },
          hover: { opacity: 1, y: 2 },
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute inset-0 border-2 border-foreground bg-background rounded-md pointer-events-none z-0"
      />

      {/* Main CTA */}
      <motion.a
        href="/doc/Tochukwu-Nwosa_resume.pdf"
        download="Tochukwu-Nwosa_Resume.pdf"
        variants={{
          rest: { y: 0 },
          hover: { y: -4, x: 4 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative z-10 bg-foreground text-background py-2 px-8 flex items-center justify-center gap-2 rounded-md font-medium"
      >
        <span>Download Resume</span>
        <FileTextIcon size={20} />
      </motion.a>
    </motion.div>
  );
}
