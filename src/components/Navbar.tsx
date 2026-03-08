"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ModeSwitcher } from "./ModeSwitcher";
import { useMode } from "./ModeProvider";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode } = useMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [mode]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-(--background)/80 backdrop-blur-xl border-b border-(--border)/50"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center h-20">

            {/* Logo — left */}
            <Link
              href="/"
              className="text-lg font-bold shrink-0 tracking-tighter text-(--foreground) hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              GS. <span className="font-mono text-xs font-normal text-(--muted-foreground) hidden sm:inline-block">{"// AI"}</span>
            </Link>

            {/* Mode switcher — absolute center */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
              <ModeSwitcher />
            </div>

            {/* Right side: theme toggle */}
            <div className="hidden md:flex items-center ml-auto">
              <ThemeToggle />
            </div>

            {/* Mobile: mode switcher + theme + hamburger */}
            <div className="flex items-center gap-3 md:hidden ml-auto">
              <ModeSwitcher />
              <ThemeToggle />
              {mode === "classic" && (
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 rounded-full hover:bg-(--muted)/50 transition-colors text-(--foreground)"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile nav dropdown — only in classic mode */}
      <AnimatePresence>
        {mobileOpen && mode === "classic" && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 top-20 z-40 bg-(--background)/95 backdrop-blur-xl border-b border-(--border)/50 md:hidden shadow-lg"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-(--muted-foreground)
                    hover:text-(--foreground) transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
