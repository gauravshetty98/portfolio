"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

interface ScrambleTextProps {
  text: string;
  /** Delay in ms before animation starts (default 0) */
  delay?: number;
  /** Duration per character reveal in ms (default 40) */
  speed?: number;
  /** Called when the scramble animation finishes */
  onComplete?: () => void;
  /** Scramble from empty on first mount instead of showing text immediately */
  animateOnMount?: boolean;
}

export function ScrambleText({ text, delay = 0, speed = 40, onComplete, animateOnMount = false }: ScrambleTextProps) {
  const [display, setDisplay] = useState(animateOnMount ? "" : text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTextRef = useRef(animateOnMount ? "" : text);

  useEffect(() => {
    // Text hasn't changed — skip
    if (prevTextRef.current === text && display === text) return;

    // Clear any in-progress animation
    if (frameRef.current) clearInterval(frameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const targetText = text;
    let iteration = 0;
    const maxLength = Math.max(prevTextRef.current.length, targetText.length);

    timeoutRef.current = setTimeout(() => {
      frameRef.current = setInterval(() => {
        const next = targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return targetText[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        // Pad/trim to max length while resolving
        setDisplay(
          iteration < maxLength
            ? next
            : targetText
        );

        iteration += 0.5;

        if (iteration >= targetText.length) {
          clearInterval(frameRef.current!);
          setDisplay(targetText);
          prevTextRef.current = targetText;
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, delay, speed, onComplete]);

  return <span>{display}</span>;
}
