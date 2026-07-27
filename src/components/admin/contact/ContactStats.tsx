'use client'

import { FiMail, FiEye, FiMessageSquare, FiCheckCircle } from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { ContactStats as ContactStatsType } from './types'

interface ContactStatsProps {
  stats: ContactStatsType
}

export function ContactStats({ stats }: ContactStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Total messages"
        value={stats.total}
        icon={FiMessageSquare}
        color="blue"
      />
      <StatCard
        label="Non lus"
        value={stats.unread}
        icon={FiMail}
        color="red"
      />
      <StatCard
        label="Lus"
        value={stats.read}
        icon={FiEye}
        color="gray"
      />
      <StatCard
        label="Répondus"
        value={stats.replied}
        icon={FiCheckCircle}
        color="emerald"
      />
    </div>
  )
}