"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { track } from "@/lib/analytics"

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

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    track('theme:changed', { theme: newTheme, previous: theme })
  }

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border border-foreground/20 animate-pulse" />
    )
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-lg border border-foreground/20 hover:border-foreground/40 bg-background hover:bg-foreground/5 transition-colors grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
              >
                <Moon className="w-4 h-4" />
              </motion.div>
            ) : theme === "light" ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
              >
                <Sun className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="system"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute"
              >
                <Monitor className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="mt-2 min-w-[140px] border-foreground/10 bg-background"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="cursor-pointer gap-2 focus:bg-foreground/5"
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
          {theme === "light" && (
            <span className="ml-auto text-xs text-foreground/60">✓</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="cursor-pointer gap-2 focus:bg-foreground/5"
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <span className="ml-auto text-xs text-foreground/60">✓</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="cursor-pointer gap-2 focus:bg-foreground/5"
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
          {theme === "system" && (
            <span className="ml-auto text-xs text-foreground/60">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}