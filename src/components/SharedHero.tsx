"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, BookOpen, ArrowDown } from "lucide-react";
import { personal } from "@/data/personal";
import { useMode } from "./ModeProvider";
import { ScrambleText } from "./ScrambleText";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

const CHAT_SUBTITLE = "I build intelligent systems and predictive models. Ask me anything below.";
const CLASSIC_SUBTITLE = "Scroll to explore my work, experience, and skills.";

const socialLinks = [
  { icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: personal.social.github, label: "GitHub" },
  { icon: BookOpen, href: personal.social.googleScholar, label: "Google Scholar" },
];

export function SharedHero() {
  const { mode } = useMode();
  const [showScrollHint, setShowScrollHint] = useState(false);

  const subtitle = mode === "chat" ? CHAT_SUBTITLE : CLASSIC_SUBTITLE;

  // Delay the scroll indicator until after the scramble settles
  useEffect(() => {
    setShowScrollHint(false);
    if (mode === "classic") {
      const t = setTimeout(() => setShowScrollHint(true), 600);
      return () => clearTimeout(t);
    }
  }, [mode]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Shared Background Grid & Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute inset-0 bg-(--background) mask-[radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
      </div>

      {/* Hero content — aligned with chat bar (max-w-3xl) */}
      <div className="max-w-3xl w-full mx-auto px-6 pt-32 z-10 relative">
        <div className="flex flex-col items-start gap-6 mt-12 mb-16">

          {/* Identity pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-mono text-xs text-(--muted-foreground) tracking-widest uppercase border border-(--border) px-3 py-1 rounded-full bg-(--muted)/30">
              System_Ready // v2.0
            </span>
          </motion.div>

          {/* Main title — never changes */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-7xl font-bold tracking-tighter text-(--foreground) leading-[1.1]"
          >
            Gaurav Shetty. <br />
            <span className="text-(--muted-foreground) font-medium">AI Engineer.</span>
          </motion.h1>

          {/* Scrambling subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg text-(--muted-foreground) max-w-xl leading-relaxed font-light min-h-7"
          >
            <ScrambleText text={subtitle} speed={30} />
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex items-center gap-5 mt-4"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-(--muted-foreground) hover:text-(--foreground) transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Scroll indicator — only in classic mode, after scramble finishes */}
          <AnimatePresence>
            {showScrollHint && (
              <motion.div
                key="scroll-hint"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="mt-8"
              >
                <a
                  href="#about"
                  className="flex flex-col items-start gap-3 text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  <span className="text-xs font-medium tracking-widest uppercase">
                      <ScrambleText text="Scroll to explore" animateOnMount speed={25} />
                    </span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </motion.div>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Right nav — mirrors navbar container so it aligns with ThemeToggle, classic mode only */}
      <AnimatePresence>
        {mode === "classic" && (
          <div className="hidden md:block absolute inset-x-0 top-52 z-10 pointer-events-none">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex justify-end">
              <motion.nav
                key="hero-nav"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-end gap-5 pointer-events-auto"
              >
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) transition-colors tracking-wide"
                  >
                    <ScrambleText text={item.label} animateOnMount delay={120 + i * 60} speed={30} />
                  </motion.a>
                ))}
              </motion.nav>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
