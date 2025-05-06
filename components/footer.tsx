'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface NavLink {
  name: string;
  route: string
}

const navLinks: NavLink[] = [
  { name: 'About Me', route: '#about' },
  { name: 'Projects', route: '#project' },
  { name: 'Skills', route: '#skill' },
  { name: 'Experience', route: '#experience' },
  { name: 'contact', route: '#contact' },
]

const socials: NavLink[] = [
  { name: 'GitHub', route: 'https://github.com/obere4u' },
  { name: 'LinkedIn', route: 'https://linkedin.com/in/nwosa-tochukwu' },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1, 
    tron: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  }
}

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="footer"
      className="mt-auto w-full bg-background border-t border-foreground/20"
    >
      <main className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={containerVariants}
          className="container-custom py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              variants={itemVariants}
              className="space-y-4 md:col-span-2"
            >
              <motion.h3
                variants={itemVariants}
                className="font-display text-xl font-semibold text-foreground/90"
              >
                Tochukwu Nwosa
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-foreground/60 max-w-md"
              >
                Turning complex challenges into elegant, user-centered solutions that make an impact.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              <motion.h4
                variants={itemVariants}
                className="font-title text-lg font-semibold text-foreground/90"
              >
                Quick Links
              </motion.h4>
              <motion.ul
                variants={containerVariants}
                className="flex flex-col space-y-2"
              >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.route}
                    variants={linkVariants}
                    custom={index + 1}
                    whileHover={{ x: 5 }}
                    className="w-fit text-foreground/60 cursor-pointer hover:text-foreground/90 transition-colors"
                  >
                    <Link href={link.route}> {link.name}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              <motion.h4
                variants={itemVariants}
                className="font-title text-lg font-semibold text-foreground/90"
              >
                Connect
              </motion.h4>
              <motion.div
                variants={containerVariants}
                className="flex flex-col space-y-4"
              >
                {socials.map((social, index) => (
                  <motion.a
                    key={social.route}
                    variants={linkVariants}
                    custom={index + 1}
                    whileHover={{ x: 5 }}
                    href={social.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} Link`}
                    className="w-fit text-foreground/60 hover:text-foreground/90 transition-colors"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-foreground/20"
          >
            <motion.p
              variants={itemVariants}
              className="text-center text-foreground/60"
            >
              &copy; {year} Tochukwu Nwosa. All rights reserved.
            </motion.p>
          </motion.div>
        </motion.div>
      </main>
    </motion.footer>
  )
}