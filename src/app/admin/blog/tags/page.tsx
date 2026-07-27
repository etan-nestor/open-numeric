'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiRefreshCw, FiTag, FiTrash2, FiEdit } from 'react-icons/fi'
import DataTable, { Column, TableAction } from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'

interface BlogTag {
  id: string
  name: string
  slug: string
  description: string | null
  posts: { id: string }[]
  createdAt: string
}

export default function BlogTagsPage() {
  const [tags, setTags] = useState<BlogTag[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<BlogTag | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  })

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog/tags')
      const data = await response.json()
      setTags(data.data || [])
    } catch (error) {
      console.error('Error fetching tags:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleAdd = () => {
    setSelectedTag(null)
    setFormData({ name: '', slug: '', description: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (tag: BlogTag) => {
    setSelectedTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug,
      description: tag.description || '',
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (tag: BlogTag) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le tag "${tag.name}" ?`)) return

    try {
      await fetch(`/api/blog/tags?id=${tag.id}`, { method: 'DELETE' })
      await fetchTags()
    } catch (error) {
      console.error('Error deleting tag:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = selectedTag ? `/api/blog/tags?id=${selectedTag.id}` : '/api/blog/tags'
      const method = selectedTag ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchTags()
      setIsModalOpen(false)
      setSelectedTag(null)
    } catch (error) {
      console.error('Error saving tag:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    }
  }

  // Configuration des colonnes
  const columns: Column[] = [
    {
      key: 'name',
      label: 'Tag',
      render: (_, row: BlogTag) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{row.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{row.slug}</div>
        </div>
      ),
    },
    {
      key: 'posts',
      label: 'Articles',
      render: (value: any) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">{value?.length || 0}</span>
          <span className="text-gray-500 dark:text-gray-400">article(s)</span>
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string | null) => (
        <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          {value || '-'}
        </span>
      ),
    },
  ]

  // Actions du tableau
  const actions: TableAction[] = [
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: BlogTag) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: BlogTag) => handleDelete(row),
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
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-900 dark:text-pink-50">
            Tags du blog
          </h1>
          <p className="text-sm text-pink-600/70 dark:text-pink-400/70 mt-1">
            Gérez les tags pour catégoriser vos articles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTags}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-xl hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Rafraîchir
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-lg shadow-pink-600/20 hover:shadow-pink-600/30 font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter un tag
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl border bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800/30 dark:text-pink-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-70">Total tags</p>
              <p className="text-xl font-bold">{tags.length}</p>
            </div>
            <FiTag className="w-5 h-5" />
          </div>
        </div>
        <div className="p-3 rounded-xl border bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-70">Avec articles</p>
              <p className="text-xl font-bold">{tags.filter(t => (t.posts?.length || 0) > 0).length}</p>
            </div>
            <FiTag className="w-5 h-5" />
          </div>
        </div>
        <div className="p-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-70">Sans articles</p>
              <p className="text-xl font-bold">{tags.filter(t => (t.posts?.length || 0) === 0).length}</p>
            </div>
            <FiTag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tableau */}
      <DataTable
        data={tags}
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-pink-200/30 dark:border-pink-700/30">
              <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-pink-200/30 dark:border-pink-700/30 rounded-t-2xl z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-pink-900 dark:text-pink-50">
                      {selectedTag ? 'Modifier le tag' : 'Ajouter un tag'}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-pink-100/50 dark:hover:bg-pink-900/30 transition-colors"
                  >
                    <FiTrash2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-900 dark:text-pink-100 mb-1.5">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-pink-50/50 dark:bg-pink-900/20 border border-pink-200/30 dark:border-pink-700/30 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-900 dark:text-pink-100 mb-1.5">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-pink-50/50 dark:bg-pink-900/20 border border-pink-200/30 dark:border-pink-700/30 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pink-900 dark:text-pink-100 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-pink-50/50 dark:bg-pink-900/20 border border-pink-200/30 dark:border-pink-700/30 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-y"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-pink-200/30 dark:border-pink-700/30">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 border border-pink-200/30 dark:border-pink-700/30 rounded-xl hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors text-pink-700 dark:text-pink-300 font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all duration-300 font-medium shadow-lg shadow-pink-600/20"
                  >
                    {selectedTag ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}