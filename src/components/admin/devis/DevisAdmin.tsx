'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { FaDollarSign } from "react-icons/fa";
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { DevisStats } from './DevisStats'
import { getDevisColumns } from './DevisColumns'
import { getDevisActions } from './DevisActions'
import { DevisDetailModal } from './DevisDetailModal'
import type { Devis, DevisStatus } from './types'

export function DevisAdmin() {
  const [devis, setDevis] = useState<Devis[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDevis, setSelectedDevis] = useState<Devis | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<DevisStatus | 'all'>('all')

  const fetchDevis = useCallback(async () => {
    try {
      setLoading(true)
      const url = filterStatus === 'all' 
        ? '/api/devis' 
        : `/api/devis?status=${filterStatus}`
      const response = await fetch(url)
      const data = await response.json()
      setDevis(data.data || [])
    } catch (error) {
      console.error('Error fetching devis:', error)
    } finally {
      setLoading(false)
    }
  }, [filterStatus])

  useEffect(() => {
    fetchDevis()
  }, [fetchDevis])

  const updateStatus = async (id: string, status: DevisStatus) => {
    try {
      await fetch(`/api/devis/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      await fetchDevis()
      if (selectedDevis?.id === id) {
        setSelectedDevis(prev => prev ? { ...prev, status } : null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const deleteDevis = async (devisItem: Devis) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la demande de devis de "${devisItem.name}" ?`)) return

    try {
      await fetch(`/api/devis/${devisItem.id}`, { method: 'DELETE' })
      await fetchDevis()
      if (selectedDevis?.id === devisItem.id) {
        setSelectedDevis(null)
        setIsDetailOpen(false)
      }
    } catch (error) {
      console.error('Error deleting devis:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const viewDevis = (devisItem: Devis) => {
    setSelectedDevis(devisItem)
    setIsDetailOpen(true)
  }

  const handleStatusFilter = (status: DevisStatus | 'all') => {
    setFilterStatus(status)
  }

  // Statistiques
  const stats = {
    total: devis.length,
    pending: devis.filter(d => d.status === 'PENDING').length,
    inReview: devis.filter(d => d.status === 'IN_REVIEW').length,
    approved: devis.filter(d => d.status === 'APPROVED').length,
    rejected: devis.filter(d => d.status === 'REJECTED').length,
    completed: devis.filter(d => d.status === 'COMPLETED').length,
  }

  // Configuration du tableau
  const columns = getDevisColumns()
  const actions = getDevisActions({
    viewDevis,
    updateStatus,
    deleteDevis,
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
            Demandes de devis
          </h1>
          <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">
            Gérez les demandes de devis et suivez leur progression
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filtre rapide par statut */}
          <select
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value as DevisStatus | 'all')}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200/30 dark:border-gray-700/30 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="IN_REVIEW">En cours</option>
            <option value="APPROVED">Approuvés</option>
            <option value="REJECTED">Rejetés</option>
            <option value="COMPLETED">Terminés</option>
          </select>
          <button
            onClick={fetchDevis}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 font-medium"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Stats */}
      <DevisStats stats={stats} />

      {/* Tableau */}
      <DataTable
        data={devis}
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
      {isDetailOpen && selectedDevis && (
        <DevisDetailModal
          devis={selectedDevis}
          onClose={() => {
            setIsDetailOpen(false)
            setSelectedDevis(null)
          }}
          onUpdateStatus={(status) => updateStatus(selectedDevis.id, status)}
          onDelete={() => deleteDevis(selectedDevis)}
          onRefresh={fetchDevis}
        />
      )}
    </div>
  )
}