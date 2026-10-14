"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp } from "lucide-react";

const STAT_KEYS = ["projects", "clients", "years", "countries"] as const;

export default function AboutStats() {
  const t = useTranslations("about.stats");

  return (
    <section
      aria-labelledby="about-stats-title"
      className="relative py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="about-stats-title"
            className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest font-bold text-foreground-subtle"
          >
            <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
            {t("label")}
          </h2>
        </motion.div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STAT_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl p-6 bg-surface border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl text-center"
            >
              <div
                className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-primary-soft blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50"
                aria-hidden="true"
              />
              <div className="relative">
                <dd className="text-4xl sm:text-5xl font-black text-gradient mb-2 tabular-nums">
                  {t(`items.${key}.value`)}
                </dd>
                <dt className="text-sm font-semibold text-foreground-muted">
                  {t(`items.${key}.label`)}
                </dt>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}