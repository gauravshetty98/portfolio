"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2
        className="text-3xl sm:text-4xl font-bold bg-gradient-to-r
          from-[var(--foreground)] to-[var(--muted-foreground)]
          bg-clip-text text-transparent"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--muted-foreground)] max-w-2xl text-lg">
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r
          from-[var(--gradient-start)] to-[var(--gradient-end)]"
      />
    </motion.div>
  );
}
