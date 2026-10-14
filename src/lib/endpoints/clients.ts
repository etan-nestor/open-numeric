import { api } from "../api";
import type { Client } from "@/types";

/**
 * Récupère la liste des clients actifs.
 * Endpoint : `GET /api/clients` — cache 5 min
 */
export async function getClients(): Promise<Client[]> {
  return api.get<Client[]>("/api/clients", { revalidate: 300 });
}