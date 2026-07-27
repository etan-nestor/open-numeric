export interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    phone: string | null
    company: string | null
    isRead: boolean
    isReplied: boolean
    createdAt: string
    status: string
  }
  
  export interface ContactStats {
    total: number
    unread: number
    read: number
    replied: number
  }