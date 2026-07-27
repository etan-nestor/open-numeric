'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiRefreshCw, FiCode, FiTag } from 'react-icons/fi'
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { TechStats } from './TechStats'
import { getTechColumns } from './TechColumns'
import { getTechActions } from './TechActions'
import { TechModal } from './TechModal'
import type { Technology } from './types'

export function TechAdmin() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/technologies')
      const data = await response.json()
      setTechnologies(data.data || [])
    } catch (error) {
      console.error('Error fetching technologies:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTechnologies()
  }, [fetchTechnologies])

  const deleteTech = async (tech: Technology) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la technologie "${tech.name}" ?`)) return

    try {
      await fetch(`/api/technologies?id=${tech.id}`, { method: 'DELETE' })
      await fetchTechnologies()
    } catch (error) {
      console.error('Error deleting technology:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleAdd = () => {
    setSelectedTech(null)
    setIsModalOpen(true)
  }

  const handleEdit = (tech: Technology) => {
    setSelectedTech(tech)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = selectedTech ? `/api/technologies?id=${selectedTech.id}` : '/api/technologies'
      const method = selectedTech ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchTechnologies()
      setIsModalOpen(false)
      setSelectedTech(null)
    } catch (error) {
      console.error('Error saving technology:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    }
  }

  // Statistiques
  const categories = technologies.reduce((acc, tech) => {
    const cat = tech.category || 'Non classé'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Top 5 technologies les plus utilisées (basé sur le nombre de projets)
  const sortedByProjects = [...technologies]
    .sort((a, b) => (b.projects?.length || 0) - (a.projects?.length || 0))
    .slice(0, 5)
    .map(t => t.name)

  const stats = {
    total: technologies.length,
    categories,
    mostUsed: sortedByProjects,
  }

  // Configuration du tableau
  const columns = getTechColumns()
  const actions = getTechActions({
    handleEdit,
    deleteTech,
  })

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-50">
            Gestion des technologies
          </h1>
          <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">
            Gérez les technologies utilisées dans vos projets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTechnologies}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter une technologie
          </button>
        </div>
      </div>

      {/* Stats */}
      <TechStats stats={stats} />

      {/* Tableau */}
      <DataTable
        data={technologies}
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

      {/* Modal */}
      <TechModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTech(null)
        }}
        technology={selectedTech}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}