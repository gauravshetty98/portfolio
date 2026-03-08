"use client";

import { motion } from "framer-motion";
import { MessageSquare, LayoutList } from "lucide-react";
import { useMode } from "./ModeProvider";

export function ModeSwitcher() {
  const { mode, setMode } = useMode();

  return (
    <div
      className="relative flex items-center gap-1 p-1 rounded-full
        bg-(--muted)/50 border border-(--border)/50 backdrop-blur-sm"
    >
      {/* Sliding highlight */}
      <motion.div
        layoutId="mode-indicator"
        className="absolute inset-y-1 rounded-full bg-(--foreground) shadow-sm"
        style={{
          left: mode === "chat" ? "4px" : "calc(50%)",
          width: "calc(50% - 4px)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />

      <button
        onClick={() => setMode("chat")}
        className={`relative z-10 flex items-center gap-2 px-4 py-1.5 text-sm font-medium
          rounded-full transition-colors duration-200 ${
            mode === "chat"
              ? "text-(--background)"
              : "text-(--muted-foreground) hover:text-(--foreground)"
          }`}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Chat</span>
      </button>

      <button
        onClick={() => setMode("classic")}
        className={`relative z-10 flex items-center gap-2 px-4 py-1.5 text-sm font-medium
          rounded-full transition-colors duration-200 ${
            mode === "classic"
              ? "text-(--background)"
              : "text-(--muted-foreground) hover:text-(--foreground)"
          }`}
      >
        <LayoutList className="w-3.5 h-3.5" />
        <span>Classic</span>
      </button>
    </div>
  );
}
