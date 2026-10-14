/**
 * Couleurs de hover distinctes pour chaque service du dropdown.
 * Les classes Tailwind doivent être statiques (JIT compile uniquement
 * les classes présentes littéralement dans le code).
 */
export interface ServiceHoverColors {
  /** Fond du conteneur de l'item au hover */
  itemBg: string;
  /** Couleur du texte du label au hover */
  itemText: string;
  /** Couleur de fond de la pastille d'icône au hover */
  iconBg: string;
  /** Ombre colorée de la pastille d'icône au hover */
  iconShadow: string;
}

export const SERVICE_HOVER: Record<string, ServiceHoverColors> = {
  development: {
    itemBg: "hover:bg-orange-50 dark:hover:bg-orange-500/15",
    itemText: "group-hover/item:text-orange-600 dark:group-hover/item:text-orange-300",
    iconBg: "group-hover/item:bg-orange-500 group-hover/item:text-white",
    iconShadow: "group-hover/item:shadow-orange-500/40",
  },
  design: {
    itemBg: "hover:bg-blue-50 dark:hover:bg-blue-500/15",
    itemText: "group-hover/item:text-blue-600 dark:group-hover/item:text-blue-300",
    iconBg: "group-hover/item:bg-blue-500 group-hover/item:text-white",
    iconShadow: "group-hover/item:shadow-blue-500/40",
  },
  training: {
    itemBg: "hover:bg-emerald-50 dark:hover:bg-emerald-500/15",
    itemText: "group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-300",
    iconBg: "group-hover/item:bg-emerald-500 group-hover/item:text-white",
    iconShadow: "group-hover/item:shadow-emerald-500/40",
  },
  maintenance: {
    itemBg: "hover:bg-amber-50 dark:hover:bg-amber-500/15",
    itemText: "group-hover/item:text-amber-600 dark:group-hover/item:text-amber-300",
    iconBg: "group-hover/item:bg-amber-500 group-hover/item:text-white",
    iconShadow: "group-hover/item:shadow-amber-500/40",
  },
  shop: {
    itemBg: "hover:bg-pink-50 dark:hover:bg-pink-500/15",
    itemText: "group-hover/item:text-pink-600 dark:group-hover/item:text-pink-300",
    iconBg: "group-hover/item:bg-pink-500 group-hover/item:text-white",
    iconShadow: "group-hover/item:shadow-pink-500/40",
  },
};