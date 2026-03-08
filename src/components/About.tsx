"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading title="About Me." />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 sm:gap-12 mb-20 max-w-2xl"
        >
          {personal.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-(--foreground)">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-(--muted-foreground) mt-2 uppercase tracking-wider">
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
          className="flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-(--muted)/20 border border-(--border)/50"
        >
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-(--foreground) flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-(--background)" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-(--foreground)">
              {personal.education.university}
            </h3>
            <p className="text-lg font-medium text-(--muted-foreground) mt-1">
              {personal.education.degree}
            </p>
            <p className="text-sm font-mono text-(--muted-foreground)/70 mt-2">
              {personal.education.graduationDate}
            </p>
            <p className="text-base text-(--muted-foreground) mt-4 leading-relaxed font-light max-w-2xl">
              {personal.education.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
