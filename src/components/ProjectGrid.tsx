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
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Projects."
          subtitle="Building intelligent systems is more than just a profession — it's my passion."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-(--foreground) text-(--background)"
                  : "bg-(--muted)/50 text-(--muted-foreground) hover:bg-(--border)/50 hover:text-(--foreground)"
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
                  className="h-full rounded-3xl overflow-hidden bg-(--muted)/20
                    border border-(--border)/50 hover:border-(--border)
                    transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={basePath(project.thumbnail)}
                      alt={project.shortTitle}
                      className="w-full h-full object-cover transition-all
                        duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-end justify-end p-6"
                    >
                      <div
                        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm
                          flex items-center justify-center text-black"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="font-bold text-xl sm:text-2xl mb-3 tracking-tight text-(--foreground) group-hover:underline decoration-2 underline-offset-4">
                      {project.shortTitle}
                    </h3>
                    <p className="text-base text-(--muted-foreground) mb-6 line-clamp-2 font-light leading-relaxed">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords.slice(0, 4).map((kw) => (
                        <span
                          key={kw}
                          className="px-3 py-1.5 text-xs font-medium rounded-full
                            bg-(--muted) text-(--muted-foreground)"
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
