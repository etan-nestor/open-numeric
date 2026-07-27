'use client'

import { FiEdit, FiTrash2 } from 'react-icons/fi'
import type { TableAction } from '@/components/admin/shared/DataTable'
import type { BlogCategory } from './types'

interface CategoryActionsProps {
  handleEdit: (category: BlogCategory) => void
  deleteCategory: (category: BlogCategory) => void
}

export function getCategoryActions({
  handleEdit,
  deleteCategory,
}: CategoryActionsProps): TableAction[] {
  return [
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: BlogCategory) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: BlogCategory) => deleteCategory(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]
}