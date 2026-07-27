'use client'

import { useState } from 'react'
import { 
  FiXCircle, 
  FiTrash2, 
  FiClock, 
  FiCheck, 
  FiX, 
  FiDollarSign,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiMessageSquare
} from 'react-icons/fi'
import { DevisStatusBadge } from './DevisStatusBadge'
import type { Devis, DevisStatus } from './types'

interface DevisDetailModalProps {
  devis: Devis
  onClose: () => void
  onUpdateStatus: (status: DevisStatus) => void
  onDelete: () => void
  onRefresh: () => void
}

export function DevisDetailModal({
  devis,
  onClose,
  onUpdateStatus,
  onDelete,
  onRefresh,
}: DevisDetailModalProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState<string>(
    devis.estimatedPrice?.toString() || ''
  )
  const [notes, setNotes] = useState(devis.notes || '')
  const [showPriceForm, setShowPriceForm] = useState(false)

  const handleUpdateWithPrice = async () => {
    if (!estimatedPrice) return
    
    try {
      setIsUpdating(true)
      await fetch(`/api/devis/${devis.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          estimatedPrice: parseFloat(estimatedPrice),
          notes: notes || undefined,
        }),
      })
      await onRefresh()
      setShowPriceForm(false)
      alert('Prix estimé mis à jour avec succès !')
    } catch (error) {
      console.error('Error updating price:', error)
      alert('Erreur lors de la mise à jour du prix')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdateNotes = async () => {
    try {
      setIsUpdating(true)
      await fetch(`/api/devis/${devis.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
      await onRefresh()
      alert('Notes mises à jour avec succès !')
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Erreur lors de la mise à jour des notes')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
        
        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/30 dark:border-gray-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 rounded-t-2xl z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    Demande de devis
                  </h2>
                  <DevisStatusBadge status={devis.status} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {devis.name} • {devis.projectType}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                <button
                  onClick={onDelete}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                  title="Supprimer"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                >
                  <FiXCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Informations du demandeur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={FiUser} label="Nom" value={devis.name} />
              <InfoItem icon={FiMail} label="Email" value={devis.email} />
              {devis.phone && (
                <InfoItem icon={FiPhone} label="Téléphone" value={devis.phone} />
              )}
              {devis.company && (
                <InfoItem icon={FiBriefcase} label="Société" value={devis.company} />
              )}
              <InfoItem icon={FiCalendar} label="Date de la demande" value={
                new Date(devis.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              } />
            </div>

            {/* Détails du projet */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Détails du projet</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailCard label="Type de projet" value={devis.projectType} />
                <DetailCard label="Budget" value={devis.budget} icon={FiDollarSign} />
                <DetailCard label="Délai souhaité" value={devis.timeline} />
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Description du projet</h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                  {devis.description}
                </p>
              </div>
            </div>

            {/* Prix estimé */}
            {devis.estimatedPrice && (
              <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Prix estimé</h3>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800/30">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {devis.estimatedPrice.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>
            )}

            {/* Notes internes */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Notes internes</h3>
                <button
                  onClick={handleUpdateNotes}
                  disabled={isUpdating}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {isUpdating ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajouter des notes internes..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                rows={3}
              />
            </div>

            {/* Prix estimé - Formulaire */}
            {showPriceForm && (
              <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Ajouter un prix estimé</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    placeholder="Montant en FCFA"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleUpdateWithPrice}
                    disabled={isUpdating || !estimatedPrice}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 disabled:opacity-50"
                  >
                    {isUpdating ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    onClick={() => setShowPriceForm(false)}
                    className="px-4 py-2 border border-gray-200/30 dark:border-gray-700/30 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-4">
              <div className="flex flex-wrap gap-3">
                {!devis.estimatedPrice && devis.status !== 'REJECTED' && devis.status !== 'COMPLETED' && (
                  <button
                    onClick={() => setShowPriceForm(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <FiDollarSign className="w-4 h-4" />
                    Ajouter un prix
                  </button>
                )}
                
                {devis.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus('IN_REVIEW')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FiClock className="w-4 h-4" />
                      Prendre en charge
                    </button>
                    <button
                      onClick={() => onUpdateStatus('APPROVED')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => onUpdateStatus('REJECTED')}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FiX className="w-4 h-4" />
                      Rejeter
                    </button>
                  </>
                )}
                
                {devis.status === 'IN_REVIEW' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus('APPROVED')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => onUpdateStatus('REJECTED')}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FiX className="w-4 h-4" />
                      Rejeter
                    </button>
                  </>
                )}
                
                {devis.status === 'APPROVED' && (
                  <button
                    onClick={() => onUpdateStatus('COMPLETED')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <FiCheck className="w-4 h-4" />
                    Marquer terminé
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composants auxiliaires
function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
      <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  )
}

function DetailCard({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />}
        {value}
      </p>
    </div>
  )
}