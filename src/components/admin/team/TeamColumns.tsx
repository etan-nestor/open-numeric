'use client'

import type { Column } from '@/components/admin/shared/DataTable'
import type { TeamMember } from './types'

export function getTeamColumns(): Column[] {
  return [
    {
      key: 'name',
      label: 'Membre',
      render: (_, row: TeamMember) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
            {row.imageUrl ? (
              <img
                src={row.imageUrl}
                alt={row.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-bold">
                {row.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.position}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'isCore',
      label: 'Clé',
      render: (value: boolean) => (
        value ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
            ⭐ Clé
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
      key: 'joinedAt',
      label: 'Arrivée',
      render: (value: string | null) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {value ? new Date(value).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) : '-'}
        </div>
      ),
    },
  ]
}