'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiRefreshCw, FiUsers } from 'react-icons/fi'
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { TeamStats } from './TeamStats'
import { getTeamColumns } from './TeamColumns'
import { getTeamActions } from './TeamActions'
import { TeamModal } from './TeamModal'
import type { TeamMember } from './types'

export function TeamAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/team')
      const data = await response.json()
      setMembers(data.data || [])
    } catch (error) {
      console.error('Error fetching team:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const toggleVisibility = async (member: TeamMember) => {
    try {
      await fetch(`/api/team?id=${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !member.isVisible }),
      })
      await fetchMembers()
    } catch (error) {
      console.error('Error toggling visibility:', error)
      alert('Erreur lors du changement de visibilité')
    }
  }

  const toggleCore = async (member: TeamMember) => {
    try {
      await fetch(`/api/team?id=${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCore: !member.isCore }),
      })
      await fetchMembers()
    } catch (error) {
      console.error('Error toggling core status:', error)
      alert('Erreur lors du changement de statut clé')
    }
  }

  const deleteMember = async (member: TeamMember) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${member.name}" de l'équipe ?`)) return

    try {
      await fetch(`/api/team?id=${member.id}`, { method: 'DELETE' })
      await fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleAdd = () => {
    setSelectedMember(null)
    setIsModalOpen(true)
  }

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = selectedMember ? `/api/team?id=${selectedMember.id}` : '/api/team'
      const method = selectedMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchMembers()
      setIsModalOpen(false)
      setSelectedMember(null)
    } catch (error) {
      console.error('Error saving member:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    }
  }

  // Statistiques
  const stats = {
    total: members.length,
    visible: members.filter(m => m.isVisible).length,
    hidden: members.filter(m => !m.isVisible).length,
    core: members.filter(m => m.isCore).length,
  }

  // Configuration du tableau
  const columns = getTeamColumns()
  const actions = getTeamActions({
    handleEdit,
    deleteMember,
    toggleVisibility,
    toggleCore,
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
            Gestion de l'équipe
          </h1>
          <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">
            Gérez les membres de votre équipe et leur visibilité
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchMembers}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter un membre
          </button>
        </div>
      </div>

      {/* Stats */}
      <TeamStats stats={stats} />

      {/* Tableau */}
      <DataTable
        data={members}
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
      <TeamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedMember(null)
        }}
        member={selectedMember}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}