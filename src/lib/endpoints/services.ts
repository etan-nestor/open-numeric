import { api, ApiError } from "../api";
import type { Service } from "@/types";

/**
 * Récupère tous les services actifs (avec catégories + items + traductions).
 * Endpoint : `GET /api/services` — cache 5 min
 */
export async function getServices(): Promise<Service[]> {
  return api.get<Service[]>("/api/services", { revalidate: 300 });
}

/**
 * Récupère un service par son slug.
 * Endpoint : `GET /api/services/:slug` — cache 5 min
 * Retourne `null` si introuvable (404).
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await api.get<Service>(`/api/services/${slug}`, {
      revalidate: 300,
    });
  } catch (err) {
    if (err instanceof ApiError && err.isNotFound) return null;
    throw err;
  }
}