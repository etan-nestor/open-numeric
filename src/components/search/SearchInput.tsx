"use client";

import { useEffect, useState, useRef } from "react";
import { Search as SearchIcon, Loader2, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { search as searchApi } from "@/lib/endpoints";
import { ApiError } from "@/lib/api";
import type { SearchResponse } from "@/types";
import { SearchEmpty, SearchResults } from ".";

interface SearchInputProps {
  onClose: () => void;
}

export default function SearchInput({ onClose }: SearchInputProps) {
  const t = useTranslations("search");
  const locale = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchApi({
          q: trimmed,
          locale,
          limit: 20,
        });
        setResults(data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError(t("error"));
        }
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, locale, t]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const clear = () => {
    setQuery("");
    setResults(null);
    setError(null);
    inputRef.current?.focus();
  };

  const trimmed = query.trim();
  const showResults = trimmed.length >= 2 && !loading && results;
  const showEmpty = trimmed.length >= 2 && !loading && results && results.total === 0;
  const showHint = trimmed.length < 2;

  return (
    <>
      <div className="px-5 py-4 border-b border-border">
        <div className="relative">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-subtle pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {loading && (
            <Loader2
              className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary animate-spin"
              aria-hidden="true"
            />
          )}
          {!loading && query && (
            <button
              type="button"
              onClick={clear}
              aria-label={t("clear")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {showResults && results && (
          <p
            className="mt-3 text-xs text-foreground-subtle"
            aria-live="polite"
          >
            {t("resultsCount", { count: results.total })}
          </p>
        )}
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {showHint && <SearchHint />}
        {showResults && <SearchResults response={results} onClose={onClose} />}
        {showEmpty && <SearchEmpty query={trimmed} />}
        {error && (
          <div
            role="alert"
            className="p-6 text-center text-sm text-danger"
          >
            {error}
          </div>
        )}
      </div>
    </>
  );
}

function SearchHint() {
  const t = useTranslations("search");
  return (
    <div className="px-6 py-8 text-center">
      <p className="text-sm text-foreground-muted mb-1">{t("hint")}</p>
      <p className="text-xs text-foreground-subtle">{t("hintSub")}</p>
    </div>
  );
}