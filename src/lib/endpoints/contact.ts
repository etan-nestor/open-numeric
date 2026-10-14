import { api } from "../api";
import type {
  ContactFormData,
  ContactSubmitResponse,
  ContactSubmission,
  ContactStatusUpdate,
  PaginatedResponse,
  SubmissionStatus,
} from "@/types";
import { buildQuery } from "./_utils";

/**
 * Soumet un message de contact (public).
 * Endpoint : `POST /api/contact` — pas de cache
 * ⚠️ Rate limit : 3 req / min
 */
export async function submitContact(
  data: ContactFormData,
): Promise<ContactSubmitResponse> {
  return api.post<ContactSubmitResponse>("/api/contact", data);
}

/* =========================================================
   ADMIN (dashboard)
   ========================================================= */

export interface QueryContactParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
  search?: string;
}

/**
 * Liste paginée des messages (admin).
 * Endpoint : `GET /api/contact?...` — pas de cache
 */
export async function getContactSubmissions(
  params: QueryContactParams = {},
): Promise<PaginatedResponse<ContactSubmission>> {
  const query = buildQuery({
    page: params.page,
    limit: params.limit,
    status: params.status,
    search: params.search,
  });

  return api.get<PaginatedResponse<ContactSubmission>>(
    `/api/contact${query}`,
    { revalidate: 0 },
  );
}

/**
 * Met à jour le statut d'un message (admin).
 * Endpoint : `PATCH /api/contact/:id/status`
 */
export async function updateContactStatus(
  id: string,
  data: ContactStatusUpdate,
): Promise<ContactSubmission> {
  return api.patch<ContactSubmission>(`/api/contact/${id}/status`, data);
}