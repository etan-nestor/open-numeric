'use client'

import { FiEdit, FiTrash2, FiEye, FiEyeOff, FiStar } from 'react-icons/fi'
import type { TableAction } from '@/components/admin/shared/DataTable'
import type { TeamMember } from './types'

interface TeamActionsProps {
  handleEdit: (member: TeamMember) => void
  deleteMember: (member: TeamMember) => void
  toggleVisibility: (member: TeamMember) => void
  toggleCore: (member: TeamMember) => void
}

export function getTeamActions({
  handleEdit,
  deleteMember,
  toggleVisibility,
  toggleCore,
}: TeamActionsProps): TableAction[] {
  return [
    {
      icon: FiEdit,
      label: 'Modifier',
      onClick: (row: TeamMember) => handleEdit(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
    },
    {
      icon: FiEye,
      label: 'Masquer',
      onClick: (row: TeamMember) => toggleVisibility(row),
      className: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      condition: (row: TeamMember) => row.isVisible,
    },
    {
      icon: FiEyeOff,
      label: 'Afficher',
      onClick: (row: TeamMember) => toggleVisibility(row),
      className: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
      condition: (row: TeamMember) => !row.isVisible,
    },
    {
      icon: FiStar,
      label: 'Marquer comme clé',
      onClick: (row: TeamMember) => toggleCore(row),
      className: 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300',
      condition: (row: TeamMember) => !row.isCore,
    },
    {
      icon: FiStar,
      label: 'Retirer des clés',
      onClick: (row: TeamMember) => toggleCore(row),
      className: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      condition: (row: TeamMember) => row.isCore,
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: TeamMember) => deleteMember(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]
}