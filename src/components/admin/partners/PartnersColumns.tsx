'use client'

import type { Column } from '@/components/admin/shared/DataTable'
import type { Partner } from './types'

export function getPartnersColumns(): Column[] {
  return [
    {
      key: 'logoUrl',
      label: 'Partenaire',
      render: (_, row: Partner) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-1">
            <img
              src={row.logoUrl}
              alt={row.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
            {row.category && (
              <div className="text-xs text-gray-500 dark:text-gray-400">{row.category}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'isFeatured',
      label: 'À la une',
      render: (value: boolean) => (
        value ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
            ⭐ À la une
          </span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">-</span>
        )
      ),
    },
    {
      key: 'isVisible',
      label: 'Visibilité',
      render: (value: boolean) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          value
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400'
        }`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${value ? 'bg-emerald-500' : 'bg-gray-400'}`} />
          {value ? 'Visible' : 'Caché'}
        </span>
      ),
    },
    {
      key: 'website',
      label: 'Site web',
      render: (value: string | null) => (
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Visiter →
          </a>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
        )
      ),
    },
  ]
}