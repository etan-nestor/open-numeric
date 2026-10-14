"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Star } from "lucide-react";
import type { Project } from "@/types";

interface DetailHeroProps {
  project: Project;
}

function getProjectText(project: Project, locale: string) {
  const tr = project.translations.find((t) => t.locale === locale);
  const fallback = project.translations[0];
  return {
    title: tr?.title ?? fallback?.title ?? project.slug,
    description: tr?.description ?? fallback?.description ?? "",
  };
}

export default function DetailHero({ project }: DetailHeroProps) {
  const t = useTranslations("projectDetail");
  const locale = useLocale();

  const { title, description } = getProjectText(project, locale);

  const scopeColors: Record<string, string> = {
    INTERNAL:
      "bg-foreground-subtle/10 text-foreground-muted border-foreground-subtle/20",
    CLIENT: "bg-primary-soft text-primary border-primary/20",
    PUBLIC: "bg-success/10 text-success border-success/20",
    OPEN_SOURCE: "bg-secondary-soft text-secondary border-secondary/20",
    EXTERNAL: "bg-warning/10 text-warning border-warning/20",
  };

  const statusColors: Record<string, string> = {
    COMPLETED: "bg-success/15 text-success",
    IN_PROGRESS: "bg-primary/15 text-primary",
    PLANNED: "bg-warning/15 text-warning",
    ARCHIVED: "bg-foreground-subtle/15 text-foreground-subtle",
  };

  return (
    <section
      aria-labelledby="project-detail-title"
      className="relative pt-24 pb-8 lg:pt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            {t("breadcrumb.portfolio")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                scopeColors[project.scope] ?? ""
              }`}
            >
              {t(`scopes.${project.scope}`)}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                statusColors[project.status] ?? ""
              }`}
            >
              {t(`status.${project.status}`)}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400/90 text-amber-950">
                <Star
                  className="h-3 w-3 fill-current"
                  aria-hidden="true"
                />
                Featured
              </span>
            )}
          </div>

          <h1
            id="project-detail-title"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-5"
          >
            {title}
          </h1>

          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-border shadow-2xl"
        >
          <div className="aspect-[16/9] relative">
            <Image
              src={project.heroImage ?? project.cover}
              alt={`${title} — projet Open Numeric`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}