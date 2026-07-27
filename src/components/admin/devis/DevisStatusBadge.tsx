'use client'

import { DevisStatus } from './types'

interface DevisStatusBadgeProps {
  status: DevisStatus
  showLabel?: boolean
}

export function DevisStatusBadge({ status, showLabel = true }: DevisStatusBadgeProps) {
  const config = {
    PENDING: {
      label: 'En attente',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
      dot: 'bg-yellow-500',
    },
    IN_REVIEW: {
      label: 'En cours',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      dot: 'bg-blue-500',
    },
    APPROVED: {
      label: 'Approuvé',
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      dot: 'bg-emerald-500',
    },
    REJECTED: {
      label: 'Rejeté',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
      dot: 'bg-red-500',
    },
    COMPLETED: {
      label: 'Terminé',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      dot: 'bg-purple-500',
    },
  }

  const { label, color, dot } = config[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} />
      {showLabel && label}
    </span>
  )
}