import { Metadata } from "next";
import RootLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Tochukwu Nwosa | Expert Frontend Developer & React Specialist",
  description:
    "Professional portfolio of Tochukwu Nwosa, a frontend developer specializing in creating high-performance, accessible web applications using React, Next.js, TypeScript, and Tailwind CSS. View my projects, skills, and experience.",
  keywords: [
    "Tochukwu Nwosa",
    "Frontend Developer Portfolio",
    "React Developer",
    "Next.js Expert",
    "JavaScript Developer",
    "TypeScript Specialist",
    "Tailwind CSS Developer",
    "React.js Projects",
    "Next.js Applications",
    "Senior Frontend Engineer",
    "UI/UX Developer",
    "Frontend Architect",
    "Web Application Developer",
    "Fullstack JavaScript Developer",
    "Single Page Application Development",
    "Progressive Web App Builder",
    "Frontend Performance Optimization",
    "Responsive Web Design Expert",
    "Web Accessibility Specialist",
    "Modern Web Development Portfolio",
    "Fast Loading Website Developer",
    "SEO-Friendly Frontend Developer",
    "Component-Based Architecture",
    "Mobile-First Development",
    "Clean Code Developer",
    "High-Performance Web Apps",
    "Optimized Frontend Solutions",
    "Scalable Frontend Architecture",
    "Lighthouse Score Optimization",
    "Jamstack Developer",
    "Frontend Development Services",
    "User-Centered Web Developer",
    "Interactive UI Developer",
    "Creative Web Solutions",
  ],
  metadataBase: new URL("https://tochukwu-nwosa.vercel.app"),
  openGraph: {
    title: "Tochukwu Nwosa | Professional Frontend Developer & React Expert",
    description:
      "Explore my portfolio showcasing modern, high-performance web applications built with React, Next.js, TypeScript, and Tailwind CSS. Specializing in responsive design, accessibility, and SEO-friendly development.",
    url: "https://tochukwu-nwosa.vercel.app",
    siteName: "Tochukwu Nwosa - Frontend Developer Portfolio",
    images: [
      {
        url: "https://tochukwu-nwosa.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tochukwu Nwosa's Frontend Developer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tochukwu Nwosa | Frontend Developer & React Specialist",
    description:
      "Professional portfolio showcasing expertise in Next.js, React, TypeScript, and modern frontend development. View my projects, technical skills, and development approach.",
    site: "@obere4u",
    creator: "@obere4u",
    images: ["https://tochukwu-nwosa.vercel.app/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
