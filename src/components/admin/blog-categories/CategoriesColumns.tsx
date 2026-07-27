'use client'

import type { Column } from '@/components/admin/shared/DataTable'
import type { BlogCategory } from './types'

export function getCategoryColumns(categories: BlogCategory[]): Column[] {
  return [
    {
      key: 'name',
      label: 'Catégorie',
      render: (_, row: BlogCategory) => (
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ backgroundColor: row.color || '#e5e7eb' }}
          >
            {row.icon || '📁'}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'parent',
      label: 'Parent',
      render: (_, row: BlogCategory) => {
        const parent = categories.find(c => c.id === row.parentId)
        return (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {parent ? parent.name : '-'}
          </span>
        )
      },
    },
    {
      key: 'posts',
      label: 'Articles',
      render: (value: any) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">{value?.length || 0}</span>
          <span className="text-gray-500 dark:text-gray-400">article(s)</span>
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string | null) => (
        <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          {value || '-'}
        </span>
      ),
    },
  ]
}