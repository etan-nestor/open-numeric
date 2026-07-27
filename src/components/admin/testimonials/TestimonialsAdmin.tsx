'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiRefreshCw } from 'react-icons/fi'
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { TestimonialsStats } from './TestimonialsStats'
import { getTestimonialsColumns } from './TestimonialsColumns'
import { getTestimonialsActions } from './TestimonialsActions'
import { TestimonialsModal } from './TestimonialsModal'
import type { Testimonial } from './types'

export function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setTestimonials(data.data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const toggleVisibility = async (testimonial: Testimonial) => {
    try {
      await fetch(`/api/testimonials?id=${testimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !testimonial.isVisible }),
      })
      await fetchTestimonials()
    } catch (error) {
      console.error('Error toggling visibility:', error)
      alert('Erreur lors du changement de visibilité')
    }
  }

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      await fetch(`/api/testimonials?id=${testimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !testimonial.isFeatured }),
      })
      await fetchTestimonials()
    } catch (error) {
      console.error('Error toggling featured status:', error)
      alert('Erreur lors du changement de statut "à la une"')
    }
  }

  const deleteTestimonial = async (testimonial: Testimonial) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le témoignage de "${testimonial.name}" ?`)) return

    try {
      await fetch(`/api/testimonials?id=${testimonial.id}`, { method: 'DELETE' })
      await fetchTestimonials()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleAdd = () => {
    setSelectedTestimonial(null)
    setIsModalOpen(true)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = selectedTestimonial ? `/api/testimonials?id=${selectedTestimonial.id}` : '/api/testimonials'
      const method = selectedTestimonial ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchTestimonials()
      setIsModalOpen(false)
      setSelectedTestimonial(null)
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    }
  }

  // Statistiques
  const stats = {
    total: testimonials.length,
    visible: testimonials.filter(t => t.isVisible).length,
    hidden: testimonials.filter(t => !t.isVisible).length,
    featured: testimonials.filter(t => t.isFeatured).length,
    averageRating: testimonials.length > 0 
      ? testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length 
      : 0,
  }

  // Configuration du tableau
  const columns = getTestimonialsColumns()
  const actions = getTestimonialsActions({
    handleEdit,
    deleteTestimonial,
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
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-50">
            Gestion des témoignages
          </h1>
          <p className="text-sm text-amber-600/70 dark:text-amber-400/70 mt-1">
            Gérez les avis et témoignages de vos clients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTestimonials}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter un témoignage
          </button>
        </div>
      </div>

      {/* Stats */}
      <TestimonialsStats stats={stats} />

      {/* Tableau */}
      <DataTable
        data={testimonials}
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
      <TestimonialsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTestimonial(null)
        }}
        testimonial={selectedTestimonial}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}