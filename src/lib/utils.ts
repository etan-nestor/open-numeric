/**
 * Convertit une valeur en nombre entier, gère les strings et les undefined
 */
export function toInt(value: any): number {
  if (value === undefined || value === null) return 0
  if (typeof value === 'string') return parseInt(value) || 0
  if (typeof value === 'number') return Math.floor(value)
  return 0
}