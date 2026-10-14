import { api } from "../api";
import type {
  PaginatedResponse,
  QuoteFormData,
  QuoteRequest,
  QuoteStatusUpdate,
  QuoteSubmitResponse,
  SubmissionStatus,
} from "@/types";
import { buildQuery } from "./_utils";

/**
 * Soumet une demande de devis (public).
 * Endpoint : `POST /api/quote` — pas de cache
 * ⚠️ Rate limit : 2 req / min
 */
export async function submitQuote(
  data: QuoteFormData,
): Promise<QuoteSubmitResponse> {
  return api.post<QuoteSubmitResponse>("/api/quote", data);
}

/* =========================================================
   ADMIN (dashboard)
   ========================================================= */

export interface QueryQuoteParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
  projectType?: string;
  search?: string;
}

/**
 * Liste paginée des devis (admin).
 * Endpoint : `GET /api/quote?...` — pas de cache
 */
export async function getQuoteRequests(
  params: QueryQuoteParams = {},
): Promise<PaginatedResponse<QuoteRequest>> {
  const query = buildQuery({
    page: params.page,
    limit: params.limit,
    status: params.status,
    projectType: params.projectType,
    search: params.search,
  });

  return api.get<PaginatedResponse<QuoteRequest>>(`/api/quote${query}`, {
    revalidate: 0,
  });
}

/**
 * Met à jour le statut d'un devis (admin).
 * Endpoint : `PATCH /api/quote/:id/status`
 */
export async function updateQuoteStatus(
  id: string,
  data: QuoteStatusUpdate,
): Promise<QuoteRequest> {
  return api.patch<QuoteRequest>(`/api/quote/${id}/status`, data);
}