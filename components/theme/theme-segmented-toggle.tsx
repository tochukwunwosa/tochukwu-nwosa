"use client"

import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { track } from "@/lib/analytics"

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export default function ThemeSegmentedToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className="h-9 w-[220px] rounded-full bg-foreground/5 animate-pulse" />
  }

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-full bg-foreground/8 border border-foreground/10">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => {
            setTheme(value)
            track("theme:changed", { theme: value, previous: theme })
          }}
          aria-label={`${label} theme`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-foreground/50 hover:text-foreground/80"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  )
}
