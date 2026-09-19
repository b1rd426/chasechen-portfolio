import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";
import "./garden.css";
import "./editorial.css";

const siteTitle = "Chase Chen | Software Engineering Portfolio";
const siteDescription =
  "华南理工大学软件工程学生 Chase Chen 的个人技术作品集，记录 Web 开发、算法实验、项目复盘与学习成长。";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chase0426.com"),
  applicationName: "Chase Chen Portfolio",
  title: {
    default: siteTitle,
    template: "%s | Chase Chen",
  },
  description: siteDescription,
  keywords: [
    "Chase Chen",
    "软件工程",
    "华南理工大学",
    "个人作品集",
    "Web 开发",
    "数据结构与算法",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Chase Chen", url: "/about" }],
  creator: "Chase Chen",
  publisher: "Chase Chen",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Chase Chen Portfolio",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Chase Chen 软件工程作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#080b0d" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-canvas text-slate-100 antialiased">
        <a href="#main-content" className="skip-link">跳到正文</a>
        <div className="site-shell relative flex min-h-screen flex-col">
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
