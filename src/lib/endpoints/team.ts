import { api } from "../api";
import type { TeamMember } from "@/types";

/**
 * Récupère la liste des membres actifs.
 * Endpoint : `GET /api/team` — cache 5 min
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  return api.get<TeamMember[]>("/api/team", { revalidate: 300 });
}