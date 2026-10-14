"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Plus } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { Service } from "@/types";

interface ServicesSectionProps {
  services: Service[];
}

const MAX_SERVICES = 4;

function getServiceText(service: Service, locale: string) {
  const tr = service.translations.find((t) => t.locale === locale);
  const fallback = service.translations[0];
  return {
    name: tr?.name ?? fallback?.name ?? service.key,
    heroSubtitle: tr?.heroSubtitle ?? fallback?.heroSubtitle ?? "",
  };
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const t = useTranslations("servicesSection");
  const locale = useLocale();

  const visible = services.slice(0, MAX_SERVICES);
  const remaining = Math.max(0, services.length - MAX_SERVICES);
  const hasMore = remaining > 0;

  if (services.length === 0) return null;

  return (
    <section
      aria-labelledby="home-services-title"
      className="relative py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2
            id="home-services-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <ul
          role="list"
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
            hasMore ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          {visible.map((service, i) => {
            const text = getServiceText(service, locale);

            return (
              <motion.li
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={service.href}
                  className="group relative block h-full rounded-2xl p-6 border border-border bg-surface hover:border-primary/40 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                      aria-hidden="true"
                    >
                      <Icon name={service.icon} className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-foreground">
                      {text.name}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-5 line-clamp-3">
                      {text.heroSubtitle}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      {t("learnMore")}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}

          {hasMore && (
            <motion.li
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: visible.length * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href="/services"
                className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl p-6 border border-dashed border-primary/40 bg-primary-soft/30 hover:bg-primary-soft hover:border-primary transition-all duration-300"
              >
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg glow-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <Plus className="h-7 w-7" strokeWidth={2.5} />
                </div>

                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-gradient leading-none tabular-nums">
                    +{remaining}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground-muted mt-2">
                    {t("moreServices")}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  {t("viewAll")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </motion.li>
          )}
        </ul>
      </div>
    </section>
  );
}