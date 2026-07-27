'use client'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  color: 'blue' | 'purple' | 'green' | 'amber'
  small?: boolean
}

export function StatCard({ label, value, icon: Icon, color, small = false }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300',
    purple: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800/30 dark:text-purple-300',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/30 dark:text-emerald-300',
    amber: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300',
  }
  
  const iconColors = {
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    green: 'text-emerald-500',
    amber: 'text-amber-500',
  }

  return (
    <div className={`p-3 rounded-xl border ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-70">{label}</p>
          {small ? (
            <p className="text-base font-bold truncate max-w-[120px]">{value}</p>
          ) : (
            <p className="text-xl font-bold">{value}</p>
          )}
        </div>
        <Icon className={`w-5 h-5 ${iconColors[color]}`} />
      </div>
    </div>
  )
}