"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Star, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function getProjectText(project: Project, locale: string) {
  const tr = project.translations.find((t) => t.locale === locale);
  const fallback = project.translations[0];
  return {
    title: tr?.title ?? fallback?.title ?? project.slug,
    description: tr?.description ?? fallback?.description ?? "",
  };
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("portfolio");
  const tCard = useTranslations("portfolio.card");
  const tStatus = useTranslations("portfolio.status");
  const tScope = useTranslations("portfolio.scopes");
  const locale = useLocale();

  const { title, description } = getProjectText(project, locale);

  const statusColors: Record<string, string> = {
    COMPLETED: "bg-success/15 text-success",
    IN_PROGRESS: "bg-primary/15 text-primary",
    PLANNED: "bg-warning/15 text-warning",
    ARCHIVED: "bg-foreground-subtle/15 text-foreground-subtle",
  };

  const scopeColors: Record<string, string> = {
    INTERNAL: "bg-foreground-subtle/10 text-foreground-muted",
    CLIENT: "bg-primary-soft text-primary",
    PUBLIC: "bg-success/10 text-success",
    OPEN_SOURCE: "bg-secondary-soft text-secondary",
    EXTERNAL: "bg-warning/10 text-warning",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative block h-full rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-hover">
          <Image
            src={project.cover}
            alt={`${title} — projet Open Numeric`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"
            aria-hidden="true"
          />

          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  scopeColors[project.scope] ?? ""
                }`}
              >
                {tScope(project.scope)}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/90 text-amber-950">
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  {tCard("featured")}
                </span>
              )}
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                statusColors[project.status] ?? ""
              }`}
            >
              {tStatus(project.status)}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md text-white tabular-nums">
              {project.year}
            </span>
          </div>
        </div>

        <div className="relative p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-foreground-subtle mb-2">
            {t(`categories.${project.category}`)}
          </p>

          <h3 className="text-lg font-bold text-foreground mb-2 transition-colors group-hover:text-primary line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          <ul role="list" className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 3).map((tech) => (
              <li key={tech}>
                <span className="inline-flex px-2 py-0.5 rounded-md bg-surface-hover border border-border text-[10px] font-medium text-foreground-muted">
                  {tech}
                </span>
              </li>
            ))}
            {project.tech.length > 3 && (
              <li>
                <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium text-foreground-subtle">
                  +{project.tech.length - 3}
                </span>
              </li>
            )}
          </ul>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              {project.links?.slice(0, 2).map((link) => (
                <span
                  key={link.id}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-surface-hover border border-border text-foreground-muted"
                  aria-hidden="true"
                >
                  {link.type === "GITHUB" ? (
                    <Github className="h-3.5 w-3.5" />
                  ) : (
                    <ExternalLink className="h-3.5 w-3.5" />
                  )}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-2">
              {tCard("viewProject")}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}