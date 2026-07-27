'use client'

import { FiCode, FiBox, FiTrendingUp } from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { TechStats as TechStatsType } from './types'

interface TechStatsProps {
  stats: TechStatsType
}

export function TechStats({ stats }: TechStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        label="Total technologies"
        value={stats.total}
        icon={FiCode}
        color="blue"
      />
      <StatCard
        label="Catégories"
        value={Object.keys(stats.categories).length}
        icon={FiBox}
        color="purple"
      />
      <StatCard
        label="Plus utilisée"
        value={stats.mostUsed[0] || '-'}
        icon={FiTrendingUp}
        color="green"
        small
      />
      <div className="p-3 rounded-xl border bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300">
        <p className="text-xs font-medium opacity-70">Top 5 technologies</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {stats.mostUsed.slice(0, 5).map((name, i) => (
            <span key={i} className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded-full">
              {name}
            </span>
          ))}
          {stats.mostUsed.length === 0 && (
            <span className="text-xs text-amber-600/60">Aucune technologie</span>
          )}
        </div>
      </div>
    </div>
  )
}