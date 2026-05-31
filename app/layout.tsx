import type { Metadata } from "next";
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
  openGraph: {
    title: "Chase Chen | Software Engineering Portfolio",
    description:
      "软件工程大一学生 Chase Chen 的项目、博客、实验室和学习成长记录。",
    url: "https://www.chase0426.com",
    siteName: "Chase Chen Portfolio",
    locale: "zh_CN",
    type: "website",
  },
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
