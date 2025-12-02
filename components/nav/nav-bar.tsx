'use client'

import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ModeToggle from '../theme/theme-toggle'
import Link from 'next/link'
import { track } from '@/lib/analytics'
import MobileNav from './mobile-nav'
import { navItems } from '@/constants'


export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const sections: (HTMLElement | null)[] = navItems.map((item) =>
      document.querySelector<HTMLElement>(item.route)
    )

    const handleScroll = () => {
      let current = ""

      sections.forEach((section: HTMLElement | null) => {
        if (!section) return
        const rect = section.getBoundingClientRect()

        // Section is active when it's in the top half of viewport
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = `#${section.id}`
        }
      })

      if (current !== activeSection) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  return (
    <>
      <div className={`w-full z-50 sticky top-0 transition-all duration-300 ${isScrolled
        ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-foreground/5'
        : 'bg-background border-b border-foreground/0'
        }`}>
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className='relative w-full max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between'
        >

          {/* LEFT: THEME TOGGLE */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ModeToggle />
          </motion.div>

          {/* CENTER: DESKTOP NAV */}
          <ul className='hidden lg:flex items-center space-x-8'>
            {navItems.map((item) => {
              const isActive = activeSection === item.route

              return (
                <motion.li
                  key={item.route}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.route}
                    onClick={() => track(`nav:${item.name.toLowerCase()}`, { source: 'navbar' })}
                    className={`text-sm font-medium transition-colors relative ${isActive
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground'
                      }`}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              )
            })}
          </ul>

          {/* RIGHT: EMAIL (Desktop) / MENU (Mobile) */}
          <div className="flex items-center gap-4">
            {/* Email - Hidden on mobile */}
            <motion.a
              href="mailto:tochukwunwosa28@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="md:block text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Email Tochukwu"
              onClick={() => track('email:clicked', { source: 'navbar' })}
            >
              Get in touch
            </motion.a>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => {
                setOpenMenu(true)
                track('mobile-menu:opened', { source: 'navbar' })
              }}
              aria-label="Open navigation menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-foreground/20 hover:border-foreground/40 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {openMenu && (
          <MobileNav
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            activeSection={activeSection}
          />
        )}
      </AnimatePresence>
    </>
  )
}