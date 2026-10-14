"use client";

import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchEmptyProps {
  query: string;
}

export default function SearchEmpty({ query }: SearchEmptyProps) {
  const t = useTranslations("search");

  return (
    <div className="px-6 py-12 text-center">
      <div
        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-hover border border-border text-foreground-muted mb-4"
        aria-hidden="true"
      >
        <SearchX className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">
        {t("empty.title")}
      </p>
      <p className="text-xs text-foreground-subtle">
        {t("empty.subtitle", { query })}
      </p>
    </div>
  );
}