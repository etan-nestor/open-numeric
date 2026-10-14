"use client";

import { useTranslations } from "next-intl";
import {
  Layers,
  Globe,
  Calendar,
  Cpu,
  Search,
  X,
  RotateCcw,
} from "lucide-react";
import FilterSelect from "./FilterSelect";
import type {
  PortfolioFilters as FiltersData,
  ProjectCategory,
  ProjectScope,
} from "@/types";

export interface ActiveFilters {
  search: string;
  categories: ProjectCategory[];
  scopes: ProjectScope[];
  years: number[];
  techs: string[];
}

interface PortfolioFiltersProps {
  data: FiltersData;
  active: ActiveFilters;
  onChange: (next: ActiveFilters) => void;
  resultCount: number;
}

export default function PortfolioFilters({
  data,
  active,
  onChange,
  resultCount,
}: PortfolioFiltersProps) {
  const t = useTranslations("portfolio.filters");
  const tCat = useTranslations("portfolio.categories");
  const tScope = useTranslations("portfolio.scopes");

  const hasActive =
    active.search.length > 0 ||
    active.categories.length > 0 ||
    active.scopes.length > 0 ||
    active.years.length > 0 ||
    active.techs.length > 0;

  const clearAll = () =>
    onChange({
      search: "",
      categories: [],
      scopes: [],
      years: [],
      techs: [],
    });

  const toggleCategory = (v: string) => {
    const value = v as ProjectCategory;
    onChange({
      ...active,
      categories: active.categories.includes(value)
        ? active.categories.filter((c) => c !== value)
        : [...active.categories, value],
    });
  };

  const toggleScope = (v: string) => {
    const value = v as ProjectScope;
    onChange({
      ...active,
      scopes: active.scopes.includes(value)
        ? active.scopes.filter((s) => s !== value)
        : [...active.scopes, value],
    });
  };

  const toggleYear = (v: string) => {
    const value = Number(v);
    onChange({
      ...active,
      years: active.years.includes(value)
        ? active.years.filter((y) => y !== value)
        : [...active.years, value],
    });
  };

  const toggleTech = (v: string) => {
    onChange({
      ...active,
      techs: active.techs.includes(v)
        ? active.techs.filter((tt) => tt !== v)
        : [...active.techs, v],
    });
  };

  const categoryOptions = data.categories.map((c) => ({
    value: c.value,
    label: tCat(c.value),
    count: c.count,
  }));

  const scopeOptions = data.scopes.map((s) => ({
    value: s.value,
    label: tScope(s.value),
    count: s.count,
  }));

  const yearOptions = data.years.map((y) => ({
    value: y.value,
    label: y.value,
    count: y.count,
  }));

  const techOptions = data.techs.map((tt) => ({
    value: tt.value,
    label: tt.value,
    count: tt.count,
  }));

  return (
    <section
      aria-label="Filtres du portfolio"
      className="sticky top-20 z-30 py-4 bg-navbar-bg/95 backdrop-blur-md border-b border-navbar-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={active.search}
              onChange={(e) => onChange({ ...active, search: e.target.value })}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {active.search && (
              <button
                type="button"
                onClick={() => onChange({ ...active, search: "" })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-surface-hover transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="h-3.5 w-3.5 text-foreground-muted" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 sm:ml-auto">
            <span
              className="text-xs font-semibold text-foreground-muted tabular-nums"
              aria-live="polite"
            >
              {t("results", { count: resultCount })}
            </span>

            {hasActive && (
              <button
                type="button"
                onClick={clearAll}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground-muted hover:text-danger hover:bg-danger/10 transition-colors"
              >
                <RotateCcw
                  className="h-3 w-3 transition-transform group-hover:-rotate-180 duration-300"
                  aria-hidden="true"
                />
                {t("clear")}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <FilterSelect
            label={t("category")}
            icon={<Layers className="h-3.5 w-3.5" />}
            options={categoryOptions}
            selected={active.categories}
            onToggle={toggleCategory}
            onClear={() => onChange({ ...active, categories: [] })}
          />
          <FilterSelect
            label={t("scope")}
            icon={<Globe className="h-3.5 w-3.5" />}
            options={scopeOptions}
            selected={active.scopes}
            onToggle={toggleScope}
            onClear={() => onChange({ ...active, scopes: [] })}
          />
          <FilterSelect
            label={t("year")}
            icon={<Calendar className="h-3.5 w-3.5" />}
            options={yearOptions}
            selected={active.years.map(String)}
            onToggle={toggleYear}
            onClear={() => onChange({ ...active, years: [] })}
          />
          <FilterSelect
            label={t("tech")}
            icon={<Cpu className="h-3.5 w-3.5" />}
            options={techOptions}
            selected={active.techs}
            onToggle={toggleTech}
            onClear={() => onChange({ ...active, techs: [] })}
          />
        </div>
      </div>
    </section>
  );
}