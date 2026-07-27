'use client'

import { FiClock, FiCheckCircle } from 'react-icons/fi'
import type { Column } from '@/components/admin/shared/DataTable'
import type { ContactMessage } from './types'

export function getContactColumns(): Column[] {
  return [
    {
      key: 'status',
      label: 'Statut',
      render: (_, row: ContactMessage) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${!row.isRead ? 'bg-blue-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`} />
          <span className={`text-xs ${!row.isRead ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            {!row.isRead ? 'Non lu' : 'Lu'}
          </span>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Expéditeur',
      render: (_, row: ContactMessage) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Sujet',
      render: (value: string) => (
        <span className="text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'company',
      label: 'Société',
      render: (value: string | null) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value || '-'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Reçu le',
      render: (value: string) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      ),
    },
    {
      key: 'isReplied',
      label: 'Réponse',
      render: (value: boolean) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          value 
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' 
            : 'bg-amber-100/60 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
        }`}>
          {value ? (
            <>
              <FiCheckCircle className="w-3 h-3" />
              Répondu
            </>
          ) : (
            <>
              <FiClock className="w-3 h-3" />
              En attente
            </>
          )}
        </span>
      ),
    },
  ]
}