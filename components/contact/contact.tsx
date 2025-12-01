'use client'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import ContactForm from './form';
import { Mail, Linkedin, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="contact"
      aria-label="Contact Tochukwu Nwosa"
      className="snap-start relative py-20 md:py-24"
    >
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative'>

        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Let&apos;s Work Together
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Open to remote frontend engineering roles and select freelance projects.
            Currently employed but exploring new opportunities.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* LEFT: CONTACT INFO */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="lg:col-span-2 space-y-8"
          >
            {/* What I'm Looking For */}
            <div>
              <h3 className="text-xl font-semibold mb-4">What I&apos;m Looking For</h3>
              <ul className="space-y-3 text-sm text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">✓</span>
                  <span>Full-time remote frontend engineering roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">✓</span>
                  <span>Contract opportunities (20+ hours/week)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">✓</span>
                  <span>High-impact projects at growing startups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">✓</span>
                  <span>Performance optimization consulting</span>
                </li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
              <div className="space-y-3">

                <Link href="mailto:tochukwunwosa28@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline">tochukwunwosa28@gmail.com</span>
                </Link>


                <Link href="https://linkedin.com/in/nwosa-tochukwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline">linkedin.com/in/nwosa-tochukwu</span>
                </Link>

                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <MapPin className="w-5 h-5" />
                  <span>Lagos, Nigeria (GMT+1)</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <Clock className="w-5 h-5" />
                  <span>Excellent overlap with EU/US East Coast</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-sm">Current Availability</h3>
              <p className="text-sm text-foreground/70">
                Available for new opportunities with 2-week notice.
                Immediate start for the right role.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="lg:col-span-3 h-full"
          >
            <ContactForm />
          </motion.div>
        </div >
      </div >
    </motion.section >
  )
}