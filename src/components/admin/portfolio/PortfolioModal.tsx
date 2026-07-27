/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Project } from '@prisma/client'
import { PortfolioForm } from './PortfolioForm'

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  project?: Project | null
  onSubmit: (data: any) => void
  loading?: boolean
}

export function PortfolioModal({
  isOpen,
  onClose,
  project,
  onSubmit,
  loading,
}: PortfolioModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
        
        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/30 dark:border-amber-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-amber-200/30 dark:border-amber-700/30 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-50">
                  {project ? 'Modifier le projet' : 'Nouveau projet'}
                </h2>
                <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
                  {project ? 'Mettez à jour les informations du projet' : 'Ajoutez un nouveau projet à votre portfolio'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors text-amber-600 dark:text-amber-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <PortfolioForm
              project={project}
              onSubmit={onSubmit}
              onCancel={onClose}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}