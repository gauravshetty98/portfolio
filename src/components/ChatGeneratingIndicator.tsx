"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "./ScrambleText";

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

type Variant = "landing" | "widget";

const PHRASES_LANDING = [
  "[ GENERATING_RESPONSE... ]",
  "[ CONSULTING_PORTFOLIO_DATA... ]",
  "[ SYNTHESIZING_REPLY... ]",
] as const;

const PHRASES_WIDGET = [
  "[ GENERATING_RESPONSE... ]",
  "[ FETCHING_CONTEXT... ]",
  "[ SYNTHESIZING_REPLY... ]",
] as const;

/** Keeps ScrambleText alive: each phrase remount triggers a full scramble-in. */
function LoadingScramblePhrase({
  variant,
  speed = 20,
}: {
  variant: Variant;
  speed?: number;
}) {
  const phrases = variant === "widget" ? PHRASES_WIDGET : PHRASES_LANDING;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % phrases.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  return (
    <ScrambleText
      key={i}
      text={phrases[i] ?? phrases[0]}
      animateOnMount
      delay={0}
      speed={speed}
    />
  );
}

/** Thin indeterminate bar — matches terminal / mode-switch polish without a heavy spinner. */
function ShimmerBar({ className }: { className?: string }) {
  return (
    <div
      className={`relative mt-3 h-px overflow-hidden rounded-full bg-(--border) ${className ?? ""}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-y-0 w-1/3 rounded-full bg-(--foreground)/25"
        initial={{ left: "-33%" }}
        animate={{ left: ["-33%", "100%"] }}
        transition={{ duration: 1.35, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

/** Classic busy indicator: / - \ | (fixed width so the line does not jump). */
const BUSY_FRAMES = ["/", "-", "\\", "|"] as const;

function TerminalBusySpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFrame((n) => (n + 1) % BUSY_FRAMES.length);
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className="inline-block w-[1ch] shrink-0 pl-1 text-center select-none"
      aria-hidden
    >
      {BUSY_FRAMES[frame]}
    </span>
  );
}

/** Small rotating arc for compact spaces (send button). Softer than a full spinner. */
export function GeneratingMiniOrb({
  className,
  tone = "muted",
}: {
  className?: string;
  tone?: "muted" | "onGradient";
}) {
  const stroke =
    tone === "onGradient"
      ? "text-white/90"
      : "text-(--muted-foreground)";
  return (
    <motion.svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      className={`${stroke} ${className ?? ""}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="10 52"
        opacity={0.9}
      />
    </motion.svg>
  );
}

export function ChatGeneratingIndicator({ variant = "landing" }: { variant?: Variant }) {
  const scrambleSpeed = variant === "widget" ? 22 : 20;
  const row = (
    <span className="inline-flex flex-wrap items-baseline gap-0">
      <LoadingScramblePhrase variant={variant} speed={scrambleSpeed} />
      <TerminalBusySpinner />
    </span>
  );

  if (variant === "widget") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
        transition={{ duration: 0.35, ease }}
        className="flex justify-start"
      >
        <motion.div
          className="max-w-[85%] rounded-2xl rounded-bl-md border border-[var(--border)]/60 bg-[var(--muted)]/80 px-4 py-3 backdrop-blur-sm"
          animate={{ opacity: [0.94, 1, 0.94] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="font-mono text-xs tracking-tight text-[var(--muted-foreground)]">{row}</p>
          <ShimmerBar className="bg-[var(--border)]" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
      transition={{ duration: 0.3, ease }}
      className="max-w-xl"
    >
      <motion.div
        className="flex flex-col text-sm font-mono tracking-tight text-(--muted-foreground)"
        animate={{ opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {row}
        <ShimmerBar />
      </motion.div>
    </motion.div>
  );
}
