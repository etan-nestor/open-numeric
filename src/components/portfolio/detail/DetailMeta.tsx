"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Calendar, User, CircleDot, Globe, Layers } from "lucide-react";
import type { Project } from "@/types";

interface DetailMetaProps {
  project: Project;
}

export default function DetailMeta({ project }: DetailMetaProps) {
  const t = useTranslations("projectDetail");

  const items = [
    {
      icon: Calendar,
      label: t("meta.year"),
      value: String(project.year),
      accent: "from-blue-500 to-cyan-500",
    },
    project.client
      ? {
          icon: User,
          label: t("meta.client"),
          value: project.client.name,
          accent: "from-purple-500 to-pink-500",
        }
      : null,
    {
      icon: CircleDot,
      label: t("meta.status"),
      value: t(`status.${project.status}`),
      accent: "from-emerald-500 to-teal-500",
    },
    {
      icon: Globe,
      label: t("meta.scope"),
      value: t(`scopes.${project.scope}`),
      accent: "from-orange-500 to-amber-500",
    },
    {
      icon: Layers,
      label: t("meta.category"),
      value: t(`categories.${project.category}`),
      accent: "from-rose-500 to-pink-500",
    },
  ].filter(Boolean) as {
    icon: typeof Calendar;
    label: string;
    value: string;
    accent: string;
  }[];

  return (
    <section
      aria-labelledby="project-detail-meta-title"
      className="relative py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="project-detail-meta-title" className="sr-only">
          Informations du projet
        </h2>

        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl p-4 bg-surface border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </div>
                <dt className="text-[10px] uppercase tracking-wider font-bold text-foreground-subtle mb-1">
                  {item.label}
                </dt>
                <dd className="text-sm font-bold text-foreground truncate">
                  {item.value}
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}