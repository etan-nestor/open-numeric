import { api } from "../api";
import type { NavItem } from "@/types";

/**
 * Récupère l'arbre complet de navigation (récursif).
 * Endpoint : `GET /api/nav` — cache 5 min
 */
export async function getNavTree(): Promise<NavItem[]> {
  return api.get<NavItem[]>("/api/nav", { revalidate: 300 });
}