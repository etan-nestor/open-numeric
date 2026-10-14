import type { ImageSource } from "./common";

/* =========================================================
   CLIENT — logos "Ils nous font confiance"
   ========================================================= */

export interface Client {
  id: string;
  name: string;
  logo: ImageSource;
  url: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}