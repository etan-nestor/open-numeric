import type { SubmissionStatus } from "./common";

/* =========================================================
   CONTACT — formulaire public
   ========================================================= */

/** Body du POST /api/contact */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Réponse du POST /api/contact */
export interface ContactSubmitResponse {
  success: true;
  id: string;
}

/* =========================================================
   CONTACT — admin (liste des messages reçus)
   ========================================================= */

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Body du PATCH /api/contact/:id/status */
export interface ContactStatusUpdate {
  status: SubmissionStatus;
}

/* =========================================================
   CONTACT — UI (config locale du composant)
   ========================================================= */

/**
 * Champ de formulaire côté UI.
 * Utilisé pour construire dynamiquement le formulaire.
 */
export type ContactFieldType = "text" | "email" | "tel" | "textarea";

export interface ContactField {
  key: "name" | "email" | "subject" | "message";
  type: ContactFieldType;
  required: boolean;
  rows?: number;
}