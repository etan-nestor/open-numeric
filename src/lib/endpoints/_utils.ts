/**
 * Helpers internes partagés par les endpoints.
 * Préfixé `_` pour marquer "interne" (non exporté via `index.ts`).
 */

/**
 * Construit une query string propre à partir d'un objet.
 * Ignore les valeurs `undefined`, `null` et les tableaux vides.
 *
 * - Tableaux → joints par virgules (`category=WEB,API`)
 * - Booléens → `true` / `false`
 * - Nombres → `String(...)`
 */
export function buildQuery(
  params: Record<
    string,
    string | number | boolean | string[] | number[] | undefined
  >,
): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      search.set(key, value.join(","));
    } else {
      search.set(key, String(value));
    }
  }

  const qs = search.toString();
  return qs ? `?${qs}` : "";
}