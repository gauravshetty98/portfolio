"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import Link from "next/link";
import { basePath } from "@/lib/utils";

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Building intelligent systems is more than just a profession — it's my passion."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white shadow-lg shadow-blue-500/25"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--border)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group ${project.featured && i === 0 ? "md:col-span-2" : ""}`}
            >
              <Link href={`/projects/${project.slug}`}>
                <div
                  className="h-full rounded-2xl overflow-hidden bg-[var(--card)]
                    border border-[var(--border)] hover:border-[var(--accent)]/30
                    transition-all duration-300 hover:shadow-xl
                    hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={basePath(project.thumbnail)}
                      alt={project.shortTitle}
                      className="w-full h-48 object-cover transition-transform
                        duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60
                        to-transparent opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-end
                        justify-end p-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur
                          flex items-center justify-center"
                      >
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {project.shortTitle}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.keywords.slice(0, 4).map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-1 text-xs font-medium rounded-full
                            bg-[var(--muted)] text-[var(--muted-foreground)]"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
