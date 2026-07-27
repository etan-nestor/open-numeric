'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  FiRefreshCw, 
  FiMail, 
  FiSend,
  FiTrash2,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi'
import DataTable, { Column, TableAction } from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { NewsletterStats } from './NewsletterStats'
import type { Subscriber } from './types'

export function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true)
      const url = filterStatus === 'all' 
        ? '/api/newsletter' 
        : `/api/newsletter?status=${filterStatus}`
      const response = await fetch(url)
      const data = await response.json()
      setSubscribers(data.data || [])
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }, [filterStatus])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  const toggleStatus = async (subscriber: Subscriber) => {
    try {
      const newStatus = !subscriber.isActive
      await fetch(`/api/newsletter/${subscriber.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      })
      await fetchSubscribers()
    } catch (error) {
      console.error('Error toggling status:', error)
      alert('Erreur lors du changement de statut')
    }
  }

  const deleteSubscriber = async (subscriber: Subscriber) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'abonné "${subscriber.email}" ?`)) return

    try {
      await fetch(`/api/newsletter/${subscriber.id}`, { method: 'DELETE' })
      await fetchSubscribers()
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const sendTestEmail = async (subscriber: Subscriber) => {
    try {
      await fetch('/api/newsletter/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriber.email }),
      })
      alert(`Email de test envoyé à ${subscriber.email}`)
    } catch (error) {
      console.error('Error sending test email:', error)
      alert('Erreur lors de l\'envoi de l\'email')
    }
  }

  // Statistiques
  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.isActive).length,
    inactive: subscribers.filter(s => !s.isActive).length,
  }

  // Configuration des colonnes
  const columns: Column[] = [
    {
      key: 'email',
      label: 'Email',
      render: (_, row: Subscriber) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <FiMail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.email}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Inscrit le {new Date(row.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'isActive',
      label: 'Statut',
      render: (value: boolean) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          value
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400'
        }`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${value ? 'bg-emerald-500' : 'bg-gray-400'}`} />
          {value ? 'Actif' : 'Inactif'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date d\'inscription',
      render: (value: string) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      ),
    },
  ]

  // Actions du tableau
  const actions: TableAction[] = [
    {
      icon: FiSend,
      label: 'Envoyer un test',
      onClick: (row: Subscriber) => sendTestEmail(row),
      className: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
      condition: (row: Subscriber) => row.isActive,
    },
    {
      icon: FiCheckCircle,
      label: 'Activer',
      onClick: (row: Subscriber) => toggleStatus(row),
      className: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
      condition: (row: Subscriber) => !row.isActive,
    },
    {
      icon: FiXCircle,
      label: 'Désactiver',
      onClick: (row: Subscriber) => toggleStatus(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
      condition: (row: Subscriber) => row.isActive,
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: Subscriber) => deleteSubscriber(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-50">
            Newsletter
          </h1>
          <p className="text-sm text-purple-600/70 dark:text-purple-400/70 mt-1">
            Gérez les abonnés à la newsletter
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filtre par statut */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200/30 dark:border-gray-700/30 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
          <button
            onClick={fetchSubscribers}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Stats */}
      <NewsletterStats stats={stats} />

      {/* Tableau */}
      <DataTable
        data={subscribers}
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
    </div>
  )
}