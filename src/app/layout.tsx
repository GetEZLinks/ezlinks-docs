import type { Metadata } from "next";
import { ThemeProvider } from '@/hooks/useTheme';
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: 'EZLinks - Deep links made simple.',
  description: 'Ship deep links in minutes, not days. We handle the complex plumbing of deep linking automatically, so you can focus on building your product.',
};


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-sans bg-white dark:bg-black text-black dark:text-white`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}




