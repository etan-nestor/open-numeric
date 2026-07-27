'use client'

import { FiEye, FiCheck, FiEyeOff, FiTrash2 } from 'react-icons/fi'
import { FaReply } from "react-icons/fa";
import type { TableAction } from '@/components/admin/shared/DataTable'
import type { ContactMessage } from './types'

interface ContactActionsProps {
  viewMessage: (message: ContactMessage) => void
  toggleReadStatus: (message: ContactMessage) => void
  deleteMessage: (message: ContactMessage) => void
}

export function getContactActions({
  viewMessage,
  toggleReadStatus,
  deleteMessage,
}: ContactActionsProps): TableAction[] {
  return [
    {
      icon: FiEye,
      label: 'Voir',
      onClick: (row: ContactMessage) => viewMessage(row),
      className: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    },
    {
      icon: FaReply,
      label: 'Répondre',
      onClick: (row: ContactMessage) => {
        window.location.href = `mailto:${row.email}?subject=Re: ${row.subject}`
      },
      className: 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300',
      condition: (row: ContactMessage) => !row.isReplied,
    },
    {
      icon: FiCheck,
      label: 'Marquer comme lu',
      onClick: (row: ContactMessage) => toggleReadStatus(row),
      className: 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300',
      condition: (row: ContactMessage) => !row.isRead,
    },
    {
      icon: FiEyeOff,
      label: 'Marquer comme non lu',
      onClick: (row: ContactMessage) => toggleReadStatus(row),
      className: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      condition: (row: ContactMessage) => row.isRead,
    },
    {
      icon: FiTrash2,
      label: 'Supprimer',
      onClick: (row: ContactMessage) => deleteMessage(row),
      className: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    },
  ]
}