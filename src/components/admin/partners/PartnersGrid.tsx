'use client'

import { FiEdit, FiTrash2, FiEye, FiEyeOff, FiStar, FiExternalLink } from 'react-icons/fi'
import type { Partner } from './types'

interface PartnersGridProps {
  partners: Partner[]
  onEdit: (partner: Partner) => void
  onDelete: (partner: Partner) => void
  onToggleVisibility: (partner: Partner) => void
  onToggleFeatured: (partner: Partner) => void
}

export function PartnersGrid({
  partners,
  onEdit,
  onDelete,
  onToggleVisibility,
  onToggleFeatured,
}: PartnersGridProps) {
  if (partners.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">Aucun partenaire</p>
        <p className="text-sm">Ajoutez votre premier partenaire en cliquant sur le bouton ci-dessus</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className={`bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all hover:shadow-lg ${
            partner.isVisible
              ? 'border-gray-200/30 dark:border-gray-700/30'
              : 'border-gray-200/30 dark:border-gray-700/30 opacity-60'
          }`}
        >
          {/* Logo */}
          <div className="relative h-20 flex items-center justify-center mb-3">
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="max-h-full max-w-full object-contain"
            />
            {partner.isFeatured && (
              <span className="absolute -top-1 -right-1 px-2 py-0.5 text-[10px] font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300 rounded-full">
                ★ À la une
              </span>
            )}
          </div>

          {/* Info */}
          <div className="text-center mb-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">{partner.name}</h3>
            {partner.category && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{partner.category}</span>
            )}
            {partner.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {partner.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-1 pt-2 border-t border-gray-200/30 dark:border-gray-700/30">
            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => onToggleFeatured(partner)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-600 dark:text-yellow-400 transition-colors"
            >
              {partner.isFeatured ? <FiStar className="w-4 h-4" /> : <FiStar className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleVisibility(partner)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            >
              {partner.isVisible ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onEdit(partner)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(partner)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}