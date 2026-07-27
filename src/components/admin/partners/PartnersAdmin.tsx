'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiRefreshCw, FiGrid, FiList } from 'react-icons/fi'
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { PartnersStats } from './PartnersStats'
import { getPartnersColumns } from './PartnersColumns'
import { getPartnersActions } from './PartnersActions'
import { PartnersModal } from './PartnersModal'
import { PartnersGrid } from './PartnersGrid'
import type { Partner } from './types'

export function PartnersAdmin() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid')

  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/partners')
      const data = await response.json()
      setPartners(data.data || [])
    } catch (error) {
      console.error('Error fetching partners:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

  const toggleVisibility = async (partner: Partner) => {
    try {
      await fetch(`/api/partners?id=${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !partner.isVisible }),
      })
      await fetchPartners()
    } catch (error) {
      console.error('Error toggling visibility:', error)
      alert('Erreur lors du changement de visibilité')
    }
  }

  const toggleFeatured = async (partner: Partner) => {
    try {
      await fetch(`/api/partners?id=${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !partner.isFeatured }),
      })
      await fetchPartners()
    } catch (error) {
      console.error('Error toggling featured status:', error)
      alert('Erreur lors du changement de statut "à la une"')
    }
  }

  const deletePartner = async (partner: Partner) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${partner.name}" ?`)) return

    try {
      await fetch(`/api/partners?id=${partner.id}`, { method: 'DELETE' })
      await fetchPartners()
    } catch (error) {
      console.error('Error deleting partner:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleAdd = () => {
    setSelectedPartner(null)
    setIsModalOpen(true)
  }

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = selectedPartner ? `/api/partners?id=${selectedPartner.id}` : '/api/partners'
      const method = selectedPartner ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchPartners()
      setIsModalOpen(false)
      setSelectedPartner(null)
    } catch (error) {
      console.error('Error saving partner:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    }
  }

  // Statistiques
  const stats = {
    total: partners.length,
    visible: partners.filter(p => p.isVisible).length,
    hidden: partners.filter(p => !p.isVisible).length,
    featured: partners.filter(p => p.isFeatured).length,
  }

  // Configuration du tableau
  const columns = getPartnersColumns()
  const actions = getPartnersActions({
    handleEdit,
    deletePartner,
    toggleVisibility,
    toggleFeatured,
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
            Gestion des partenaires
          </h1>
          <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">
            Gérez les logos et informations des partenaires
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Vue */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200/30 dark:border-gray-700/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={fetchPartners}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter un partenaire
          </button>
        </div>
      </div>

      {/* Stats */}
      <PartnersStats stats={stats} />

      {/* Contenu */}
      {viewMode === 'grid' ? (
        <PartnersGrid
          partners={partners}
          onEdit={handleEdit}
          onDelete={deletePartner}
          onToggleVisibility={toggleVisibility}
          onToggleFeatured={toggleFeatured}
        />
      ) : (
        <DataTable
          data={partners}
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
      )}

      {/* Modal */}
      <PartnersModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPartner(null)
        }}
        partner={selectedPartner}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}