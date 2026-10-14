"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

const ASSURANCES = [
  {
    key: "privacy",
    icon: "ShieldCheck",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    key: "response",
    icon: "Clock",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    key: "free",
    icon: "BadgeCheck",
    accent: "from-orange-500 to-amber-500",
  },
] as const;

export default function QuoteAssurance() {
  const t = useTranslations("quote.assurances");

  return (
    <section
      aria-labelledby="quote-assurance-title"
      className="relative py-20 lg:py-28 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="quote-assurance-title" className="sr-only">
          Nos engagements
        </h2>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {ASSURANCES.map((item, i) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group relative h-full rounded-2xl p-6 sm:p-8 border border-border bg-surface overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl">
                <div
                  className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    aria-hidden="true"
                  >
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {t(`${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {t(`${item.key}.description`)}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}