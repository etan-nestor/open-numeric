'use client'

import { FiEdit, FiTrash2 } from 'react-icons/fi'
import type { TableAction } from '@/components/admin/shared/DataTable'
import type { Technology } from './types'

interface TechActionsProps {
  handleEdit: (tech: Technology) => void
  deleteTech: (tech: Technology) => void
}

export function getTechActions({
  handleEdit,
  deleteTech,
}: TechActionsProps): TableAction[] {
  return [
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: Technology) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: Technology) => deleteTech(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]
}