"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function DetailCta() {
  const t = useTranslations("projectDetail.cta");

  return (
    <section
      aria-labelledby="project-detail-cta-title"
      className="relative py-20 lg:py-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden border border-border bg-surface shadow-2xl"
        >
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
              id="project-detail-cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/devis"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t("primary")}
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-border-strong text-foreground hover:bg-surface-hover hover:border-primary transition-all duration-300"
              >
                {t("secondary")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}