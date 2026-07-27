'use client'

import { FiUsers, FiEye, FiEyeOff, FiStar } from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { PartnersStats as PartnersStatsType } from './types'

interface PartnersStatsProps {
  stats: PartnersStatsType
}

export function PartnersStats({ stats }: PartnersStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Total"
        value={stats.total}
        icon={FiUsers}
        color="blue"
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
    </div>
  )
}