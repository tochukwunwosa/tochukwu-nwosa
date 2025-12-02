"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { track } from "@/lib/analytics"
import { useCallback, useEffect } from "react"
import { navItems, socialLinks } from "@/constants"
import { Mail, MapPin, X } from "lucide-react"


interface MobileNavProps {
  openMenu: boolean
  setOpenMenu: (isOpen: boolean) => void
  activeSection?: string
}

export default function MobileNav({ openMenu, setOpenMenu, activeSection }: MobileNavProps) {
  const closeMenu = useCallback(() => {
    setOpenMenu(false)
    track('mobile-menu:closed', { source: 'mobile-nav' })
  }, [setOpenMenu])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";        // Prevent scroll
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [openMenu]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }

    if (openMenu) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [openMenu, closeMenu])

  // Prevent touch scroll on backdrop 
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
  }

  const openMobileMenu = (e: React.MouseEvent, route: string, name: string) => {
    e.preventDefault();
    const target = document.querySelector(route);
    if (target) {
      (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
      track(`nav:${name.toLowerCase()}`, { source: 'mobile-menu' })
    }
    closeMenu();
  }


  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeMenu}
        onTouchMove={handleTouchMove}
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
      />

      {/* Menu Panel */}
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-foreground/10 z-50 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-foreground/10 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold">Menu</h2>
            <p className="text-xs text-foreground/60 mt-0.5">Navigate to section</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-foreground/5 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.route

              return (
                <motion.li
                  key={item.route}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.route}
                    onClick={(e) => openMobileMenu(e, item.route, item.name)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive
                      ? 'bg-foreground/10 text-foreground'
                      : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground hover:translate-x-1'
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              )
            })}
          </ul>

          {/* QUICK CONTACT */}
          <div className="mt-8 pt-6 border-t border-foreground/10">
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-3">
              Quick Contact
            </p>
            <Link
              href="mailto:tochukwunwosa28@gmail.com"
              onClick={() => track('email:clicked', { source: 'mobile-menu' })}
              className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">Get in touch</span>
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-foreground/10 bg-foreground/[0.02] flex-shrink-0">
          <div className="space-y-4">
            {/* Social Links */}
            <div>
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-3">
                Connect
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => track(`${social.name.toLowerCase()}:clicked`, { source: 'mobile-menu' })}
                      className="w-11 h-11 flex items-center justify-center rounded-lg border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-foreground/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>Lagos, Nigeria (GMT+1)</span>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}