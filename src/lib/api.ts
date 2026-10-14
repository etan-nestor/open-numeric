/**
 * Client HTTP pour l'API Open Numeric.
 *
 * - Gère l'URL de base via `NEXT_PUBLIC_API_URL`.
 * - Gère le cache Next.js (revalidate / no-store).
 * - Normalise les erreurs avec une `ApiError`.
 * - Ne contient AUCUNE logique métier
 */

/* =========================================================
   CONFIG
   ========================================================= */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://open-numeric-api.opennumeric.com';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 10_000);
const DEFAULT_REVALIDATE = Number(process.env.NEXT_PUBLIC_API_REVALIDATE ?? 60);

/* =========================================================
   ERROR
   ========================================================= */

export class ApiError extends Error {
  public readonly status: number;
  public readonly path: string;
  public readonly body: unknown;

  constructor(status: number, path: string, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.path = path;
    this.body = body;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isRateLimited() {
    return this.status === 429;
  }
}

/* =========================================================
   OPTIONS
   ========================================================= */

export interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  /**
   * Corps JSON (sera automatiquement sérialisé).
   * Remplace `body` du RequestInit standard.
   */
  json?: unknown;

  /**
   * Revalidation ISR en secondes.
   * - `number`  → cache avec revalidate
   * - `false`   → cache permanent (comme `force-cache`)
   * - `0`       → pas de cache (comme `no-store`)
   *
   * Ignoré si la méthode n'est pas GET (les mutations ne sont jamais cachées).
   */
  revalidate?: number | false;

  /**
   * Timeout personnalisé en ms.
   * Défaut : `NEXT_PUBLIC_API_TIMEOUT` (10 000).
   */
  timeout?: number;
}

/* =========================================================
   FETCH PRINCIPAL
   ========================================================= */

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const {
    json,
    revalidate = DEFAULT_REVALIDATE,
    timeout = API_TIMEOUT,
    method = 'GET',
    headers,
    ...rest
  } = options;

  const url = `${API_URL}${path}`;
  const isGet = method.toUpperCase() === 'GET';

  // AbortController pour le timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Construit les options de cache Next.js uniquement pour les GET
  const cacheOptions: RequestInit & { next?: { revalidate: number | false } } =
    isGet
      ? revalidate === 0
        ? { cache: 'no-store' }
        : { next: { revalidate } }
      : { cache: 'no-store' };

  try {
    const res = await fetch(url, {
      ...rest,
      ...cacheOptions,
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(json !== undefined && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      ...(json !== undefined && { body: JSON.stringify(json) }),
    });

    clearTimeout(timeoutId);

    // Parse le body (toujours essayé, même sur erreur pour logguer)
    let body: unknown = undefined;
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      body = await res.json().catch(() => undefined);
    } else {
      body = await res.text().catch(() => undefined);
    }

    if (!res.ok) {
      const message =
        (typeof body === 'object' && body !== null && 'message' in body
          ? String((body as { message: unknown }).message)
          : undefined) ?? `API error ${res.status} on ${path}`;

      throw new ApiError(res.status, path, message, body);
    }

    return body as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) throw error;

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, path, `Timeout après ${timeout} ms`);
    }

    throw new ApiError(
      0,
      path,
      `Erreur réseau : ${error instanceof Error ? error.message : 'inconnue'}`,
    );
  }
}

/* =========================================================
   RACCOURCIS
   ========================================================= */

export const api = {
  get: <T>(path: string, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, json?: unknown, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: 'POST', json }),

  patch: <T>(path: string, json?: unknown, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: 'PATCH', json }),

  put: <T>(path: string, json?: unknown, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: 'PUT', json }),

  delete: <T>(path: string, options?: ApiFetchOptions) =>
    apiFetch<T>(path, { ...options, method: 'DELETE' }),
};