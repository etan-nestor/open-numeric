"use client";

import { useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  PortfolioHero,
  PortfolioFilters,
  ProjectGrid,
  PortfolioPagination,
  PortfolioEmpty,
  type ActiveFilters,
} from "@/components/portfolio";
import type {
  PaginatedResponse,
  PortfolioFilters as FiltersData,
  Project,
} from "@/types";

interface PortfolioPageClientProps {
  projects: PaginatedResponse<Project>;
  filterData: FiltersData;
  initialFilters: ActiveFilters;
}

export default function PortfolioPageClient({
  projects,
  filterData,
  initialFilters,
}: PortfolioPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFiltersChange = useCallback(
    (next: ActiveFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("page");

      if (next.search) params.set("search", next.search);
      else params.delete("search");

      if (next.categories.length)
        params.set("category", next.categories.join(","));
      else params.delete("category");

      if (next.scopes.length) params.set("scope", next.scopes.join(","));
      else params.delete("scope");

      if (next.years.length) params.set("year", next.years.join(","));
      else params.delete("year");

      if (next.techs.length) params.set("tech", next.techs.join(","));
      else params.delete("tech");

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page > 1) params.set("page", String(page));
      else params.delete("page");

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }, [router, pathname]);

  return (
    <>
      <PortfolioHero />

      <PortfolioFilters
        data={filterData}
        active={initialFilters}
        onChange={handleFiltersChange}
        resultCount={projects.total}
      />

      <section
        aria-labelledby="portfolio-grid-title"
        className="relative pb-16 lg:pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="portfolio-grid-title" className="sr-only">
            Projets
          </h2>

          <div
            className={`transition-opacity duration-200 ${
              isPending ? "opacity-40" : "opacity-100"
            }`}
            aria-busy={isPending}
          >
            {projects.items.length > 0 ? (
              <ProjectGrid projects={projects.items} />
            ) : (
              <PortfolioEmpty onClear={clearFilters} />
            )}
          </div>

          {projects.items.length > 0 && (
            <PortfolioPagination
              page={projects.page}
              totalPages={projects.totalPages}
              onChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </>
  );
}