'use client'

import type { Column } from '@/components/admin/shared/DataTable'
import type { Technology } from './types'

export function getTechColumns(): Column[] {
  return [
    {
      key: 'name',
      label: 'Technologie',
      render: (_, row: Technology) => (
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
            style={{ 
              backgroundColor: row.color || '#e5e7eb',
              color: row.color ? '#fff' : '#6b7280'
            }}
          >
            {row.icon ? (
              <span className="text-xl">{row.icon}</span>
            ) : (
              row.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Catégorie',
      render: (value: string | null) => (
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
          {value || 'Non classé'}
        </span>
      ),
    },
    {
      key: 'projects',
      label: 'Projets',
      render: (value: any) => {
        if (!value || value.length === 0) {
          return <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
        }
        
        return (
          <div className="flex flex-wrap gap-1">
            {value.map((project: any, i: number) => (
              <span 
                key={i}
                className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full"
              >
                {project.title}
              </span>
            ))}
          </div>
        )
      },
    },
  ]
}