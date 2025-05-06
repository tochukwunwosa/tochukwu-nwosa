"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const NavItems: NavItem[] = [
  { name: "about", route: "#about" },
  { name: "project", route: "#project" },
  { name: "Skills", route: "#skill" },
  { name: "experience", route: "#experience" },
  { name: "contact", route: "#contact" },
]

interface NavItem {
  name: string
  route: string
}

interface NavMenuProp {
  openMenu: boolean
  setOpenMenu: (isOpen: boolean) => void
}

export default function NavMenu({ openMenu, setOpenMenu }: NavMenuProp) {
  const closeMenu = () => setOpenMenu(false)

  // Background animation variants
  const backgroundVariants = {
    hidden: {
      clipPath: "circle(0% at 90% 10%)",
      opacity: 0,
    },
    visible: {
      clipPath: "circle(150% at 50% 50%)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      clipPath: "circle(0% at 90% 10%)",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  // Navigation item animation variants
  const navItemVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (i: number) => ({
      x: [0, 15, 0],
      opacity: 1,
      transition: {
        x: {
          type: "tween", // 🔧 Use tween instead of spring
          ease: "easeInOut",
          times: [0, 0.6, 1],
          duration: 0.6,
          delay: i * 0.1,
        },
        opacity: {
          duration: 0.2,
          delay: i * 0.1,
        },
      },
    }),

    exit: (i: number) => ({
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
      },
    }),
  }

  // Close button animation variants
  const closeButtonVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.4,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <>
      {openMenu && (
        <motion.nav
          key="nav-menu"
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="no-scroll h-screen bg-foreground w-screen fixed px-5 top-0 pt-5 z-[999] flex flex-col items-center gap-10 overflow-hidden"
        >
          <motion.button
            variants={closeButtonVariants}
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="self-end cursor-pointer size-12 rounded-full border border-background grid place-items-center bg-foreground text-background dark:bg-background dark:text-foreground rounded-full p-2 shadow-lg dark:shadow-sm shadow-foreground"
          >
            <X />
          </motion.button>

          <motion.ul className="flex flex-col gap-14">
            {NavItems.map((item, index) => (
              <motion.li
                key={item.route}
                custom={index}
                variants={navItemVariants}
                onClick={closeMenu}
                whileHover={{ scale: 1.1, x: 5 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="capitalize text-3xl lg:text-4xl text-background cursor-pointer"
              >
                <Link href={item.route}>{item.name}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      )}
    </>
  )
}
