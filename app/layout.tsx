
import { ThemeProvider } from "@/components/theme/theme-provider";
import NavBar from "@/components/nav-bar";
import GridBG from "@/components/ui/grid-bg";
import Footer from "@/components/footer";
import { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata = {
  title: "Tochukwu Nwosa – Frontend Developer Portfolio",
  description: "Explore the frontend developer portfolio of Tochukwu Nwosa. Specializing in React, Next.js, Tailwind CSS, and building modern, accessible web applications.",
  keywords: [
    "Tochukwu Nwosa",
    "Frontend Developer",
    "React Developer",
    "Next.js Portfolio",
    "JavaScript Developer",
    "Web Developer",
    "Tailwind CSS",
    "TypeScript",
    "Frontend Engineer",
    "UI Developer",
    "Software Engineer Portfolio",
    "Frontend Projects",
    "Modern Web Development",
    "Fullstack Developer",
    "Frontend Portfolio",
    "PWA Developer",
    "Single Page Applications",
    "Progressive Web App",
    "SPA Optimization",
    "Responsive Design",
    "Accessible Web",
    "SEO Friendly",
    "Performance Optimization",
    "Lighthouse Score",
    "Jamstack Portfolio",
    "Frontend Showcase",
    "Creative Web Developer"
  ],
  metadataBase: new URL("https://tochukwu.dev"), // change to your actual domain
  openGraph: {
    title: "Tochukwu Nwosa – Frontend Developer",
    description: "Frontend developer portfolio built with React, Next.js, and Tailwind CSS.",
    url: "https://tochukwu.dev",
    siteName: "Tochukwu Nwosa Portfolio",
    images: [
      {
        url: "https://tochukwu.dev/og-image.png", // replace with your actual image
        width: 1200,
        height: 630,
        alt: "Tochukwu Nwosa Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tochukwu Nwosa – Frontend Developer",
    description: "Frontend portfolio built with React, Next.js, and Tailwind CSS.",
    site: "@yourhandle", // optional
    creator: "@yourhandle", // optional
    images: ["https://tochukwu.dev/og-image.png"],
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