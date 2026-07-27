'use client'

import { 
  FiFileText, 
  FiClock, 
  FiEye, 
  FiCheckCircle, 
  FiXCircle, 
  FiCheckSquare 
} from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { DevisStats as DevisStatsType } from './types'

interface DevisStatsProps {
  stats: DevisStatsType
}

export function DevisStats({ stats }: DevisStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <StatCard
        label="Total"
        value={stats.total}
        icon={FiFileText}
        color="blue"
      />
      <StatCard
        label="En attente"
        value={stats.pending}
        icon={FiClock}
        color="yellow"
      />
      <StatCard
        label="En cours"
        value={stats.inReview}
        icon={FiEye}
        color="indigo"
      />
      <StatCard
        label="Approuvés"
        value={stats.approved}
        icon={FiCheckCircle}
        color="green"
      />
      <StatCard
        label="Rejetés"
        value={stats.rejected}
        icon={FiXCircle}
        color="red"
      />
      <StatCard
        label="Terminés"
        value={stats.completed}
        icon={FiCheckSquare}
        color="purple"
      />
    </div>
  )
}