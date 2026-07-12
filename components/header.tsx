"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/container";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
  { href: "/lab", label: "实验室" },
  { href: "/about", label: "关于我" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/72 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="focus-ring group inline-flex shrink-0 items-center gap-3 rounded-lg text-white"
            aria-label="Chase Chen 首页"
            onClick={() => setMenuOpen(false)}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-200/25 bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-400 text-slate-950 shadow-neon transition group-hover:-translate-y-0.5">
              <span className="text-sm font-semibold">CC</span>
            </span>
            <span className="text-base font-semibold transition group-hover:text-cyan-100">
              Chase Chen
            </span>
          </Link>
          <span className="hidden h-7 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 text-xs font-medium text-slate-300 lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.75)]" />
            软件工程学生
          </span>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-200/30 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-haspopup="true"
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">导航菜单</span>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <nav
          aria-label="主要导航"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 text-sm text-slate-300 shadow-card md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 transition ${
                isActive(item.href)
                  ? "bg-cyan-300 font-medium text-slate-950 shadow-neon"
                  : "hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="移动端导航"
          className="border-t border-white/10 bg-slate-950/95 shadow-panel backdrop-blur md:hidden"
        >
          <Container className="grid grid-cols-2 gap-2 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`focus-ring rounded-lg px-4 py-3 text-sm transition ${
                  isActive(item.href)
                    ? "bg-cyan-300 font-medium text-slate-950 shadow-neon"
                    : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
