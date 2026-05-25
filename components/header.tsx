"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/80 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-tight text-ink-950"
            aria-label="Chase Chen 首页"
            onClick={() => setMenuOpen(false)}
          >
            <span className="mr-2 text-brand-600">&lt;/&gt;</span>
            Chase Chen
          </Link>
          <span className="hidden rounded-full border border-blue-100 bg-brand-50 px-3 py-1 text-xs text-brand-700 lg:inline-flex">
            软件工程学生
          </span>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">导航菜单</span>
          <span className="space-y-1.5">
            <span
              className={`block h-px w-5 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
        <nav
          aria-label="主要导航"
          className="hidden items-center gap-1 text-sm text-slate-600 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-4 py-2 transition ${
                isActive(item.href)
                  ? "bg-brand-50 font-medium text-brand-700"
                  : "hover:bg-slate-100 hover:text-ink-950"
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
          className="border-t border-slate-100 bg-white md:hidden"
        >
          <Container className="grid grid-cols-2 gap-2 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition ${
                  isActive(item.href)
                    ? "bg-brand-50 font-medium text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-ink-950"
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
