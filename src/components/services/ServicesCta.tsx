"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail } from "lucide-react";
import type { SiteSettings } from "@/types";

interface ServicesCtaProps {
  settings: SiteSettings | null;
}

export default function ServicesCta({ settings }: ServicesCtaProps) {
  const t = useTranslations("servicesPage.cta");

  if (!settings?.phone && !settings?.email) return null;

  return (
    <section
      aria-labelledby="services-cta-title"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden border border-border bg-surface shadow-2xl">
            <div
              className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary-soft blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary-soft blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <h2
                id="services-cta-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5"
              >
                {t("title")}
              </h2>
              <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {settings.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {t("primary")}
                  </a>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-border-strong text-foreground hover:bg-surface-hover hover:border-primary hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {t("secondary")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}