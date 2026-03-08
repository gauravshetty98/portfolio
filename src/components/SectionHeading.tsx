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
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="mb-16"
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-(--foreground)">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-(--muted-foreground) max-w-2xl text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
