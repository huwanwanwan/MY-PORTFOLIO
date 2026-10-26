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
      { url: "/logo-of-me.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/logo-of-me.png", type: "image/png" },
    ],
    shortcut: "/logo-of-me.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/logo-of-me.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-of-me.png" />
        <link rel="shortcut icon" href="/logo-of-me.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
