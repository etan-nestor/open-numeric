'use client'

interface StatCardProps {
  label: string
  value: number
  icon: React.ElementType
  color: 'blue' | 'green' | 'gray' | 'yellow'
}

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/30 dark:text-emerald-300',
    gray: 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-gray-300',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800/30 dark:text-yellow-300',
  }
  
  const iconColors = {
    blue: 'text-blue-500',
    green: 'text-emerald-500',
    gray: 'text-gray-500',
    yellow: 'text-yellow-500',
  }

  return (
    <div className={`p-3 rounded-xl border ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-70">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
        <Icon className={`w-5 h-5 ${iconColors[color]}`} />
      </div>
    </div>
  )
}