'use client'

import { FiUsers, FiEye, FiEyeOff, FiStar } from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { TeamStats as TeamStatsType } from './types'

interface TeamStatsProps {
  stats: TeamStatsType
}

export function TeamStats({ stats }: TeamStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Total membres"
        value={stats.total}
        icon={FiUsers}
        color="purple"
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
        label="Membres clés"
        value={stats.core}
        icon={FiStar}
        color="yellow"
      />
    </div>
  )
}