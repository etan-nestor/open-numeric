'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiMail } from 'react-icons/fi'
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { ContactStats } from './ContactStats'
import { getContactColumns } from './ContactColumns'
import { getContactActions } from './ContactActions'
import { MessageDetailModal } from './MessageDetailModal'
import type { ContactMessage } from './types'

export function ContactAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contact')
      const data = await response.json()
      setMessages(data.data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      })
      await fetchMessages()
      if (selectedMessage?.id === id) {
        setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null)
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const toggleReadStatus = async (message: ContactMessage) => {
    try {
      await fetch(`/api/contact/${message.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !message.isRead }),
      })
      await fetchMessages()
    } catch (error) {
      console.error('Error toggling read status:', error)
    }
  }

  const deleteMessage = async (message: ContactMessage) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le message de "${message.name}" ?`)) return

    try {
      await fetch(`/api/contact/${message.id}`, { method: 'DELETE' })
      await fetchMessages()
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(null)
        setIsDetailOpen(false)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsDetailOpen(true)
    if (!message.isRead) {
      markAsRead(message.id)
    }
  }

  // Statistiques
  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.isRead).length,
    read: messages.filter(m => m.isRead).length,
    replied: messages.filter(m => m.isReplied).length,
  }

  // Configuration du tableau
  const columns = getContactColumns()
  const actions = getContactActions({
    viewMessage,
    toggleReadStatus,
    deleteMessage,
  })

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
            Messages de contact
          </h1>
          <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">
            Gérez les messages reçus via le formulaire de contact
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 font-medium"
        >
          <FiMail className="w-5 h-5" />
          Rafraîchir
        </button>
      </div>

      {/* Stats */}
      <ContactStats stats={stats} />

      {/* Tableau */}
      <DataTable
        data={messages}
        columns={columns}
        config={{
          selectable: true,
          pagination: true,
          searchable: true,
          pageSize: 10,
          pageSizes: [5, 10, 25, 50],
          actions,
        }}
        className="mt-6"
      />

      {/* Modal de détail */}
      {isDetailOpen && selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => {
            setIsDetailOpen(false)
            setSelectedMessage(null)
          }}
          onDelete={() => deleteMessage(selectedMessage)}
          onToggleRead={() => toggleReadStatus(selectedMessage)}
          onRefresh={fetchMessages}
        />
      )}
    </div>
  )
}