'use client'

import { FiEdit, FiTrash2, FiEye, FiEyeOff, FiStar } from 'react-icons/fi'
import type { TableAction } from '@/components/admin/shared/DataTable'
import type { Testimonial } from './types'

interface TestimonialsActionsProps {
  handleEdit: (testimonial: Testimonial) => void
  deleteTestimonial: (testimonial: Testimonial) => void
  toggleVisibility: (testimonial: Testimonial) => void
  toggleFeatured: (testimonial: Testimonial) => void
}

export function getTestimonialsActions({
  handleEdit,
  deleteTestimonial,
  toggleVisibility,
  toggleFeatured,
}: TestimonialsActionsProps): TableAction[] {
  return [
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: Testimonial) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiStar,
      label: 'Mettre à la une',
      onClick: (row: Testimonial) => toggleFeatured(row),
      className: 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300',
      condition: (row: Testimonial) => !row.isFeatured,
    },
    {
      icon: FiStar,
      label: 'Retirer de la une',
      onClick: (row: Testimonial) => toggleFeatured(row),
      className: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      condition: (row: Testimonial) => row.isFeatured,
    },
    {
      icon: FiEye,
      label: 'Masquer',
      onClick: (row: Testimonial) => toggleVisibility(row),
      className: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      condition: (row: Testimonial) => row.isVisible,
    },
    {
      icon: FiEyeOff,
      label: 'Afficher',
      onClick: (row: Testimonial) => toggleVisibility(row),
      className: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
      condition: (row: Testimonial) => !row.isVisible,
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: Testimonial) => deleteTestimonial(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]
}