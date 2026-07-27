/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  FiPlus,
  FiRefreshCw,
  FiEdit,
  FiTrash2,
  FiEye,
  FiClock,
  FiCheckCircle,
  FiArchive,
  FiFileText,
} from 'react-icons/fi'
import DataTable, { Column, TableAction } from '@/components/admin/shared/DataTable'
import { LoadingSpinner } from '@/components/admin/shared/LoadingSpinner'
import { BlogPostModal } from '@/components/admin/blog/BlogPostModal'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  views: number
  isFeatured: boolean
  readTime: number | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
    avatar: string | null
  }
  category: {
    id: string
    name: string
    slug: string
    color: string | null
  } | null
  tags: {
    id: string
    name: string
    slug: string
  }[]
  comments: { id: string }[]
  _count: {
    comments: number
  }
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const url = filterStatus === 'all'
        ? '/api/blog?limit=50'
        : `/api/blog?status=${filterStatus}&limit=50`
      const response = await fetch(url)
      const data = await response.json()
      setPosts(data.data || [])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }, [filterStatus])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const updateStatus = async (id: string, status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') => {
    try {
      const post = posts.find(p => p.id === id)
      if (!post) return

      await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      await fetchPosts()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }


  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'article "${post.title}" ?`)) return

    try {
      await fetch(`/api/blog/${post.slug}`, { method: 'DELETE' })
      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const viewPost = (post: BlogPost) => {
    window.open(`/blog/${post.slug}`, '_blank')
  }

  const handleAdd = () => {
    setSelectedPost(null)
    setIsModalOpen(true)
  }

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)

      // Récupérer l'ID de l'utilisateur connecté (à adapter selon votre système d'auth)
      const authorId = 'user-id-temporaire' // À remplacer par l'ID réel

      const url = selectedPost ? `/api/blog/${selectedPost.slug}` : '/api/blog'
      const method = selectedPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          authorId,
          status: data.status || 'DRAFT',
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'enregistrement')
      }

      await fetchPosts()
      setIsModalOpen(false)
      setSelectedPost(null)
    } catch (error) {
      console.error('Error saving post:', error)
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'enregistrement')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      DRAFT: {
        label: 'Brouillon',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
        icon: FiClock
      },
      PUBLISHED: {
        label: 'Publié',
        className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
        icon: FiCheckCircle
      },
      ARCHIVED: {
        label: 'Archivé',
        className: 'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400',
        icon: FiArchive
      }
    }
    return config[status as keyof typeof config] || config.DRAFT
  }

  // Statistiques
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'PUBLISHED').length,
    draft: posts.filter(p => p.status === 'DRAFT').length,
    archived: posts.filter(p => p.status === 'ARCHIVED').length,
    featured: posts.filter(p => p.isFeatured).length,
  }

  // Configuration des colonnes
  const columns: Column[] = [
    {
      key: 'title',
      label: 'Article',
      render: (_, row: BlogPost) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
              <img src={row.image} alt={row.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <FiFileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
              {row.title}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{row.author.name}</span>
              {row.category && (
                <>
                  <span>•</span>
                  <span
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{ backgroundColor: row.category.color || '#e5e7eb' }}
                  >
                    {row.category.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      render: (value: string) => {
        const config = getStatusBadge(value)
        const Icon = config.icon
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
        )
      },
    },
    {
      key: 'isFeatured',
      label: 'À la une',
      render: (value: boolean) => (
        value ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
            ⭐ À la une
          </span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">-</span>
        )
      ),
    },
    {
      key: 'views',
      label: 'Vues',
      render: (value: number) => (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (value: any[]) => {
        const display = value.slice(0, 3)
        const remaining = value.length - 3
        return (
          <div className="flex flex-wrap gap-1">
            {display.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] bg-pink-100/60 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
              >
                {tag.name}
              </span>
            ))}
            {remaining > 0 && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-pink-200/60 text-pink-800 dark:bg-pink-800/30 dark:text-pink-300">
                +{remaining}
              </span>
            )}
          </div>
        )
      },
    },
    {
      key: 'publishedAt',
      label: 'Date',
      render: (value: string | null) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {value ? new Date(value).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }) : (
            <span className="text-amber-600 dark:text-amber-400">Non publié</span>
          )}
        </div>
      ),
    },
  ]

  // Actions du tableau
  const actions: TableAction[] = [
    {
      icon: FiEye,
      label: 'Voir',
      onClick: (row: BlogPost) => viewPost(row),
      className: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    },
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: BlogPost) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiCheckCircle,
      label: 'Publier',
      onClick: (row: BlogPost) => updateStatus(row.id, 'PUBLISHED'),
      className: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
      condition: (row: BlogPost) => row.status === 'DRAFT',
    },
    {
      icon: FiClock,
      label: 'Mettre en brouillon',
      onClick: (row: BlogPost) => updateStatus(row.id, 'DRAFT'),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
      condition: (row: BlogPost) => row.status === 'PUBLISHED',
    },
    {
      icon: FiArchive,
      label: 'Archiver',
      onClick: (row: BlogPost) => updateStatus(row.id, 'ARCHIVED'),
      className: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      condition: (row: BlogPost) => row.status !== 'ARCHIVED',
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: BlogPost) => deletePost(row),
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
            Gestion des articles
          </h1>
          <p className="text-sm text-amber-600/70 dark:text-amber-400/70 mt-1">
            Créez, gérez et publiez vos articles de blog
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filtre par statut */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200/30 dark:border-gray-700/30 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="PUBLISHED">Publiés</option>
            <option value="DRAFT">Brouillons</option>
            <option value="ARCHIVED">Archivés</option>
          </select>
          <button
            onClick={fetchPosts}
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
            Nouvel article
          </button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard
          label="Total"
          value={stats.total}
          icon={FiFileText}
          color="amber"
        />
        <StatCard
          label="Publiés"
          value={stats.published}
          icon={FiCheckCircle}
          color="green"
        />
        <StatCard
          label="Brouillons"
          value={stats.draft}
          icon={FiClock}
          color="yellow"
        />
        <StatCard
          label="Archivés"
          value={stats.archived}
          icon={FiArchive}
          color="gray"
        />
        <StatCard
          label="À la une"
          value={stats.featured}
          icon={FiEye}
          color="purple"
        />
      </div>

      {/* Tableau */}
      <DataTable
        data={posts}
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

      {/* Modal de création/édition */}
      <BlogPostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPost(null)
        }}
        post={selectedPost}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      />
    </div>
  )
}

// Composant StatCard
function StatCard({
  label,
  value,
  icon: Icon,
  color
}: {
  label: string
  value: number
  icon: any
  color: string
}) {
  const colors = {
    amber: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800/30 dark:text-emerald-300',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800/30 dark:text-yellow-300',
    gray: 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-700/30 dark:text-gray-300',
    purple: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800/30 dark:text-purple-300',
  }

  const iconColors = {
    amber: 'text-amber-500',
    green: 'text-emerald-500',
    yellow: 'text-yellow-500',
    gray: 'text-gray-500',
    purple: 'text-purple-500',
  }

  return (
    <div className={`p-3 rounded-xl border ${colors[color as keyof typeof colors]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-70">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
        <Icon className={`w-5 h-5 ${iconColors[color as keyof typeof iconColors]}`} />
      </div>
    </div>
  )
}