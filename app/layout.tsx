import { Metadata } from "next";
import RootLayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "Tochukwu Nwosa - Fullstack Engineer | React, Next.js, Node.js, TypeScript",
  description:
    "Fullstack Engineer with 3+ years shipping production software. React, Next.js, Node.js, NestJS, MongoDB. Built and running MyTreda — 80+ businesses, 1,400+ products tracked. Open to remote roles.",
  keywords: [
    "Tochukwu Nwosa",
    "Fullstack Engineer",
    "Fullstack Developer Portfolio",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "NestJS Developer",
    "TypeScript Developer",
    "MongoDB Developer",
    "JavaScript Developer",
    "Web Application Developer",
    "Fullstack JavaScript Developer",
    "REST API Developer",
    "Backend Developer Nigeria",
    "Frontend Developer Nigeria",
    "Remote Fullstack Engineer",
    "Performance Optimization",
    "Software Engineer Lagos",
  ],
  metadataBase: new URL("https://tochukwu-nwosa.vercel.app"),
  openGraph: {
    title: "Tochukwu Nwosa - Fullstack Engineer | React, Next.js, Node.js",
    description:
      "Building and shipping full-stack products. 80+ businesses on MyTreda, 500+ daily users on Kinlearn, 98+ PageSpeed scores.",
    url: "https://tochukwu-nwosa.vercel.app",
    siteName: "Tochukwu Nwosa - Fullstack Engineer",
    images: [
      {
        url: "https://tochukwu-nwosa.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tochukwu Nwosa - Fullstack Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tochukwu Nwosa - Fullstack Engineer | React, Next.js, Node.js",
    description:
      "Building and shipping full-stack products. 80+ businesses on MyTreda, 500+ daily users on Kinlearn.",
    site: "@obere4u",
    creator: "@obere4u",
    images: ["https://tochukwu-nwosa.vercel.app/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
