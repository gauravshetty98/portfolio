"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading title="About Me." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-12">
          {/* Left Column: Bio & Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-lg text-(--muted-foreground) leading-relaxed font-light">
              {personal.bio}
            </p>
            <p className="text-lg text-(--muted-foreground) leading-relaxed font-light">
              When I'm not training models or architecting AI agents, I enjoy exploring new technologies and building tools that make life easier. I believe that building great systems requires stepping back, observing the world, and finding inspiration outside of the codebase.
            </p>
          </motion.div>

          {/* Right Column: Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-8">
              {personal.stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-4xl font-extrabold tracking-tighter text-(--foreground)">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-(--muted-foreground) mt-2 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
