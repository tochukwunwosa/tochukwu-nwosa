import { Metadata } from "next";
import RootLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Tochukwu Nwosa - Frontend Engineer | React, Next.js, TypeScript",
  description:
    "Frontend Engineer with 3+ years experience. 40% performance improvements, 98+ PageSpeed scores. React, Next.js, TypeScript specialist.",
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
    title: "Tochukwu Nwosa - Frontend Engineer | React, Next.js, TypeScript",
    description:
      "Building fast, scalable web applications. 40% performance gains, 30% engagement increase.",
    url: "https://tochukwu-nwosa.vercel.app",
    siteName: "Tochukwu Nwosa - Frontend Developer",
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
      title: "Tochukwu Nwosa - Frontend Engineer | React, Next.js, TypeScript",
      description:
      "Building fast, scalable web applications. 40% performance gains, 30% engagement increase.",
    site: "@obere4u",
    creator: "@obere4u",
    images: ["https://tochukwu-nwosa.vercel.app/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
