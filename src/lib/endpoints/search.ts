import { api } from "../api";
import type { SearchResponse } from "@/types";
import { buildQuery } from "./_utils";

export interface SearchParams {
  q: string;
  locale?: string;
  types?: string[];
  limit?: number;
}

/**
 * Recherche globale dans tout le contenu.
 * Endpoint : `GET /api/search?q=...&locale=fr` — pas de cache
 */
export async function search(params: SearchParams): Promise<SearchResponse> {
  const query = buildQuery({
    q: params.q,
    locale: params.locale,
    types: params.types,
    limit: params.limit,
  });

  return api.get<SearchResponse>(`/api/search${query}`, { revalidate: 0 });
}