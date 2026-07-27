'use client'

import { FiEye, FiTrash2, FiCheck, FiX, FiClock, FiDollarSign } from 'react-icons/fi'
import type { TableAction } from '@/components/admin/shared/DataTable'
import type { Devis, DevisStatus } from './types'

interface DevisActionsProps {
  viewDevis: (devis: Devis) => void
  updateStatus: (id: string, status: DevisStatus) => void
  deleteDevis: (devis: Devis) => void
}

export function getDevisActions({
  viewDevis,
  updateStatus,
  deleteDevis,
}: DevisActionsProps): TableAction[] {
  return [
    {
      icon: FiEye,
      label: 'Voir',
      onClick: (row: Devis) => viewDevis(row),
      className: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    },
    {
      icon: FiClock,
      label: 'Prendre en charge',
      onClick: (row: Devis) => updateStatus(row.id, 'IN_REVIEW'),
      className: 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300',
      condition: (row: Devis) => row.status === 'PENDING',
    },
    {
      icon: FiCheck,
      label: 'Approuver',
      onClick: (row: Devis) => updateStatus(row.id, 'APPROVED'),
      className: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
      condition: (row: Devis) => row.status === 'PENDING' || row.status === 'IN_REVIEW',
    },
    {
      icon: FiX,
      label: 'Rejeter',
      onClick: (row: Devis) => updateStatus(row.id, 'REJECTED'),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
      condition: (row: Devis) => row.status === 'PENDING' || row.status === 'IN_REVIEW',
    },
    {
      icon: FiDollarSign,
      label: 'Marquer terminé',
      onClick: (row: Devis) => updateStatus(row.id, 'COMPLETED'),
      className: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
      condition: (row: Devis) => row.status === 'APPROVED',
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: Devis) => deleteDevis(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]
}