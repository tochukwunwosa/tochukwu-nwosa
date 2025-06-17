'use client'

import React, { useState } from 'react'
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
  

  return (
    <div className={` w-screen z-50 bg-background sticky top-0 transition-colors duration-300 `}>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className='relative w-full max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between' 
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
          className={`text-foreground text-sm md:text-base lg:text-lg font-semibold flex items-center gap-px cursor-pointer`}
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
              className={`capitalize font-semibold text-lg cursor-pointer hidden lg:block text-foreground`}
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
            className="lg:hidden cursor-pointer size-12 grid place-items-center bg-background text-foreground  rounded-full p-2 shadow-sm shadow-foreground"
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
    </div>
  )
}
