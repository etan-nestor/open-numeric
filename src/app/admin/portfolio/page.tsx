/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiExternalLink } from 'react-icons/fi'
import { Project } from '@prisma/client'
import { usePortfolio } from '@/components/admin/hooks/usePortfolio'
import { PortfolioModal } from '@/components/admin/portfolio/PortfolioModal'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import DataTable, { Column, TableAction } from '@/components/admin/shared/DataTable'
import { StatusBadge } from '@/components/admin/shared/StatusBadge'
import StatCard from '@/components/admin/portfolio/StatCard'

export default function PortfolioAdmin() {
  const { projects, loading, createProject, updateProject, deleteProject } = usePortfolio()
  
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdd = () => {
    setSelectedProject(null)
    setModalOpen(true)
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handleView = (project: Project) => {
    if (project.url) {
      window.open(project.url, '_blank')
    } else {
      window.open(`/portfolio/${project.slug}`, '_blank')
    }
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" ?`)) return
    
    const result = await deleteProject(project.id)
    if (!result.success) {
      alert(result.error || 'Erreur lors de la suppression')
    }
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    let result
    if (selectedProject) {
      result = await updateProject(selectedProject.id, data)
    } else {
      result = await createProject(data)
    }
    
    setIsSubmitting(false)
    
    if (result.success) {
      setModalOpen(false)
      setSelectedProject(null)
    } else {
      alert(result.error || "Erreur lors de l'enregistrement")
    }
  }

  // Configuration des colonnes
  const columns: Column[] = [
    {
      key: 'imageUrl',
      label: 'Projet',
      render: (_, row: Project) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-amber-100 dark:bg-amber-900/30">
            <img
              src={row.imageUrl}
              alt={row.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-amber-900 dark:text-amber-100">{row.title}</div>
            <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
              {new Date(row.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Catégorie',
      render: (value: string) => (
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
          {value}
        </span>
      ),
    },
    {
      key: 'clientType',
      label: 'Client',
      render: (value: string) => {
        const labels: Record<string, string> = {
          ENTERPRISE: 'Entreprise',
          INDIVIDUAL: 'Particulier',
          STARTUP: 'Startup',
          NGO: 'ONG'
        }
        return <span className="text-amber-700 dark:text-amber-300">{labels[value] || value}</span>
      },
    },
    {
      key: 'technologies',
      label: 'Technologies',
      render: (value: any) => {
        const techs = Array.isArray(value) ? value : []
        const display = techs.slice(0, 3)
        const remaining = techs.length - 3
        return (
          <div className="flex flex-wrap gap-1">
            {display.map((tech: any, i: number) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] bg-amber-100/60 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
              >
                {typeof tech === 'string' ? tech : tech.name || tech}
              </span>
            ))}
            {remaining > 0 && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-200/60 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300">
                +{remaining}
              </span>
            )}
          </div>
        )
      },
    },
    {
      key: 'isPublished',
      label: 'Statut',
      render: (value: boolean) => (
        <StatusBadge 
          status={value} 
          trueLabel="Publié" 
          falseLabel="Brouillon"
        />
      ),
    },
  ]

  // Actions du tableau
  const tableActions: TableAction[] = [
    {
      icon: FiExternalLink,
      label: 'Voir',
      onClick: (row: Project) => handleView(row),
      className: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    },
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: Project) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: Project) => handleDelete(row),
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
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-50">
            Gestion du Portfolio
          </h1>
          <p className="text-sm text-amber-600/70 dark:text-amber-400/70 mt-1">
            Gérez vos projets, suivez leur statut et organisez votre vitrine
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 font-medium"
        >
          <FiPlus className="w-5 h-5" />
          Nouveau projet
        </button>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total projets"
          value={projects.length}
          color="amber"
        />
        <StatCard
          label="Publiés"
          value={projects.filter(p => p.isPublished).length}
          color="green"
        />
        <StatCard
          label="En cours"
          value={projects.filter(p => !p.isCompleted).length}
          color="blue"
        />
        <StatCard
          label="Terminés"
          value={projects.filter(p => p.isCompleted).length}
          color="purple"
        />
      </div>

      {/* Tableau */}
      <DataTable
        data={projects}
        columns={columns}
        config={{
          selectable: true,
          pagination: true,
          searchable: true,
          pageSize: 10,
          pageSizes: [5, 10, 25, 50],
          actions: tableActions,
        }}
        className="mt-6"
      />

      {/* Modal */}
      <PortfolioModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedProject(null)
        }}
        project={selectedProject}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      />
    </div>
  )
}

