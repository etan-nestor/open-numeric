import { api } from "../api";
import type { Testimonial } from "@/types";

/**
 * Récupère la liste des témoignages actifs.
 * Endpoint : `GET /api/testimonials` — cache 5 min
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return api.get<Testimonial[]>("/api/testimonials", { revalidate: 300 });
}