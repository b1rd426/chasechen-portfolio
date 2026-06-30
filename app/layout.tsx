import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/aurora-background";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chase0426.com"),
  title: {
    default: "Chase Chen | Software Engineering Portfolio",
    template: "%s | Chase Chen",
  },
  description:
    "Chase Chen 的个人技术作品集，展示项目、博客、技术实验和学习成长记录。",
  keywords: [
    "Chase Chen",
    "软件工程",
    "个人作品集",
    "Next.js",
    "React",
    "TypeScript",
    "算法可视化",
  ],
  authors: [{ name: "Chase Chen", url: "https://www.chase0426.com" }],
  creator: "Chase Chen",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Chase Chen | Software Engineering Portfolio",
    description:
      "软件工程大一学生 Chase Chen 的项目、博客、实验室和学习成长记录。",
    url: "https://www.chase0426.com",
    siteName: "Chase Chen Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Chase Chen Portfolio",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chase Chen | Software Engineering Portfolio",
    description:
      "软件工程大一学生 Chase Chen 的项目、博客、实验室和学习成长记录。",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#030712",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-canvas text-slate-100 antialiased">
        <AuroraBackground />
        <CursorSpotlight />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
