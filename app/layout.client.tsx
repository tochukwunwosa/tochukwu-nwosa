'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme/theme-provider';
import NavBar from '@/components/nav/nav-bar';
import Footer from '@/components/footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion';
import './globals.css';
import Script from 'next/script';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script
          async
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Tochukwu Nwosa',
                url: 'https://tochukwu-nwosa.vercel.app',
                jobTitle: 'Fullstack Engineer',
                sameAs: [
                  'https://github.com/tochukwunwosa',
                  'https://linkedin.com/in/nwosa-tochukwu',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Tochukwu Nwosa',
                url: 'https://tochukwu-nwosa.vercel.app',
              },
            ]),
          }}
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
            {!isStudio && <NavBar />}
            <AnimatePresence>
              {children}
            </AnimatePresence>
            {!isStudio && <Footer />}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
