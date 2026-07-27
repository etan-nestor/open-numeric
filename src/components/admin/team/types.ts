export interface TeamMember {
    id: string
    name: string
    position: string
    bio: string
    imageUrl: string
    email: string | null
    phone: string | null
    linkedin: string | null
    twitter: string | null
    facebook: string | null
    instagram: string | null
    github: string | null
    portfolio: string | null
    order: number
    isVisible: boolean
    isCore: boolean
    joinedAt: string | null
    createdAt: string
    updatedAt: string
  }
  
  export interface TeamStats {
    total: number
    visible: number
    hidden: number
    core: number
  }