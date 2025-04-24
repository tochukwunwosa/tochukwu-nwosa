
import { ThemeProvider } from "@/components/theme/theme-provider";
import NavBar from "@/components/nav-bar";
import GridBG from "@/components/ui/grid-bg";
import Footer from "@/components/footer";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tochukwu Nwosa | Expert Frontend Developer & React Specialist",
  description: "Professional portfolio of Tochukwu Nwosa, a frontend developer specializing in creating high-performance, accessible web applications using React, Next.js, TypeScript, and Tailwind CSS. View my projects, skills, and experience.",
  keywords: [
    // Core identity keywords
    "Tochukwu Nwosa",
    "Frontend Developer Portfolio",
    "React Developer",
    "Next.js Expert",

    // Technical skills keywords (more specific)
    "JavaScript Developer",
    "TypeScript Specialist",
    "Tailwind CSS Developer",
    "React.js Projects",
    "Next.js Applications",

    // Role-based keywords
    "Senior Frontend Engineer",
    "UI/UX Developer",
    "Frontend Architect",
    "Web Application Developer",
    "Fullstack JavaScript Developer",

    // Technical specialty keywords
    "Single Page Application Development",
    "Progressive Web App Builder",
    "Frontend Performance Optimization",
    "Responsive Web Design Expert",
    "Web Accessibility Specialist",

    // Value proposition keywords
    "Modern Web Development Portfolio",
    "Fast Loading Website Developer",
    "SEO-Friendly Frontend Developer",
    "Component-Based Architecture",
    "Mobile-First Development",

    // Quality-focused keywords
    "Clean Code Developer",
    "High-Performance Web Apps",
    "Optimized Frontend Solutions",
    "Scalable Frontend Architecture",
    "Lighthouse Score Optimization",

    // Industry/methodology keywords
    "Jamstack Developer",
    "Frontend Development Services",
    "User-Centered Web Developer",
    "Interactive UI Developer",
    "Creative Web Solutions"
  ],
  metadataBase: new URL("https://tochukwu-nwosa.vercel.app"),
  openGraph: {
    title: "Tochukwu Nwosa | Professional Frontend Developer & React Expert",
    description: "Explore my portfolio showcasing modern, high-performance web applications built with React, Next.js, TypeScript, and Tailwind CSS. Specializing in responsive design, accessibility, and SEO-friendly development.",
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
    description: "Professional portfolio showcasing expertise in Next.js, React, TypeScript, and modern frontend development. View my projects, technical skills, and development approach.",
    site: "@obere4u",
    creator: "@obere4u",
    images: ["https://tochukwu-nwosa.vercel.app/og-image.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="scroll-smooth snap-y snap-mandatory transition-colors duration-300 ease-in-out">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <GridBG />
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}