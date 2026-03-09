"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

interface ScrambleTextProps {
  text: string;
  /** Delay in ms before animation starts (default 0) */
  delay?: number;
  /** Duration per character reveal in ms (default 40) */
  speed?: number;
  /** Called when the scramble-in animation finishes */
  onComplete?: () => void;
  /** Scramble from empty on first mount instead of showing text immediately */
  animateOnMount?: boolean;
  /** When true, runs the scramble-out animation (characters dissolve into glyphs) */
  exiting?: boolean;
  /** Called when the scramble-out animation finishes */
  onExitComplete?: () => void;
}

export function ScrambleText({
  text,
  delay = 0,
  speed = 40,
  onComplete,
  animateOnMount = false,
  exiting = false,
  onExitComplete,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(animateOnMount ? "" : text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTextRef = useRef(animateOnMount ? "" : text);
  // Track current displayed text for use in scramble-out
  const displayRef = useRef(animateOnMount ? "" : text);

  // Scramble-out: when exiting flips to true, dissolve characters left→right
  useEffect(() => {
    if (!exiting) return;

    if (frameRef.current) clearInterval(frameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const source = displayRef.current;
    let iteration = 0;
    const exitSpeed = Math.max(1, Math.floor(speed / 2));

    frameRef.current = setInterval(() => {
      const next = source
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          // Characters to the left of iteration are already scrambled — keep randomising them
          if (index <= iteration) return CHARS[Math.floor(Math.random() * CHARS.length)];
          return source[index];
        })
        .join("");

      setDisplay(next);
      displayRef.current = next;
      iteration += 0.5;

      if (iteration >= source.length) {
        clearInterval(frameRef.current!);
        onExitComplete?.();
      }
    }, exitSpeed);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exiting]);

  // Scramble-in: runs when text changes (or on mount with animateOnMount)
  useEffect(() => {
    if (exiting) return;

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

        const resolved = iteration < maxLength ? next : targetText;
        setDisplay(resolved);
        displayRef.current = resolved;

        iteration += 0.5;

        if (iteration >= targetText.length) {
          clearInterval(frameRef.current!);
          setDisplay(targetText);
          displayRef.current = targetText;
          prevTextRef.current = targetText;
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, speed, onComplete, exiting]);

  return <span>{display}</span>;
}
