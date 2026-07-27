'use client'

interface StatCardProps {
  label: string
  value: number
  icon: React.ElementType
  color: 'blue' | 'yellow' | 'indigo' | 'green' | 'red' | 'purple'
}

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800/30 dark:text-yellow-300',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800/30 dark:text-indigo-300',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/30 dark:text-emerald-300',
    red: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-300',
    purple: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800/30 dark:text-purple-300',
  }
  
  const iconColors = {
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    indigo: 'text-indigo-500',
    green: 'text-emerald-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
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