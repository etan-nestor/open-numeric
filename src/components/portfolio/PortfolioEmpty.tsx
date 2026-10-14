"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, ArrowRight } from "lucide-react";

interface PortfolioEmptyProps {
  onClear: () => void;
}

export default function PortfolioEmpty({ onClear }: PortfolioEmptyProps) {
  const t = useTranslations("portfolio.empty");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl p-10 sm:p-16 text-center bg-surface border border-border overflow-hidden"
    >
      <div
        className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary-soft blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-secondary-soft blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <div
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-hover border border-border text-foreground-muted mb-6"
          aria-hidden="true"
        >
          <Search className="h-7 w-7" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          {t("title")}
        </h3>
        <p className="text-sm text-foreground-muted max-w-md mx-auto mb-8">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-foreground border border-border-strong hover:bg-surface-hover hover:border-primary transition-all"
          >
            Réinitialiser les filtres
          </button>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl transition-all"
          >
            {t("cta")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}