export type DevisStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'COMPLETED'

export interface Devis {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  projectType: string
  budget: string
  timeline: string
  description: string
  status: DevisStatus
  estimatedPrice: number | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface DevisStats {
  total: number
  pending: number
  inReview: number
  approved: number
  rejected: number
  completed: number
}

export interface DevisFilter {
  status?: DevisStatus
  search?: string
  dateFrom?: string
  dateTo?: string
}