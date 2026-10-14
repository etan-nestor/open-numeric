"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function PortfolioPagination({
  page,
  totalPages,
  onChange,
}: PortfolioPaginationProps) {
  const t = useTranslations("portfolio.pagination");

  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  const pushRange = (from: number, to: number) => {
    for (let i = from; i <= to; i++) pages.push(i);
  };

  if (totalPages <= 7) {
    pushRange(1, totalPages);
  } else if (page <= 4) {
    pushRange(1, 5);
    pages.push("...");
    pages.push(totalPages);
  } else if (page >= totalPages - 3) {
    pages.push(1);
    pages.push("...");
    pushRange(totalPages - 4, totalPages);
  } else {
    pages.push(1);
    pages.push("...");
    pushRange(page - 1, page + 1);
    pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav
      aria-label="Pagination du portfolio"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border"
    >
      <p className="text-sm text-foreground-muted tabular-nums">
        {t("page", { current: page, total: totalPages })}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-muted hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground-muted transition-all"
          aria-label={t("previous")}
        >
          <ChevronLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`e-${i}`}
              className="px-2 text-foreground-subtle select-none"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Page ${p}`}
              className={`relative inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-all ${
                p === page
                  ? "text-primary-foreground"
                  : "text-foreground-muted border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {p === page && (
                <motion.span
                  layoutId="active-page"
                  className="absolute inset-0 rounded-xl bg-gradient-primary shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{p}</span>
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-muted hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground-muted transition-all"
          aria-label={t("next")}
        >
          <ChevronRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}