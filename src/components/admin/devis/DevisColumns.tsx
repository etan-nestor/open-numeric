'use client'

import { FiDollarSign } from 'react-icons/fi'
import type { Column } from '@/components/admin/shared/DataTable'
import type { Devis } from './types'
import { DevisStatusBadge } from './DevisStatusBadge'

export function getDevisColumns(): Column[] {
  return [
    {
      key: 'name',
      label: 'Demandeur',
      render: (_, row: Devis) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'projectType',
      label: 'Type de projet',
      render: (value: string) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      render: (value: string) => (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <FiDollarSign className="w-3 h-3" />
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      render: (value: string) => <DevisStatusBadge status={value as any} />,
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value: string) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      ),
    },
  ]
}