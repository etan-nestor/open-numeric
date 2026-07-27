'use client'

import { FiUsers, FiUserCheck, FiUserX, FiMail } from 'react-icons/fi'
import { StatCard } from './StatCard'
import type { NewsletterStats as NewsletterStatsType } from './types'

interface NewsletterStatsProps {
  stats: NewsletterStatsType
}

export function NewsletterStats({ stats }: NewsletterStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Total abonnés"
        value={stats.total}
        icon={FiUsers}
        color="purple"
      />
      <StatCard
        label="Actifs"
        value={stats.active}
        icon={FiUserCheck}
        color="green"
      />
      <StatCard
        label="Inactifs"
        value={stats.inactive}
        icon={FiUserX}
        color="gray"
      />
      <StatCard
        label="Taux d'activation"
        value={stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}%` : '0%'}
        icon={FiMail}
        color="blue"
      />
    </div>
  )
}