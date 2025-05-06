import React from 'react'

export default function GridBG() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        aria-hidden="true"
        className="w-full h-full text-primary-600 animate-[gridmove_20s_linear_infinite] blur-sm"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin slice"
      >
        <pattern
          id="grid"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* subtle overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b !from-foreground/95 !to-foreground/95 dark:!from-background/95 dark:!to-background/95"
      />
    </div>
  )
}
