import { api } from "../api";
import type { Social } from "@/types";

/**
 * Récupère la liste des réseaux sociaux actifs.
 * Endpoint : `GET /api/socials` — cache 5 min
 */
export async function getSocials(): Promise<Social[]> {
  return api.get<Social[]>("/api/socials", { revalidate: 300 });
}