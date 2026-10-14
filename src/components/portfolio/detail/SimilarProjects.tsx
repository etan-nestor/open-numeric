"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers } from "lucide-react";
import ProjectCard from "../ProjectCard";
import type { Project } from "@/types";

interface SimilarProjectsProps {
  projects: Project[];
}

export default function SimilarProjects({ projects }: SimilarProjectsProps) {
  const t = useTranslations("projectDetail");

  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="project-detail-similar-title"
      className="relative py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md"
              aria-hidden="true"
            >
              <Layers className="h-5 w-5" />
            </span>
            <h2
              id="project-detail-similar-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {t("sections.similar")}
            </h2>
          </div>
        </motion.div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {projects.map((p, i) => (
            <li key={p.id}>
              <ProjectCard project={p} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}