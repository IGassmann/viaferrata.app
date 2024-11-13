import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Via Ferrata",
  description: "Find a via ferrata near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white`}
    >
      <body className="mx-auto grid min-h-dvh max-w-7xl place-content-center px-4">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
