'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiRefreshCw, FiFolder } from 'react-icons/fi'
import DataTable from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { getCategoryColumns } from './CategoriesColumns'
import { getCategoryActions } from './CategoriesActions'
import { CategoriesModal } from './CategoriesModal'
import type { BlogCategory } from './types'

export function CategoriesAdmin() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog/categories')
      const data = await response.json()
      setCategories(data.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const deleteCategory = async (category: BlogCategory) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?`)) return

    try {
      await fetch(`/api/blog/categories?id=${category.id}`, { method: 'DELETE' })
      await fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleAdd = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEdit = (category: BlogCategory) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      const url = selectedCategory ? `/api/blog/categories?id=${selectedCategory.id}` : '/api/blog/categories'
      const method = selectedCategory ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchCategories()
      setIsModalOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      console.error('Error saving category:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    }
  }

  // Configuration du tableau
  const columns = getCategoryColumns(categories)
  const actions = getCategoryActions({
    handleEdit,
    deleteCategory,
  })

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 dark:text-emerald-50">
            Catégories du blog
          </h1>
          <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70 mt-1">
            Gérez les catégories pour organiser vos articles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCategories}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter une catégorie
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total"
          value={categories.length}
          icon={FiFolder}
          color="emerald"
        />
        <StatCard
          label="Avec articles"
          value={categories.filter(c => (c.posts?.length || 0) > 0).length}
          icon={FiFolder}
          color="blue"
        />
        <StatCard
          label="Sans articles"
          value={categories.filter(c => (c.posts?.length || 0) === 0).length}
          icon={FiFolder}
          color="gray"
        />
        <StatCard
          label="Sous-catégories"
          value={categories.filter(c => c.parentId).length}
          icon={FiFolder}
          color="purple"
        />
      </div>

      {/* Tableau */}
      <DataTable
        data={categories}
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
      <CategoriesModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCategory(null)
        }}
        category={selectedCategory}
        categories={categories}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }: any) {
  const colors = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/30 dark:text-emerald-300',
    blue: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300',
    gray: 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-gray-300',
    purple: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800/30 dark:text-purple-300',
  }
  
  return (
    <div className={`p-3 rounded-xl border ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-70">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
        <Icon className="w-5 h-5 opacity-70" />
      </div>
    </div>
  )
}