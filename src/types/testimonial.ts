import type { BaseTranslation, ImageSource } from "./common";

/* =========================================================
   TESTIMONIAL — témoignages clients
   ========================================================= */

export interface TestimonialTranslation extends BaseTranslation {
  quote: string;
  author: string;
  company: string;
}

export interface Testimonial {
  id: string;
  /** Clé unique : "t1", "t2", "t3" */
  key: string;
  image: ImageSource;
  /** Note sur 5 (1-5) */
  rating: number;
  order: number;
  isActive: boolean;
  translations: TestimonialTranslation[];
}