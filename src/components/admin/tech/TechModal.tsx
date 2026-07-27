/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import type { Technology } from './types'

interface TechModalProps {
  isOpen: boolean
  onClose: () => void
  technology: Technology | null
  onSubmit: (data: any) => void
  loading?: boolean
}

const TECH_CATEGORIES = [
  'Frontend',
  'Backend',
  'Mobile',
  'DevOps',
  'Database',
  'Cloud',
  'AI/ML',
  'Design',
  'Testing',
  'Other',
]

const PRESET_COLORS = [
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#ef4444', // Red
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#6366f1', // Indigo
]

export function TechModal({ isOpen, onClose, technology, onSubmit, loading }: TechModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    color: '',
    category: '',
    projectIds: [] as string[], // 🔥 Nouveau champ pour les projets
  })

  const [projects, setProjects] = useState<any[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  // Charger les projets disponibles
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true)
        const response = await fetch('/api/portfolio?includeAll=true&limit=100')
        const data = await response.json()
        if (data.success) {
          setProjects(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoadingProjects(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (technology) {
      setFormData({
        name: technology.name || '',
        slug: technology.slug || '',
        icon: technology.icon || '',
        color: technology.color || '',
        category: technology.category || '',
        projectIds: technology.projects?.map(p => p.id) || [],
      })
    } else {
      setFormData({
        name: '',
        slug: '',
        icon: '',
        color: '',
        category: '',
        projectIds: [],
      })
    }
  }, [technology])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProjectToggle = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      projectIds: prev.projectIds.includes(projectId)
        ? prev.projectIds.filter(id => id !== projectId)
        : [...prev.projectIds, projectId]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      // On envoie les projectIds pour l'association
      projectIds: formData.projectIds,
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-blue-200/30 dark:border-blue-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-blue-200/30 dark:border-blue-700/30 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-blue-900 dark:text-blue-50">
                  {technology ? 'Modifier la technologie' : 'Ajouter une technologie'}
                </h2>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
                  {technology ? 'Mettez à jour les informations' : 'Ajoutez une nouvelle technologie'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors"
              >
                <FiX className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1.5">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, Node.js, etc."
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1.5">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="react, node-js"
                required
              />
              <p className="text-xs text-blue-600/60 dark:text-blue-400/60 mt-1">
                Utilisé dans l&apos;URL, lettres minuscules et tirets
              </p>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1.5">
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Non classé</option>
                {TECH_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Icône */}
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1.5">
                Icône (emoji)
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="⚛️, 🟢, etc."
                maxLength={2}
              />
            </div>

            {/* Couleur */}
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1.5">
                Couleur
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formData.color === color 
                        ? 'border-blue-600 scale-110' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full h-10 rounded-xl cursor-pointer bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30"
              />
            </div>

            {/* 🔥 NOUVEAU: Sélection des projets */}
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1.5">
                Projets associés
              </label>
              {loadingProjects ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              ) : projects.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aucun projet disponible. Créez d abord un projet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                  {projects.map((project) => (
                    <label
                      key={project.id}
                      className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-blue-100/50 dark:hover:bg-blue-800/30 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.projectIds.includes(project.id)}
                        onChange={() => handleProjectToggle(project.id)}
                        className="w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {project.title}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              {formData.projectIds.length > 0 && (
                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
                  {formData.projectIds.length} projet(s) sélectionné(s)
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-blue-200/30 dark:border-blue-700/30">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-blue-200/30 dark:border-blue-700/30 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors text-blue-700 dark:text-blue-300 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading || loadingProjects}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enregistrement...' : technology ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}