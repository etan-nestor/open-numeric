'use client'

interface StatusBadgeProps {
  status: boolean
  trueLabel?: string
  falseLabel?: string
}

export function StatusBadge({
  status,
  trueLabel = 'Publié',
  falseLabel = 'Brouillon',
}: StatusBadgeProps) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
      status 
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' 
        : 'bg-amber-100/60 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    }`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
        status ? 'bg-emerald-500' : 'bg-amber-500'
      }`} />
      {status ? trueLabel : falseLabel}
    </span>
  )
}