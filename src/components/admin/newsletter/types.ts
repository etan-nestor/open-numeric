export interface Subscriber {
    id: string
    email: string
    isActive: boolean
    token: string | null
    createdAt: string
    updatedAt: string
  }
  
  export interface NewsletterStats {
    total: number
    active: number
    inactive: number
  }