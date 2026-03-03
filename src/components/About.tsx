"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";
import { basePath } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 max-w-lg"
        >
          {personal.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r
                  from-[var(--gradient-start)] to-[var(--gradient-end)]
                  bg-clip-text text-transparent"
              >
                {stat.value}
              </div>
              <div className="text-sm text-[var(--muted-foreground)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)]
            border border-[var(--border)]"
        >
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br
              from-[var(--gradient-start)] to-[var(--gradient-end)]
              flex items-center justify-center"
          >
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {personal.education.university}
            </h3>
            <p className="text-[var(--accent)] font-medium">
              {personal.education.degree}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {personal.education.graduationDate}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              {personal.education.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
