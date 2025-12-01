import { LucideIcon, X, Mail, Github, Linkedin, MapPin } from "lucide-react";

interface Social {
  name: string;
  href: string;
  icon: LucideIcon
}

export const socialLinks = [
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
];