import { api, ApiError } from "../api";
import type {
  FilterOption,
  PaginatedResponse,
  PortfolioFilters,
  Project,
  ProjectCategory,
  ProjectScope,
} from "@/types";
import { buildQuery } from "./_utils";

/* =========================================================
   QUERY
   ========================================================= */

export interface QueryProjectsParams {
  page?: number;
  limit?: number;
  category?: ProjectCategory[];
  scope?: ProjectScope[];
  year?: number[];
  tech?: string[];
  search?: string;
  featured?: boolean;
  status?: string;
}

/**
 * Recherche + pagine des projets.
 * Endpoint : `GET /api/projects?...`
 */
export async function queryProjects(
  params: QueryProjectsParams = {},
): Promise<PaginatedResponse<Project>> {
  const query = buildQuery({
    page: params.page,
    limit: params.limit,
    category: params.category,
    scope: params.scope,
    year: params.year,
    tech: params.tech,
    search: params.search,
    featured: params.featured,
    status: params.status,
  });

  return api.get<PaginatedResponse<Project>>(`/api/projects${query}`, {
    revalidate: 60,
  });
}

/**
 * Récupère TOUS les projets (sans pagination) pour calculer les filtres.
 * Endpoint : `GET /api/projects?limit=1000`
 *
 * ⚠️ À utiliser uniquement pour construire les filtres côté serveur.
 */
export async function getAllProjectsForFilters(): Promise<Project[]> {
  const res = await api.get<PaginatedResponse<Project>>(
    "/api/projects?limit=1000",
    { revalidate: 300 },
  );
  return res.items;
}

/**
 * Récupère un projet par son slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await api.get<Project>(`/api/projects/slug/${slug}`, {
      revalidate: 300,
    });
  } catch (err) {
    if (err instanceof ApiError && err.isNotFound) return null;
    throw err;
  }
}

/**
 * Récupère les projets similaires.
 */
export async function getSimilarProjects(slug: string): Promise<Project[]> {
  return api.get<Project[]>(`/api/projects/slug/${slug}/similar`, {
    revalidate: 300,
  });
}

/* =========================================================
   FILTRES (calculés côté serveur à partir de TOUS les projets)
   ========================================================= */

/**
 * Construit les options de filtres à partir d'une liste de projets.
 * ⚠️ À appeler UNIQUEMENT dans un Server Component.
 */
export function buildPortfolioFilters(
  projects: Project[],
): PortfolioFilters {
  const countBy = <T extends string>(key: (p: Project) => T) => {
    const map = new Map<T, number>();
    for (const p of projects) {
      const v = key(p);
      map.set(v, (map.get(v) ?? 0) + 1);
    }
    return map;
  };

  const catMap = countBy((p) => p.category);
  const scopeMap = countBy((p) => p.scope);
  const yearMap = countBy((p) => String(p.year));

  const techMap = new Map<string, number>();
  for (const p of projects) {
    for (const t of p.tech) techMap.set(t, (techMap.get(t) ?? 0) + 1);
  }

  return {
    categories: Array.from(catMap.entries())
      .map(([value, count]): FilterOption<ProjectCategory> => ({ value, count }))
      .sort((a, b) => b.count - a.count),
    scopes: Array.from(scopeMap.entries())
      .map(([value, count]): FilterOption<ProjectScope> => ({ value, count }))
      .sort((a, b) => b.count - a.count),
    years: Array.from(yearMap.entries())
      .map(([value, count]): FilterOption<string> => ({ value, count }))
      .sort((a, b) => Number(b.value) - Number(a.value)),
    techs: Array.from(techMap.entries())
      .map(([value, count]): FilterOption<string> => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20),
  };
}