'use client'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 dark:border-amber-800/30 border-t-amber-600 dark:border-t-amber-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 animate-pulse" />
        </div>
      </div>
    </div>
  )
}