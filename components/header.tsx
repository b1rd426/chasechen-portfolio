"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const navItems = [
  { href: "/", label: "首页", english: "HOME" },
  { href: "/projects", label: "作品", english: "WORK" },
  { href: "/blog", label: "手记", english: "JOURNAL" },
  { href: "/lab", label: "实验室", english: "LAB" },
  { href: "/about", label: "关于", english: "ABOUT" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isActive = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const query = matchMedia("(min-width: 768px)");
    const onSize = () => { if (query.matches) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    query.addEventListener("change", onSize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      query.removeEventListener("change", onSize);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="garden-header">
      <div className="garden-header-inner">
        <Link href="/" className="garden-brand focus-ring" aria-label="Chase Chen 首页" onClick={() => setMenuOpen(false)}>
          <span><strong>Chase Chen<span className="garden-brand-period">.</span></strong><small>A GARDEN OF IDEAS</small></span>
        </Link>
        <nav className="garden-desktop-nav" aria-label="主要导航">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              <span>{item.label}</span><small>{item.english}</small>
            </Link>
          ))}
        </nav>
        <a className="garden-header-github" href={profile.github} target="_blank" rel="noreferrer" aria-label="打开 Chase Chen 的 GitHub">GITHUB <ArrowUpRight size={14} /></a>
        <button ref={menuButton} type="button" className="garden-menu-toggle focus-ring" aria-expanded={menuOpen}
          aria-controls="mobile-navigation" aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="garden-mobile-nav" aria-label="移动端导航">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span><span>{item.label}</span><small>{item.english}</small><ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
