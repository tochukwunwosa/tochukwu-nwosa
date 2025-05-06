'use client';

import * as React from 'react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import NavBar from '@/components/nav/nav-bar';
import GridBG from '@/components/ui/grid-bg';
import Footer from '@/components/footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import './globals.css';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      </head>
      <body className="scroll-smooth snap-y snap-mandatory transition-colors duration-300 ease-in-out">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <GridBG />
            
      {/* bg Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b !from-foreground/90 !to-foreground/97 dark:!from-background/90  dark:!to-background/97" />
            <NavBar />
            <AnimatePresence>{children}</AnimatePresence>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
