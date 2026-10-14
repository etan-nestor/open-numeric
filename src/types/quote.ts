import type { SubmissionStatus } from "./common";

/* =========================================================
   QUOTE — formulaire public (wizard 3 étapes)
   ========================================================= */

/**
 * Body du POST /api/quote.
 *
 * ⚠️ `projectType`, `budget`, `timeline` sont des **clés**
 * (ex: "webApp", "2k5k", "1m3m") — pas des labels traduits.
 * Les traductions se font côté i18n (`quote.options.*`).
 */
export interface QuoteFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

/** Réponse du POST /api/quote */
export interface QuoteSubmitResponse {
  success: true;
  id: string;
}

/* =========================================================
   QUOTE — admin (liste des demandes reçues)
   ========================================================= */

export interface QuoteRequest {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: SubmissionStatus;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Body du PATCH /api/quote/:id/status */
export interface QuoteStatusUpdate {
  status: SubmissionStatus;
}

/* =========================================================
   QUOTE — UI (définition du wizard)
   ========================================================= */

export type QuoteFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "checkbox";

export interface QuoteField {
  key: string;
  type: QuoteFieldType;
  required: boolean;
  rows?: number;
  optionKeys?: string[];
}

export interface QuoteOption {
  key: string;
}

export interface QuoteStep {
  number: number;
  /** Clé i18n : `quote.steps.<key>.title` */
  key: string;
  icon: string;
  fields: QuoteField[];
}

/** Données statiques du wizard (définies côté composant) */
export interface QuoteWizardConfig {
  steps: QuoteStep[];
  projectTypes: QuoteOption[];
  budgetRanges: QuoteOption[];
  timelines: QuoteOption[];
  assurances: QuoteAssurance[];
}

export interface QuoteAssurance {
  key: string;
  icon: string;
  accent: string;
}