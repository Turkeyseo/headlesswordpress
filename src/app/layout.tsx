import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSiteConfig } from "@/lib/config";
import ThemeInjector from "@/components/layout/ThemeInjector";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Headless WordPress",
  description: "Next.js powered WordPress headless CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSiteConfig();

  return (
    <html lang={config.language || 'en'}>
      <head>
        <ThemeInjector colors={config.colors} />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
