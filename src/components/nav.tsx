"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#how-i-work", label: "HOW I WORK" },
  { href: "/#experience", label: "EXPERIENCE" },
  { href: "/#skills", label: "SKILLS" },
  { href: "/projects", label: "PROJECTS", isRoute: true },
  { href: "/resume", label: "RESUME", isRoute: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-xs font-medium tracking-[0.25em] text-accent"
          onClick={() => setOpen(false)}
        >
          CJ<span className="text-fg-dim">_</span>CLARK
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8 text-xs font-mono tracking-wider">
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-fg-dim transition-colors duration-300 hover:text-accent"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-fg-dim transition-colors duration-300 hover:text-accent"
              >
                {l.label}
              </a>
            )
          )}
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
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-fg-dim hover:text-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-fg-dim hover:text-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
