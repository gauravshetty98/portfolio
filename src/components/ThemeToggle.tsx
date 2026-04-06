"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Coffee } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "warm" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full
        bg-(--muted) hover:bg-(--border) transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Coffee className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
}
