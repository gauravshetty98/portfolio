"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading title="Skills." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-(--muted)/20 border border-(--border)/50"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-(--foreground) mb-6">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-full
                      bg-(--muted) text-(--muted-foreground)
                      hover:bg-(--foreground) hover:text-(--background)
                      transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
