"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Mode = "chat" | "classic";

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

const classicHashes = new Set([
  "#about",
  "#experience",
  "#education",
  "#projects",
  "#publications",
  "#skills",
  "#contact",
]);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("chat");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && classicHashes.has(hash)) {
      setMode("classic");
    }
  }, []);

  function toggleMode() {
    setMode((prev) => (prev === "chat" ? "classic" : "chat"));
  }

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
