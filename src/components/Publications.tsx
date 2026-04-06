"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/publications";
import { SectionHeading } from "./SectionHeading";

export function Publications() {
  return (
    <section id="publications" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Publications."
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
              className="group p-8 rounded-3xl bg-(--muted)/20 border border-(--border)/50
                hover:border-(--border) transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-(--foreground) text-(--background)">
                  {pub.publisher}
                </span>
                <ExternalLink className="w-5 h-5 text-(--muted-foreground) group-hover:text-(--foreground) transition-colors" />
              </div>
              <h3 className="font-bold text-xl mb-3 group-hover:underline decoration-2 underline-offset-4 text-(--foreground) leading-snug">
                {pub.title}
              </h3>
              <p className="text-sm font-mono text-(--muted-foreground)/70 mb-4">
                {pub.date}
              </p>
              <p className="text-base text-(--muted-foreground) leading-relaxed font-light">
                {pub.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
