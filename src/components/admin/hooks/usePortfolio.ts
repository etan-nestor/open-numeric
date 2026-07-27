/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Project } from '@prisma/client'

export function usePortfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/portfolio')
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors du chargement')
      }

      setProjects(data.data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }, [])

  const createProject = useCallback(async (data: any) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la création')
      }
      
      await fetchProjects()
      return { success: true, data: result.data }
    } catch (error) {
      console.error('Error creating project:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
  }, [fetchProjects])

  const updateProject = useCallback(async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la mise à jour')
      }
      
      await fetchProjects()
      return { success: true, data: result.data }
    } catch (error) {
      console.error('Error updating project:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
  }, [fetchProjects])

  const deleteProject = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la suppression')
      }
      
      await fetchProjects()
      return { success: true }
    } catch (error) {
      console.error('Error deleting project:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
  }, [fetchProjects])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}