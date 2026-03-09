"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

const SUBTITLE =
  "Currently building agentic systems at EverCurrent that plug into enterprise tools like Jira, GitHub, Teams, Outlook and more to solve coordination, visibility and knowledge retrieval.";

const socialLinks = [
  { icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: personal.social.github, label: "GitHub" },
  { icon: BookOpen, href: personal.social.googleScholar, label: "Google Scholar" },
];

type HintState = "hidden" | "visible" | "exiting";
type NavState = "hidden" | "visible" | "exiting";

export function SharedHero() {
  const { mode } = useMode();
  const [hintState, setHintState] = useState<HintState>("hidden");
  const [navState, setNavState] = useState<NavState>("hidden");
  const navExitCountRef = useRef(0);

  useEffect(() => {
    setHintState((prev) => {
      if (prev === "visible") return "exiting";
      setTimeout(() => setHintState("visible"), 600);
      return "hidden";
    });

    if (mode === "classic") {
      // Entering classic — show nav after a short delay
      setNavState("hidden");
      setTimeout(() => setNavState("visible"), 300);
    } else {
      // Leaving classic — scramble nav out if it was visible
      setNavState((prev) => {
        if (prev === "visible") {
          navExitCountRef.current = 0;
          return "exiting";
        }
        return "hidden";
      });
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
              Entropy → Order
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
            <ScrambleText text={SUBTITLE} speed={30} />
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

          {/* Mode hint — "Ask me anything" in chat, "Scroll to explore" in classic */}
          {hintState !== "hidden" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8"
            >
              <a
                href={mode === "classic" ? "#about" : undefined}
                className="flex flex-col items-start gap-3 text-(--muted-foreground) hover:text-(--foreground) transition-colors"
              >
                <span className="text-xs font-medium tracking-widest uppercase">
                  <ScrambleText
                    text={mode === "chat" ? "Ask me anything" : "Scroll to explore"}
                    animateOnMount
                    speed={25}
                    exiting={hintState === "exiting"}
                    onExitComplete={() => {
                      setHintState("hidden");
                      // Re-show after a short delay for the new mode
                      setTimeout(() => setHintState("visible"), 600);
                    }}
                  />
                </span>
                <motion.div
                  animate={{ opacity: hintState === "exiting" ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </a>
            </motion.div>
          )}

        </div>
      </div>

      {/* Right nav — mirrors navbar container so it aligns with ThemeToggle, classic mode only */}
      {navState !== "hidden" && (
        <div className="hidden md:block absolute inset-x-0 top-52 z-10 pointer-events-none">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 flex justify-end">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-end gap-5 pointer-events-auto"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="text-sm font-medium text-(--muted-foreground) hover:text-(--foreground) transition-colors tracking-wide"
                >
                  <ScrambleText
                    text={item.label}
                    animateOnMount
                    delay={80 + i * 50}
                    speed={30}
                    exiting={navState === "exiting"}
                    onExitComplete={() => {
                      navExitCountRef.current += 1;
                      if (navExitCountRef.current >= navItems.length) {
                        navExitCountRef.current = 0;
                        setNavState("hidden");
                      }
                    }}
                  />
                </motion.a>
              ))}
            </motion.nav>
          </div>
        </div>
      )}
    </section>
  );
}
