import {
  getServices,
  getTeamMembers,
  getClients,
  getTestimonials,
} from "../endpoints";
import type { Service, TeamMember, Client, Testimonial } from "@/types";

export interface HomePageData {
  services: Service[];
  teamMembers: TeamMember[];
  clients: Client[];
  testimonials: Testimonial[];
}

/**
 * Charge toutes les données de la home en UNE fois (parallèle).
 * Utilisé dans `app/[locale]/page.tsx` (Server Component).
 */
export async function getHomePageData(): Promise<HomePageData> {
  const [services, teamMembers, clients, testimonials] = await Promise.all([
    getServices(),
    getTeamMembers(),
    getClients(),
    getTestimonials(),
  ]);

  return { services, teamMembers, clients, testimonials };
}