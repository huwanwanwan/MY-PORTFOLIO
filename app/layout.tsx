import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Domanico Militante | Portfolio",
  description: "The personal and professional portfolio of Juan Domanico Militante.",
  icons: {
    icon: [
      { url: "/logo-of-me.png", sizes: "any" },
      { url: "/logo-of-me.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/logo-of-me.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo-of-me.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-of-me.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/logo-of-me.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/logo-of-me.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-of-me.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-of-me.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-of-me.png" />
        <link rel="shortcut icon" href="/logo-of-me.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#121110" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
