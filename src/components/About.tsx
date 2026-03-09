"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";
import { basePath } from "@/lib/utils";

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
          className="w-full max-w-4xl"
        >
          <div className="group border border-(--border)/50 bg-(--muted)/10 rounded-none p-8 transition-colors hover:bg-(--muted)/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
              <div className="w-16 h-16 rounded-none overflow-hidden shrink-0 border border-(--border)/50 bg-(--background) p-2">
                <img
                  src={basePath(personal.education.logo)}
                  alt={personal.education.university}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight text-(--foreground)">
                  {personal.education.university}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <p className="font-medium text-base text-(--foreground)">
                    {personal.education.degree}
                  </p>
                  <span className="hidden sm:block text-(--muted-foreground)">•</span>
                  <p className="text-sm font-mono text-(--muted-foreground)">
                    {(personal.education as any).location}
                  </p>
                  <span className="hidden sm:block text-(--muted-foreground)">•</span>
                  <p className="text-sm font-mono text-(--muted-foreground)">
                    Class of {personal.education.graduationDate}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-base text-(--muted-foreground) leading-relaxed font-light">
              {personal.education.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
