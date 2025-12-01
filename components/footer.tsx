'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import { track } from '@/lib/analytics'

interface NavLink {
  name: string;
  route: string;
}

const navLinks: NavLink[] = [
  { name: 'About', route: '#about' },
  { name: 'Projects', route: '#project' },
  { name: 'Skills', route: '#skill' },
  { name: 'Experience', route: '#experience' },
  { name: 'Contact', route: '#contact' },
]

const socials = [
  {
    name: 'GitHub',
    route: 'https://github.com/tochukwunwosa',
    icon: Github
  },
  {
    name: 'LinkedIn',
    route: 'https://linkedin.com/in/nwosa-tochukwu',
    icon: Linkedin
  },
  {
    name: 'Email',
    route: 'mailto:tochukwunwosa28@gmail.com',
    icon: Mail
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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
      className="mt-auto w-full bg-background border-t border-foreground/10"
    >
      <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

            {/* LEFT: BRAND & BIO */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="md:col-span-5 space-y-4"
            >
              <h3 className="text-2xl font-bold text-foreground">
                Tochukwu Nwosa
              </h3>
              <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
                Frontend Engineer building fast, scalable web applications.
                Specialized in performance optimization with proven results:
                40% faster load times, 98+ PageSpeed scores.
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground/60 pt-2">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria (GMT+1)</span>
              </div>
            </motion.div>

            {/* MIDDLE: QUICK LINKS */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="md:col-span-3 md:place-items-center space-y-4"
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.route}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.route}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* RIGHT: CONNECT */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="md:col-span-4 md:place-items-center space-y-4"
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Connect
              </h4>
              <div className="space-y-3">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.route}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      href={social.route}
                      target={social.route.startsWith('http') ? "_blank" : undefined}
                      rel={social.route.startsWith('http') ? "noopener noreferrer" : undefined}
                      onClick={() =>
                        track(`${social.name}:clicked`, { source: 'footer' })
                      }
                      className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* BOTTOM: COPYRIGHT */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-12 pt-8 border-t border-foreground/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
              <p>
                &copy; {year} Tochukwu Nwosa. All rights reserved.
              </p>
              <p className="text-xs">
                Built with Next.js, TypeScript & Tailwind CSS
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}