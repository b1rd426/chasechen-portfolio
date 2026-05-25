import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chase Chen | Software Engineering Portfolio",
    template: "%s | Chase Chen",
  },
  description:
    "Chase Chen 的个人技术作品集，展示项目、博客、技术实验和学习成长记录。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-canvas antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
