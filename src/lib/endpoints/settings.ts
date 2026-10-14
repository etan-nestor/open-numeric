import { api } from "../api";
import type { SiteSettings } from "@/types";

/**
 * Récupère la configuration globale du site.
 * Endpoint : `GET /api/settings` — cache 5 min
 */
export async function getSettings(): Promise<SiteSettings> {
  return api.get<SiteSettings>("/api/settings", { revalidate: 300 });
}