'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GithubIcon } from './ui/icons/github'
import { LinkedinIcon } from './ui/icons/linkedin'
import AboutMeCard from './ui/about-me-card'
import ResumeDownload from './resume-downlaod'
// import GridBG from './ui/grid-bg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
}

export default function HeroSection() {
  return (
    <AnimatePresence>
      <motion.section
        initial="hidden"
        animate="visible"
        id='about'
        aria-label='About Tochukwu Nwosa.'
        className="relative py-24 overflow-hidden"
      >
        {/* <GridBG /> */}

        {/* Hero Content */}
        <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 z-10 mx-auto flex flex-col lg:flex-row space-y-20 lg:space-y-0 lg:justify-between">
          {/* name and links */}
          <motion.div
            className=" flex flex-col items-center lg:items-start space-y-5"
            variants={fadeUp}
            custom={1}
          >
            <motion.h1
              className="hero-title text-center lg:text-left text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold"
              variants={fadeUp}
              custom={1}
            >
              Tochukwu Nwosa
            </motion.h1>
            <motion.span
              className='dark:text-foreground/70 text-center lg:text-left text-xl sm:text-2xl tracking-[0.015em] pl-4'
              variants={fadeUp}
              custom={2}
            >
              Full-stack Developer
            </motion.span>
            <motion.div
              className="dark:text-foreground/70 text-center lg:text-left text-base sm:text-lg max-w-2xl sm:mx-0 pl-4"
              variants={fadeUp}
              custom={3}
            >
              Currently building
              <motion.a
                href="https://claimmate.vercel.app"
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="underline text-blue-500 mx-1 inline-block "
              >
                ClaimMate
              </motion.a>
            </motion.div>

            <motion.div
              className='grid grid-cols-2 gap-5 w-fit'
              variants={fadeUp}
              custom={4}
            >
              <motion.a
                href="https://www.github.com/obere4u"
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center justify-center cursor-pointer size-12 bg-foreground text-background dark:bg-background dark:text-foreground rounded-full shadow-sm shadow-foreground'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/nwosa-tochukwu"
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center justify-center cursor-pointer size-12 bg-foreground text-background dark:bg-background dark:text-foreground rounded-full shadow-sm shadow-foreground'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedinIcon />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* about me card */}
          <motion.div
            className='lg:flex-1 lg:ml-10'
          >
            <motion.div
              variants={fadeUp}
              custom={5}
              className='w-full'
            >
              <AboutMeCard />
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={6}>
              <ResumeDownload />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
