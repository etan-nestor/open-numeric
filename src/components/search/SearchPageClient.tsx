"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Search as SearchIcon, Loader2, X, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { search as searchApi } from "@/lib/endpoints";
import { ApiError } from "@/lib/api";
import type { SearchResponse } from "@/types";
import SearchResults from "./SearchResults";
import SearchEmpty from "./SearchEmpty";

interface SearchPageClientProps {
  initialQuery: string;
}

export default function SearchPageClient({
  initialQuery,
}: SearchPageClientProps) {
  const t = useTranslations("search");
  const locale = useLocale();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const data = await searchApi({
          q: trimmed,
          locale,
          limit: 30,
        });
        if (!cancelled) setResults(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError(t("error"));
        }
        setResults(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, locale, t]);

  const trimmed = query.trim();
  const showResults = trimmed.length >= 2 && !loading && results;
  const showEmpty =
    trimmed.length >= 2 && !loading && results && results.total === 0;
  const showHint = trimmed.length < 2;

  return (
    <section
      aria-labelledby="search-page-title"
      className="relative pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-border"
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            {t("backHome")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1
            id="search-page-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3"
          >
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-foreground-muted">
            {t("pageSubtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8"
        >
          <SearchIcon
            className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-subtle pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            autoFocus
            aria-label={t("placeholder")}
            className="w-full pl-14 pr-14 py-4 rounded-2xl bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg"
          />
          {loading && (
            <Loader2
              className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary animate-spin"
              aria-hidden="true"
            />
          )}
          {!loading && query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("clear")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </motion.div>

        {showResults && results && (
          <p className="mb-4 text-sm text-foreground-subtle" aria-live="polite">
            {t("resultsCount", { count: results.total })}
          </p>
        )}

        <div className="rounded-2xl bg-surface border border-border overflow-hidden">
          {showHint && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-foreground-muted mb-1">{t("hint")}</p>
              <p className="text-xs text-foreground-subtle">{t("hintSub")}</p>
            </div>
          )}
          {showResults && <SearchResults response={results} onClose={() => {}} />}
          {showEmpty && <SearchEmpty query={trimmed} />}
          {error && (
            <div
              role="alert"
              className="p-8 text-center text-sm text-danger"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}