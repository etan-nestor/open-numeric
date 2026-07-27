'use client'

import { FiMessageSquare, FiEye, FiEyeOff, FiStar, FiTrendingUp } from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { TestimonialsStats as TestimonialsStatsType } from './types'

interface TestimonialsStatsProps {
  stats: TestimonialsStatsType
}

export function TestimonialsStats({ stats }: TestimonialsStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <StatCard
        label="Total"
        value={stats.total}
        icon={FiMessageSquare}
        color="amber"
      />
      <StatCard
        label="Visibles"
        value={stats.visible}
        icon={FiEye}
        color="green"
      />
      <StatCard
        label="Cachés"
        value={stats.hidden}
        icon={FiEyeOff}
        color="gray"
      />
      <StatCard
        label="À la une"
        value={stats.featured}
        icon={FiStar}
        color="yellow"
      />
      <StatCard
        label="Note moyenne"
        value={stats.averageRating.toFixed(1)}
        icon={FiTrendingUp}
        color="purple"
      />
    </div>
  )
}