'use client'

import React, { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ModeToggle from '../theme/theme-toggle'
import NavMenu from './nav-menu'
import Link from 'next/link'

const NavItems: NavItem[] = [
  { name: "about", route: "#about" },
  { name: "project", route: "#project" },
  { name: "Skills", route: "#skill" },
  { name: "experience", route: "#experience" },
  { name: "contact", route: "#contact" },
]

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className={`sticky top-0 z-50 w-screen flex items-center justify-between px-5 py-5 transition-colors duration-300 ${isSticky
          ? 'bg-foreground/95 backdrop-blur-md shadow-md'
          : 'bg-gradient-to-b !from-foreground/90 !to-foreground/97 dark:!from-background/90  dark:!to-background/97 backdrop-blur-none shadow-none'
          }`}
      >
        {/* Theme toggle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ModeToggle />
        </motion.div>

        {/* Email link */}
        <motion.a
          href="mailto:tochukwunwosa28@gmail.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className={`${isSticky ? 'text-background' : 'text-foreground'} text-base lg:text-lg font-semibold flex items-center gap-px cursor-pointer`}
          aria-label="Email Tochukwu"
        >
          tochukwunwosa28@gmail.com
        </motion.a>

        {/* Menu button */}
        <div>
          <ul className='flex items-center space-x-5 px-5'>
          {NavItems.map((item) => (
            <motion.li
              key={item.route}
              className={`capitalize font-semibold text-lg cursor-pointer hidden lg:block ${isSticky ? 'text-background' : 'text-foreground'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.route} aria-label={`Navigate to ${item.name}`}>
                {item.name}
              </Link>
            </motion.li>
          ))}
          </ul>
          <motion.button
            onClick={() => setOpenMenu(true)}
            aria-label="Open navigation menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden cursor-pointer size-12 grid place-items-center bg-foreground text-background dark:bg-background dark:text-foreground rounded-full p-2 shadow-lg dark:shadow-sm shadow-foreground"
          >
            <Menu />
          </motion.button>
        </div>
      </motion.nav>

      {/* Menu overlay with animation */}
      <AnimatePresence>
        {openMenu && (
          <NavMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
        )}
      </AnimatePresence>
    </>
  )
}
