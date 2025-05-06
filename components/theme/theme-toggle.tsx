"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="relative size-12 cursor-pointer rounded-full  bg-background text-foreground shadow-sm shadow-foreground grid place-items-center focus:outline-none"
          aria-label="Toggle theme"
        >

          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Moon />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Sun />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="mt-2 animate-in fade-in slide-in-from-top-2 bg-foreground"
      >
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer text-background">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer text-background">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer text-background">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
