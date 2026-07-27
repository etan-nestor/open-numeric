'use client'

import { useState } from 'react'
import { FiEye, FiEyeOff, FiTrash2, FiXCircle } from 'react-icons/fi'
import type { ContactMessage } from './types'

interface MessageDetailModalProps {
  message: ContactMessage
  onClose: () => void
  onDelete: () => void
  onToggleRead: () => void
  onRefresh: () => void
}

export function MessageDetailModal({
  message,
  onClose,
  onDelete,
  onToggleRead,
  onRefresh,
}: MessageDetailModalProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyMessage, setReplyMessage] = useState('')

  const handleReply = async () => {
    if (!replyMessage.trim()) return
    
    try {
      setIsReplying(true)
      // Ici vous pouvez implémenter l'envoi d'email
      // await sendReply(message.email, message.subject, replyMessage)
      
      // Marquer comme répondu
      await fetch(`/api/contact/${message.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isReplied: true }),
      })
      
      await onRefresh()
      setReplyMessage('')
      alert('Réponse envoyée avec succès !')
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Erreur lors de l\'envoi de la réponse')
    } finally {
      setIsReplying(false)
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
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/30 dark:border-gray-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 rounded-t-2xl z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 truncate">
                    {message.subject}
                  </h2>
                  {!message.isRead && (
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
                      Nouveau
                    </span>
                  )}
                  {message.isReplied && (
                    <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full">
                      Répondu
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{message.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{message.email}</span>
                  {message.phone && (
                    <span className="text-gray-500 dark:text-gray-400">Tél: {message.phone}</span>
                  )}
                  {message.company && (
                    <span className="text-gray-500 dark:text-gray-400">• {message.company}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                <button
                  onClick={onToggleRead}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                  title={message.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                >
                  {message.isRead ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
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
            {/* Message */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                {message.message}
              </p>
            </div>

            {/* Métadonnées */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Reçu le: {new Date(message.createdAt).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            {/* Réponse rapide */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <FiReply className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Répondre</h3>
              </div>
              <div className="space-y-3">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Écrivez votre réponse..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                  rows={4}
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setReplyMessage('')}
                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={handleReply}
                    disabled={!replyMessage.trim() || isReplying}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isReplying ? 'Envoi...' : 'Envoyer la réponse'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}