"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getVariant } from "@/config/variants";

const variant = getVariant();
const showHowIWork = variant.key === "ai-swe";

const links = [
  { href: "/#about", label: "ABOUT" },
  ...(showHowIWork
    ? [{ href: "/#how-i-work", label: "HOW I WORK" }]
    : []),
  { href: "/#experience", label: "EXPERIENCE" },
  { href: "/#skills", label: "SKILLS" },
  { href: "/projects", label: "PROJECTS", isRoute: true },
  { href: "/resume", label: "RESUME", isRoute: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Hash links (/#about etc.) are anchors on /; only the route-style links
  // (/projects, /resume) get aria-current="page".
  const isCurrent = (href: string, isRoute: boolean | undefined) =>
    isRoute === true && pathname === href;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-xs font-medium tracking-[0.25em] text-accent"
            onClick={() => setOpen(false)}
          >
            CJ<span className="text-fg-dim">_</span>CLARK
          </Link>
          <span
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-accent-dim/40 rounded-[3px] font-mono text-[10px] text-fg-dim tracking-[0.16em] uppercase"
            title={`Viewing the ${variant.heroTitle} variant — see footer for the other two`}
          >
            {variant.key}
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8 text-xs font-mono tracking-wider">
          {links.map((l) => {
            const current = isCurrent(l.href, l.isRoute);
            const cls = current
              ? "text-accent transition-colors duration-300"
              : "text-fg-dim transition-colors duration-300 hover:text-accent";
            return l.isRoute ? (
              <Link
                key={l.href}
                href={l.href}
                className={cls}
                aria-current={current ? "page" : undefined}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={cls}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-1.5 p-1"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px w-5 bg-fg transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-fg transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-fg transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden border-t border-border/50 bg-bg/95 backdrop-blur-xl overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-60" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-4 px-6 py-6 text-sm font-mono tracking-wider">
          {links.map((l) => {
            const current = isCurrent(l.href, l.isRoute);
            const cls = current
              ? "text-accent transition-colors"
              : "text-fg-dim hover:text-accent transition-colors";
            return l.isRoute ? (
              <Link
                key={l.href}
                href={l.href}
                className={cls}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={cls}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
