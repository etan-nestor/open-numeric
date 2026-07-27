'use client'

import { FiStar } from 'react-icons/fi'
import type { Column } from '@/components/admin/shared/DataTable'
import type { Testimonial } from './types'

export function getTestimonialsColumns(): Column[] {
  return [
    {
      key: 'name',
      label: 'Client',
      render: (_, row: Testimonial) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
              <img
                src={row.imageUrl}
                alt={row.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-lg">
              {row.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {row.position} • {row.company}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'content',
      label: 'Avis',
      render: (value: string) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {value}
          </p>
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Note',
      render: (value: number) => (
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-4 h-4 ${i < value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
        </div>
      ),
    },
    {
      key: 'project',
      label: 'Projet associé',
      render: (_, row: Testimonial) => (
        row.project ? (
          <span className="text-xs text-amber-600 dark:text-amber-400">
            {row.project.title}
          </span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">-</span>
        )
      ),
    },
    {
      key: 'isVisible',
      label: 'Statut',
      render: (_, row: Testimonial) => (
        <div className="flex flex-col gap-1">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            row.isVisible
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400'
          }`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${row.isVisible ? 'bg-emerald-500' : 'bg-gray-400'}`} />
            {row.isVisible ? 'Visible' : 'Caché'}
          </span>
          {row.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
              ⭐ À la une
            </span>
          )}
        </div>
      ),
    },
  ]
}