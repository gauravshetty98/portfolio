"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/publications";
import { SectionHeading } from "./SectionHeading";

export function Publications() {
  return (
    <section id="publications" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Publications"
          subtitle="Curious about my research? Explore my published papers and see how data turns into discovery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, i) => (
            <motion.a
              key={i}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]
                hover:border-[var(--accent)]/30 transition-all duration-300
                hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="px-3 py-1 text-xs font-medium rounded-full
                    bg-[var(--accent)]/10 text-[var(--accent)]"
                >
                  {pub.publisher}
                </span>
                <ExternalLink
                  className="w-4 h-4 text-[var(--muted-foreground)]
                    group-hover:text-[var(--accent)] transition-colors"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                {pub.title}
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] mb-3">
                {pub.date}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {pub.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
