import type { Metadata } from "next";
import { ThemeProvider } from '@/hooks/useTheme';
import { Inter, JetBrains_Mono, Vollkorn } from "next/font/google";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: 'EZLinks - Deep links made simple.',
  description: 'Ship deep links in minutes, not days. We handle the complex plumbing of deep linking automatically, so you can focus on building your product.',
};
// app/layout.tsx (This is the only file named 'layout.tsx' in the /app folder)

// Imports from both previous layouts combined

import Sidebar from '../components/Sidebar';
import PageNavigation from '../components/PageNavigation';
import MobileNav from '../components/MobileNav';
import styles from '../styles/DocsLayout.module.scss';
import Header from "@/components/Header/Header";

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const vollkorn = Vollkorn({ subsets: ['latin'], variable: '--font-vollkorn', weight: ['500', '600'] });


export default function RootLayout({ // It's still called RootLayout, but its content is rich
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ROOT LAYOUT part (HTML structure)
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable} ${vollkorn.variable} font-sans bg-white dark:bg-black text-black dark:text-white`}>
        <ThemeProvider>
          
          {/* DOCS LAYOUT part (Sidebar/Nav structure) */}
          <div className={inter.className}>
            <MobileNav />
            <Header />
            <div className={styles.docsContainer}>
              <Sidebar />
              <main className={styles.mainContent}>
                {children} {/* Your page content */}
              </main>
              <PageNavigation />
            </div>
          </div>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
