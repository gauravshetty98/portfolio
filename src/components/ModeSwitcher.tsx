"use client";

import { motion } from "framer-motion";
import { useMode } from "./ModeProvider";

export function ModeSwitcher() {
  const { mode, setMode } = useMode();

  return (
    <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
      <button
        onClick={() => setMode("chat")}
        className={`relative px-3 py-1.5 transition-all duration-300 ${
          mode === "chat"
            ? "text-(--foreground)"
            : "text-(--muted-foreground) hover:text-(--foreground)"
        }`}
      >
        {mode === "chat" && (
          <motion.span
            layoutId="bracket-left"
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            [
          </motion.span>
        )}
        <span className="relative z-10">CHAT</span>
        {mode === "chat" && (
          <motion.span
            layoutId="bracket-right"
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            ]
          </motion.span>
        )}
      </button>

      <span className="text-(--border)">/</span>

      <button
        onClick={() => setMode("classic")}
        className={`relative px-3 py-1.5 transition-all duration-300 ${
          mode === "classic"
            ? "text-(--foreground)"
            : "text-(--muted-foreground) hover:text-(--foreground)"
        }`}
      >
        {mode === "classic" && (
          <motion.span
            layoutId="bracket-left"
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            [
          </motion.span>
        )}
        <span className="relative z-10">CLASSIC</span>
        {mode === "classic" && (
          <motion.span
            layoutId="bracket-right"
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            ]
          </motion.span>
        )}
      </button>
    </div>
  );
}
