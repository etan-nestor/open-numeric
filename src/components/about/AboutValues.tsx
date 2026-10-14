"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, Heart, Lightbulb, TrendingUp } from "lucide-react";

const VALUES = [
  { key: "excellence", icon: Sparkles, accent: "from-blue-500 to-cyan-500" },
  { key: "proximity", icon: Heart, accent: "from-rose-500 to-pink-500" },
  { key: "innovation", icon: Lightbulb, accent: "from-violet-500 to-purple-500" },
  { key: "impact", icon: TrendingUp, accent: "from-emerald-500 to-teal-500" },
] as const;

export default function AboutValues() {
  const t = useTranslations("about.values");

  return (
    <section
      aria-labelledby="about-values-title"
      className="relative py-16 lg:py-24 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-bold text-foreground-subtle mb-3 block">
            {t("label")}
          </span>
          <h2
            id="about-values-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.li
                key={v.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl p-6 bg-surface border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl"
              >
                <div
                  className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${v.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${v.accent} text-white shadow-lg mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground transition-colors group-hover:text-primary">
                    {t(`items.${v.key}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {t(`items.${v.key}.description`)}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}