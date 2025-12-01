"use client"
import { track } from "@/lib/analytics"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function ResumeDownload() {
  const handleDownload = () => {
    // link element
    const link = document.createElement("a")
    link.href = "/doc/Tochukwu_Nwosa_Frontend_Engineer_CV.pdf"
    link.download = "Tochukwu-Nwosa-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    track("resume--download", {
      source: "hero-section",
    })
  }

  return (
    <motion.button
      onClick={handleDownload}
      className="px-8 py-3.5 bg-foreground/10 hover:bg-foreground/15 text-foreground rounded-lg font-semibold transition-all flex items-center gap-2 border border-foreground/20 hover:border-foreground/40"
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download size={18} />
      Resume
    </motion.button>
  )
}
