import { LucideIcon, Mail, Github, Linkedin } from "lucide-react";
import type { IconType } from "react-icons";
import { FaXTwitter } from "react-icons/fa6";

interface Social {
  name: string;
  href: string;
  icon: LucideIcon | IconType
}

export const socialLinks: Social[] = [
  {
    name: "Email",
    href: "mailto:tochukwunwosa28@gmail.com",
    icon: Mail,
  },
  {
    name: "GitHub",
    href: "https://github.com/tochukwunwosa",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nwosa-tochukwu",
    icon: Linkedin,
  },
  {
    name: "X",
    href: "https://x.com/tochukwudev",
    icon: FaXTwitter,
  },
];